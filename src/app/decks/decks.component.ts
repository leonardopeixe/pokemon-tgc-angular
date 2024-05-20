import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { StorageService } from '../storage.service';
import { FilterDecksPipe } from '../pipes/filter-decks.pipe';
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
  IgxDialogComponent,
  IgxListModule,
  PositionSettings
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
    IgxDialogComponent,
    IgxListModule,
    FilterDecksPipe
  ],
})
export class DecksComponent {
  // @TODO vincular com a API
  decks: Deck[] = [];

  showDeleted: boolean = false;

  showSettings: PositionSettings = {
    minSize: { height: 450, width: 450 }
  };

  searchContact: string = "";

  constructor(private navigationService: NavigationService, private storageService: StorageService) {
    this.decks = this.storageService.get('decks') as Deck[]
  }

  clickDecks(deck: Deck, action: string, dialog?: IgxDialogComponent) {
    console.log('Botão clicado!');
    switch (action) {
      case 'show':
        dialog?.open()
        break;
      case 'edit':
        dialog?.close()
        this.navigationService.navigateTo('/edit', [deck.id])
        break;
      case 'delete':
        this.storageService.softDelete('decks', deck.id)
        this.realoadDecks()
        dialog?.close()
        break;
    }
  }

  criarNovoDeck(dialog: IgxDialogComponent) {
    let deck: Deck = {
      id: 0,
      name: 'Meu Primeiro Deck',
      types: { id: 1, name: 'fire' },
      cards: [
        {
          id: "xy1-1",
          name: 'Venusaur-EX'
        }
      ],
      deleted: false
    }
    this.storageService.add('decks', deck)
    this.realoadDecks()
    dialog.close()
  }
  realoadDecks() {
    this.decks = this.storageService.get('decks') as Deck[];
  }
}
