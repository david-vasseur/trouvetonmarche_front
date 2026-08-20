export function normalizeString(value: string): string {
    return value
        .normalize("NFD")                 // décompose les accents
        .replace(/[\u0300-\u036f]/g, "")  // supprime les accents
        .toLowerCase()                    // minuscules
        .trim()                            // espaces début/fin
        .replace(/[^a-z0-9]+/g, "-")      // tout le reste devient "-"
        .replace(/^-+|-+$/g, "");         // retire les "-" aux extrémités
}