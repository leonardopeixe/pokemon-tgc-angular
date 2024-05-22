// src/app/models/card.model.ts
export interface Card {
  id: string;
  name: string;
  qtd: number;
  nationalPokedexNumbers?: string[];
  types?: string[],
  supertype?: string,
  images?: any,
  tcgplayer?: any,
  number?: string
}
