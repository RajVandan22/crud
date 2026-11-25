import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() {}
     generateUUID(): string {
    return crypto.randomUUID();
  }
}
