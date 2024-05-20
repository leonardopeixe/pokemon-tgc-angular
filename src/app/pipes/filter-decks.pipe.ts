// src/app/pipes/filter-decks.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Deck } from '../models/deck.model';

@Pipe({
  name: 'filterDecks',
  standalone: true
})
export class FilterDecksPipe implements PipeTransform {
  transform(decks: Deck[], showDeleted: boolean): Deck[] {
    return decks.filter(deck => !deck.deleted || showDeleted);
  }
}
