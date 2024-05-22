import {
  Component,
  Signal,
  ViewChild,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { useAnimation } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IgxPieChartModule,
  IgxItemLegendModule,
} from 'igniteui-angular-charts';
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
  IgxInputGroupComponent,
  IgxInputDirective,
  IgxToastComponent,
  IgxToastModule,
  PositionSettings,
  HorizontalAlignment,
  VerticalAlignment,
  IgxGridModule,
  IgxColumnComponent,
  IgxLabelDirective,
  IgxDropDownItemNavigationDirective,
  IgxAutocompleteDirective,
  IgxDropDownModule,
  IgxDropDownItemComponent,
  IgxInputGroupModule,
} from 'igniteui-angular';
import {
  slideInTop,
  slideOutBottom,
} from 'igniteui-angular/animations';
import { NavigationService } from '../services/navigation.service';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { FilterDecksPipe } from '../pipes/filter-decks.pipe';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  encapsulation: ViewEncapsulation.None,
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
    IgxInputGroupComponent,
    IgxInputDirective,
    IgxToastComponent,
    IgxToastModule,
    FilterDecksPipe,
    FormsModule,
    IgxGridModule,
    IgxColumnComponent,
    IgxLabelDirective,
    IgxDropDownItemNavigationDirective,
    IgxAutocompleteDirective,
    IgxDropDownModule,
    IgxDropDownItemComponent,
    IgxInputGroupModule,
    CommonModule,
    IgxPieChartModule,
    IgxItemLegendModule,
  ],
})
export class EditComponent {
  @ViewChild(IgxToastComponent, { static: true }) toast!: IgxToastComponent;
  deck: Signal<Deck>;
  id: any;
  cards: Signal<Card[]>;
  filteredCards: Card[] = [];
  selectedCard: boolean = false;
  countCardsByName: number = 0;
  totalCartas: number = 0;
  typeChartData: any[] = [];
  supertypeChartData: any[] = [];

