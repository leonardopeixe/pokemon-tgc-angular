import { Component, Signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { useAnimation } from '@angular/animations';
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
  IgxInputGroupComponent,
  IgxLabelDirective,
  IgxInputDirective,
  IgxToastComponent,
  IgxToastModule,
  PositionSettings,
  HorizontalAlignment,
  VerticalAlignment,
} from 'igniteui-angular';
import { slideInTop, slideOutBottom } from 'igniteui-angular/animations';
import { NavigationService } from '../services/navigation.service';
import { StorageService } from '../services/storage.service';
import { FilterDecksPipe } from '../pipes/filter-decks.pipe';
import { Deck } from '../models/deck.model';

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
    IgxInputGroupComponent,
    IgxLabelDirective,
    IgxInputDirective,
    IgxToastComponent,
    IgxToastModule,
    FilterDecksPipe,
    FormsModule,
  ],
})
export class DecksComponent {
  decks: Signal<Deck[]>;

  deckName: string = '';

  showDeleted: boolean = false;

  searchContact: string = '';

  @ViewChild(IgxToastComponent, { static: true }) toast!: IgxToastComponent;

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
    private storageService: StorageService
  ) {
    this.decks = this.storageService.getSignal('decks');
  }

  clickDecks(deck: Deck, action: string, dialog?: IgxDialogComponent) {
    switch (action) {
      case 'show':
        dialog?.open();
        break;
      case 'edit':
        dialog?.close();
        this.navigationService.navigateTo('/edit', [deck.id]);
        break;
      case 'delete':
        this.storageService.softDelete('decks', deck.id);
        this.showToast('Deck deletado com sucesso');
        break;
    }
  }

  criarNovoDeck(form: NgForm, dialog: IgxDialogComponent) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((controlName) => {
        const control = form.controls[controlName];
        control.markAsTouched();
        control.markAsDirty();
      });
      this.showToast('Preencha corretamente os campos');
      return;
    }
    let deck: Deck = {
      id: 0,
      name: this.deckName,
      type: 'normal',
      cards: [],
      deleted: false,
    };
    this.storageService.add('decks', deck);
    this.deckName = '';
    dialog.close();
  }

  showToast(message: string) {
    this.toast.textMessage = message;
    this.toast.positionSettings = this.newPositionSettings;
    this.toast.autoHide = true;
    this.toast.displayTime = 2000; // 3 seconds
    this.toast.open();
  }
}
