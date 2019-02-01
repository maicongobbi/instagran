import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Bd } from '../../bd.service';
import { Progresso } from '../../progresso.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-incluir-publicacoes',
  templateUrl: './incluir-publicacoes.component.html',
  styleUrls: ['./incluir-publicacoes.component.scss']
})
export class IncluirPublicacoesComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  private imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit()
  {
    // essa função é interessante, funciona como um behaviour, qq mudança no e-mail será refletida no email
    // informa sobre modificações do estado atual do usuário
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload =  Observable.create(1500) //Observable.interval(1500)

    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        //console.log(this.progresso.status)
        //console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento'

        this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          //emitir um evento do componente parent (home)
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
