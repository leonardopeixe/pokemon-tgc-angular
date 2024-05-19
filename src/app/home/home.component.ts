import { Component } from '@angular/core';
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
} from 'igniteui-angular';

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
  ],
})
export class HomeComponent {
  decks = ['Welcome to Ignite UI for Angular!'];
  constructor() {}
}
