import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-carrosel',
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.css']
})
export class CarroselComponent {

  imagens: string[] = ["/assets/img/banner-1.jpg", "/assets/img/banner-2.jpg", "/assets/img/banner-3.jpg"]
   // Guarda a referência do temporizador.
  // Assim conseguimos interromper o temporizador
  // a qualquer momento
  timerSubs!: Subscription;

  private _indexImagemAtiva: number = 0;

  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva =
      value < this.imagens.length ? value : 0;
  }

  ngOnInit(): void {
    this.iniciarTimer();

  }

  ngOnDestroy(): void {
    this.pararTimer();
  }


  iniciarTimer(): void {
    this.timerSubs = timer(6000).subscribe(() => {
      this.ativarImagem(
        this.indexImagemAtiva + 1
      );
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  ativarImagem(index: number): void {
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }

}
