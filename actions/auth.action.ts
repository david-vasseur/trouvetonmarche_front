'use server';

import { cookies } from 'next/headers';

const URL = process.env.BACKEND_URL;

export async function login(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
        throw new Error("L’email et le mot de passe sont obligatoires.");
    }

    // 1. Appel à l'API NestJS
    const response = await fetch(`${URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect.");
    }

    // 2. Récupération du JWT depuis NestJS
    const data = await response.json(); // On suppose que NestJS renvoie { token: "..." }
    
    if (!data.accessToken) {
        throw new Error("Erreur lors de la réception du token.");
    }

    // 3. Création du cookie sécurisé
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax", 
        path: "/",
        maxAge: 60 * 60 * 24, 
    });

    return { success: true, user: data.user };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    
    // 1. Suppression du cookie sécurisé côté serveur
    cookieStore.delete('auth_token');

    return { success : true, message: "Déconnexion reussi" }
}

export async function register(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("passwordConfirm") ?? ""); // On renomme pour correspondre au DTO
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const roles = String(formData.get("type") ?? "exhibitor");

  if (!email || !password) {
    throw new Error("L’email et le mot de passe sont obligatoires.");
  }

  if (password !== confirmPassword) {
    throw new Error("Les mots de passe ne correspondent pas.");
  }

  // Optionnel : tu peux gérer le rôle côté NestJS ou l'envoyer dans le body si ton DTO l'accepte
  // const role = type === "organizer" ? "ORGANISATEUR" : "EXPOSANT";

  // Appel à ton API NestJS (assure-toi que l'URL pointe vers ton port NestJS, ex: 3000 ou 3001)
  const response = await fetch(`${URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            confirmPassword, // Doit matcher ton RegisterDto NestJS
            firstName,
            lastName,
            roles
        }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // NestJS renvoie un tableau de messages d'erreur ou un message simple
    const errorMessage = Array.isArray(errorData.message) 
      ? errorData.message.join(", ") 
      : errorData.message || "Erreur lors de l'inscription";
      
    throw new Error(errorMessage);
  }

  // Si tout est bon, l'inscription est réussie (tu peux rediriger l'utilisateur ici si besoin)
}

export async function retrievePassword(formData: FormData): Promise<{ success: boolean; message: string }> {
    const email = String(formData.get("email") ?? "").trim();

    if (!email || email === "") {
        return { success: false, message: "Un email valide est obligatoire." };
    }

    try {
        const response = await fetch(`${URL}auth/retrieve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        // Même si le backend renvoie 200 (anti-énumération), on renvoie toujours un succès au front
        if (response.ok) {
            return { 
                success: true, 
                message: "Un email vient d'être envoyé, veuillez consulter votre messagerie. (Pensez à vérifier les spams)" 
            };
        }

        // Si le backend renvoie une erreur (ex: 500)
        return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
        
    } catch (error) {
        // En cas de panne réseau du BFF vers le Backend
        return { success: false, message: "Impossible de joindre le serveur." };
    }
}

export async function resetPasswordAction(formData: FormData) {

    const token = formData.get('token');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    try {

        const response = await fetch(`${URL}auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
        return { 
            success: false, 
            message: data.message || 'Une erreur est survenue lors de la réinitialisation.' 
        };
        }

        return { 
        success: true, 
        message: 'Mot de passe réinitialisé avec succès ! Redirection...' 
        };
    } catch (error: any) {
        return { 
        success: false, 
        message: error.message || "Impossible de contacter le serveur." 
        };
    }
}