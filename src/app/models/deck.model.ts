// src/app/models/deck.model.ts
import { Card } from './card.model';

export interface Deck {
  id: number;
  name: string;
  deleted: boolean;
  type: string;
  cards: Card[];
}
