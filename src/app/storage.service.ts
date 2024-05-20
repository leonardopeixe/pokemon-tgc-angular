import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any) : any {
    localStorage.setItem(key, JSON.stringify(value))
  }

  add(key: string, value: any) : any {
    let itens = JSON.parse(localStorage.getItem(key) as string) ?? [];
    value.id = itens.length + 1;
    itens.push(value);
    localStorage.setItem(key, JSON.stringify(itens))
  }

  get(key: string) : any {
    return JSON.parse(localStorage.getItem(key) as string) ?? null
  }

  delete(key: string) : any {
    localStorage.removeItem(key);
  }

  softDelete(key: string, id: number) {
    let itens = JSON.parse(localStorage.getItem(key) as string);
    if(Array.isArray(itens)) {
      for (let index = 0; index < itens.length; index++) {
        const element = itens[index];
        if(element.id == id) {
          itens[index].deleted = true
        }
      }
    }
    this.set(key, itens);
  }
}
