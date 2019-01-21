import { animate, keyframes } from '@angular/animations';
import { style, transition, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-150px, 0)' }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração
      ]) // estado void é quando ainda o componente não foi criado
       // duração de 500, 0 é o atraso para inicio da transição
    ]),
    trigger('animacao-painel', [ // esse nome será associado ao html onde será usado - VOID É O ESTADO INICAL do componente
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),

        //0 void ----X----------------------------X--X--X-------------------X criado 1.5s//
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)'}),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)'})
        ])) //duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'
  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string) : void {
    this.cadastro = event === 'cadastro' ? true : false
  }

  public inicioDaAnimacao(): void {
    console.log('início da animação')
  }

  public fimDaAnimacao(): void {
    console.log('fim da animação')
  }
}
