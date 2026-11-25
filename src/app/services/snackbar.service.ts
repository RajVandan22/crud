import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  //private fname: string = "Dhanraj";

  constructor(private snackar: MatSnackBar) { }

 public snackbar(message: string, btn:string = "Close") { // default parameter
    return this.snackar.open(message, btn, {duration: 3000})
  }
}
