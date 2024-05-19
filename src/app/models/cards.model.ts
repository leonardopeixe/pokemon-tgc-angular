// src/app/models/cards.model.ts
import { TypesCards } from './types-cards.model';

export interface Cards {
  id: number;
  name: string;
  description: string;
  types: TypesCards[];
}
