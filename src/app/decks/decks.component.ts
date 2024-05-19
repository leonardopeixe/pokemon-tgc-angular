import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';
import {
  IgxCardComponent,
  IgxCardHeaderComponent,
  IgxCardMediaDirective,
  IgxCardContentDirective,
  IgxCardActionsComponent,
  IgxCardFooterDirective,
  IgxCardHeaderTitleDirective,
  IgxCardHeaderSubtitleDirective,
  IgxCardThumbnailDirective,
  IgxButtonDirective,
  IgxRippleDirective,
  IgxIconComponent,
  IgxDialogModule,
  IgxDialogComponent
} from 'igniteui-angular';
import { Deck } from '@models/deck.model';

@Component({
  selector: 'app-decks',
  standalone: true,
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  imports: [
    IgxCardComponent,
    IgxCardHeaderComponent,
    IgxCardMediaDirective,
    IgxCardContentDirective,
    IgxCardActionsComponent,
    IgxCardFooterDirective,
    IgxCardHeaderTitleDirective,
    IgxCardHeaderSubtitleDirective,
    IgxCardThumbnailDirective,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconComponent,
    IgxDialogModule,
    IgxDialogComponent
  ],
})
export class DecksComponent {
  // @TODO vincular com a API
  decks: Deck[] = [{
    id: 1,
    name: 'Meu Primeiro Deck',
    types: { id: 1, name: 'fire' },
    cards: [],
    deleted: false
  }];

  constructor(private navigationService: NavigationService) {}

  clickDecks(deck: Deck, action: string, dialog?: IgxDialogComponent) {
    console.log('Botão clicado!');
    switch (action) {
      case 'edit':
        dialog?.close()
        this.navigationService.navigateTo('/edit', [deck.id])
        break;
      case 'delete':
        // @TODO vincular com service para controle de localStorage
        // await deletarStorage()
        dialog?.close()
        break;
    }
  }
}
