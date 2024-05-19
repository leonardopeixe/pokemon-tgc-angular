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
} from 'igniteui-angular';
import { Deck } from '@models/deck.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  ],
})
export class HomeComponent {
  // @TODO vincular com a API
  decks: Deck[] = [{
    id: 1,
    name: 'Meu Primeiro Deck',
    types: { id: 1, name: 'fire' },
    cards: [],
    deleted: false
  }];
  constructor(private navigationService: NavigationService) {}

  clickDeckHome(deck: Deck, action: string) {
    console.log('Botão clicado!');
    switch (action) {
      case 'edit':
        this.navigationService.navigateTo('/edit', [deck.id])
        break;
      case 'delete':

        break;
    }
  }
}
