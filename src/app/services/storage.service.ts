import { Injectable } from '@angular/core';
import { signal, Signal, WritableSignal } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private signals: { [key: string]: WritableSignal<any[]> } = {};

  constructor() {}

  private initializeSignal(key: string): void {
    if (!this.signals[key]) {
      this.signals[key] = signal(this.get(key) || []);
    }
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.initializeSignal(key);
    this.signals[key].set(value);
  }

  add(key: string, value: any): void {
    const itens = this.get(key) || [];
    value.id = itens.length + 1;
    itens.push(value);
    this.set(key, itens);
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key) as string) ?? null;
  }

  getById(key: string, id: number): any {
    const itens = this.get(key);
    let selected: any = null;
    if (Array.isArray(itens)) {
      for (let index = 0; index < itens.length; index++) {
        if (itens[index].id == id) {
          selected = itens[index];
        }
      }
    }
    return selected ?? null;
  }

  delete(key: string): void {
    localStorage.removeItem(key);
    this.initializeSignal(key);
    this.signals[key].set([]);
  }

  softDelete(key: string, id: number): void {
    const itens = this.get(key);
    if (Array.isArray(itens)) {
      for (let index = 0; index < itens.length; index++) {
        if (itens[index].id == id) {
          itens[index].deleted = true;
        }
      }
    }
    this.set(key, itens); // Reutilizando set para evitar duplicação de código
  }

  getSignal(key: string): Signal<any[] | any> {
    this.initializeSignal(key);
    return this.signals[key];
  }
}
