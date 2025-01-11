import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarToastService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showToast(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 3000;
    this.zone.run(() => {
      this.snackBar.open(message, '', config);
    });
  }
}
