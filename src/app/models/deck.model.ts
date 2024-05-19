// src/app/models/deck.model.ts
import { TypesCards } from './types-cards.model';
import { Cards } from './cards.model';

export interface Deck {
  id: number;
  name: string;
  deleted: boolean;
  types: TypesCards;
  cards: Cards[];
}
