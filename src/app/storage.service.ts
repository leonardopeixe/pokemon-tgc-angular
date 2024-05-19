import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    localStorage.getItem(key)
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  softDelete(key: string, value: any) {
    let itens = JSON.parse(localStorage.getItem(key) as string);
    if(Array.isArray(itens)) {
      for (let index = 0; index < itens.length; index++) {
        const element = itens[index];
        if(element.id == value.id) {
          itens[index].deleted = true
        }
      }
    }
    localStorage.setItem(key, itens);
  }
}
