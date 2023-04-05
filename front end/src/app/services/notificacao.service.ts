import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private snackbar: MatSnackBar) { }

  showmessage(message:string){
    this.snackbar.open(message,'fechar',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:"bottom",
      panelClass: ['warning']
    })
  }
}
