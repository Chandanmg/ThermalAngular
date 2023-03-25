import { Injectable } from '@angular/core';
import {
    MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition
} from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}
    showMessage(
      message: string,
      type: string = 'success',
      position: MatSnackBarVerticalPosition = 'top'
    ) {
      console.log(type)
      const config = new MatSnackBarConfig();
      config.verticalPosition = position;
      config.panelClass = [type];
      config.duration = 5000;
      console.log(config);
      this.snackBar.open(message, 'Close', config);
    }
}