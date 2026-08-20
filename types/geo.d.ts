export type GeoEntity = {
    nom: string;
    code: string;
};

export type City = GeoEntity & {
    codeDepartement: string;
    codeRegion: string;
};

export type Department = GeoEntity & {
    codeRegion: string;
};

export type Region = GeoEntity;

export type Location =
  | {
      type: "region";
      nom: string;
      code: string;
    }
  | {
      type: "departement";
      nom: string;
      code: string;
      codeRegion: string;
    }
  | {
      type: "ville";
      nom: string;
      code: string;
      codeDepartement: string;
      codeRegion: string;
    };

export type CitySearchResult = {
  nom: string;
  code: string;
  codeDepartement: string;
  codeRegion: string;
  codesPostaux: string[];
  latitude: number;
  longitude: number;
};