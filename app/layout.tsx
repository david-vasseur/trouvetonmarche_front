import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { getCurrentUser } from "@/actions/user.action";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TrouveTonMarche",
  description: "Dates d'événements de marchés locaux pour visiteurs, exposants et organisateurs.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

  const user = await getCurrentUser();

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        <Navbar />
        <AuthProvider initialUser={user}>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