  public newPositionSettings: PositionSettings = {
    openAnimation: useAnimation(slideInTop, {
      params: { duration: '1000ms', fromPosition: 'translateY(100%)' },
    }),
    closeAnimation: useAnimation(slideOutBottom, {
      params: { duration: '1000ms', fromPosition: 'translateY(0)' },
    }),
    horizontalDirection: HorizontalAlignment.Center,
    verticalDirection: VerticalAlignment.Top,
    horizontalStartPoint: HorizontalAlignment.Left,
    verticalStartPoint: VerticalAlignment.Bottom,
  };

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.storageService.getById('decks', this.id));
    this.storageService.set(
      'deck',
      this.storageService.getById('decks', this.id)
    );
    this.deck = this.storageService.getSignal('deck');
    this.cards = this.storageService.getSignal('cards');
    this.totalCartasReload();
  }

  async onSelection(event: any) {
    if (event.newSelection.value) {
      this.countCardsByName = 0;
      let repeatedCards = this.deck().cards.filter((element) => {
        return event.newSelection.value == element.name;
      });
      console.log(repeatedCards);
      repeatedCards.forEach((element) => {
        console.log(element.qtd);
        this.countCardsByName += element.qtd;
      });
      await this.apiService
        .getCards(
          '?q=!name:"' +
            event.newSelection.value +
            '"&pageSize=8&orderBy=id&select=id,name,types,supertype,images,nationalPokedexNumbers,tcgplayer,number'
        )
        .subscribe({
          next: (response) => {
            this.storageService.set('cards', response.data);
            this.selectedCard = true;
          },
          error: (error) => {
            console.error('Erro ao obter os cards', error);
          },
          complete: () => {
            console.log('Requisição completa');
          },
        });
    }
  }

  async onInput(input: any) {
    if (input.value.length >= 3) {
      await this.apiService
        .getCards(
          '?q=name:"' +
            input.value.toLowerCase() +
            '*"&pageSize=9&orderBy=name,-number&select=id,name,types,supertype,images,nationalPokedexNumbers,tcgplayer,number'
        )
        .subscribe({
          next: (response) => {
            this.selectedCard = false;
            this.storageService.set('cards', response.data);
            const uniqueNames = new Set<string>();
            this.filteredCards = this.cards().filter((item) => {
              const isDuplicate = uniqueNames.has(item.name.toLowerCase());
              uniqueNames.add(item.name.toLowerCase());
              return !isDuplicate;
            });
          },
          error: (error) => {
            console.error('Erro ao obter os cards', error);
          },
          complete: () => {
            console.log('Requisição completa');
          },
        });
    }
  }

  addCard(card: Card) {
    this.countCardsByName = 0;
    let repeatedCards = this.deck().cards.filter((element) => {
      return card.name == element.name;
    });
    repeatedCards.forEach((element) => {
      this.countCardsByName += element.qtd;
    });
    if (this.countCardsByName >= 4) {
      this.showToast('Máximo de cartas atingido, remova para adicionar mais');
    } else {
      repeatedCards = this.deck().cards.filter(
        (element) => card.id == element.id
      );
      if (repeatedCards[0] && repeatedCards[0].qtd > 0) {
        repeatedCards[0].qtd = repeatedCards[0].qtd + 1;
      } else {
        card.qtd = 1;
        this.deck().cards.push(card);
      }
      this.storageService.set('deck', this.deck());
      this.countCardsByName += 1;
    }
    this.totalCartasReload();
  }

  removeCard(card: Card) {
    let repeatedCards = this.deck().cards.filter((element) => {
      return card.id == element.id;
    });
    if (repeatedCards.length > 0 && repeatedCards[0].qtd != 0) {
      repeatedCards[0].qtd = repeatedCards[0].qtd - 1;
      if (repeatedCards[0].qtd == 0) {
        this.deck().cards = this.deck().cards.filter((element) => {
          return card.id != element.id;
        });
      }
    }
    this.storageService.set('deck', this.deck());
    this.countCardsByName -= 1;
    this.totalCartasReload();
  }

  saveDeck() {
    if (this.totalCartas < 24) {
      this.showToast('Minímo de cartas não atingido, adicione mais');
      return;
    } else if (this.totalCartas > 60) {
      this.showToast('Máximo de cartas atingido, remova para adicionar mais');
      return;
    }
    let decksTemp: Deck[] = this.storageService
      .get('decks')
      .map((element: Deck) => {
        if (element.id == this.deck().id) {
          element = this.deck();
        }
        return element;
      });
    let type = this.typeChartData.reduce(
      (max, item) => (item.value > max.value ? item : max),
      this.typeChartData[0]
    );
    console.log(type);
    this.deck().type = type.label ?? 'normal';
    this.deck().deleted = false;
    this.storageService.set('decks', decksTemp);
    this.navigationService.navigateTo('/');
  }

  prepareDataInfo() {
    const typeCount: { [key: string]: number } = {};
    const supertypeCount: { [key: string]: number } = {};

    this.deck().cards.forEach((card) => {
      if (card.types) {
        card.types.forEach((type: string) => {
          typeCount[type] = (typeCount[type] || 0) + card.qtd;
        });
      }
      card.supertype = card.supertype ?? 'Trainer';
      supertypeCount[card.supertype] =
        (supertypeCount[card.supertype] || 0) + card.qtd;
    });

    this.typeChartData = Object.keys(typeCount).map((type) => ({
      label: type,
      value: typeCount[type],
    }));

    this.supertypeChartData = Object.keys(supertypeCount).map((supertype) => ({
      label: supertype,
      value: supertypeCount[supertype],
    }));
  }

  showQtd(id: string) {
    let qtdCards = this.deck().cards.filter((element) => {
      return id == element.id;
    });
    return qtdCards.length > 0 ? qtdCards[0].qtd : 0;
  }

  totalCartasReload() {
    this.totalCartas = 0;
    this.deck().cards.forEach((element) => {
      this.totalCartas += element.qtd;
    });
    this.prepareDataInfo();
  }

  goTcgPlayer(url: string) {
    window.open(url, '_blank');
  }

  showToast(message: string) {
    this.toast.textMessage = message;
    this.toast.positionSettings = this.newPositionSettings;
    this.toast.autoHide = true;
    this.toast.displayTime = 2000; // 3 seconds
    this.toast.open();
  }
}
