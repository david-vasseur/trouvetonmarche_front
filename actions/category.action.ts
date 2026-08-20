"use server"

const URL = process.env.BACKEND_URL

export const getCategories = async () => {
    try {
        const response = await fetch(`${URL}markets/categories`, {
            next: { revalidate: 3600 }, 
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des marchés');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('❌ Erreur fetch getMarkets:', error);
        return [];
    }
};