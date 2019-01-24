
import * as firebase from 'firebase'
import { Usuario } from './acesso/usuario.model';
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class Autenticacao
{
  public token_id: string

  constructor(private router: Router){ }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log('Chegamos até o serviço: ', usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha) //firebase usa promisses
          .then((resposta: any) =>
          {
              console.log(resposta);


                //remover a senha do atributo senha do objeto usuário
                delete usuario.senha

                //registrando dados complementares do usuário no path email na base64

            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}
                `) //btoa converte os caracteres em base 64 pra evitar que os acentos atrapalhem no path
                    .set( usuario ) // faz uma inserção do tipo pk, se fosse push seria dados repetidos

            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    /* public autenticar(email: string, senha: string): void {
        console.log('email: ', email)
      console.log('senha: ', senha)

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta)) // sucesso da autenticacao
            .catch((error: Error) => console.log('ERROOOOOOO',error))
    } */
    public autenticar(email: string, senha: string): void {
      firebase.auth().signInWithEmailAndPassword(email, senha)
          .then((resposta: any) => {
              firebase.auth().currentUser.getIdToken()
                  .then((idToken: string) => {
                      this.token_id = idToken
                    localStorage.setItem('idToken', idToken)
                    //local storage armazena noo navegados os dados do token, idtoken é como se fosse uma chave desse armazenamento
                      this.router.navigate(['/home'])
                  })
          })
          .catch((error: Error) => console.log(error))
  }

  public autenticado(): boolean {

      if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
        this.token_id = localStorage.getItem('idToken')

        // pesquisar mais sobre localStorage
      }

      if( this.token_id === undefined ) {
          this.router.navigate(['/'])
      }

      return this.token_id !== undefined
  }

  public sair(): void {
// removendo o firebase do localStorage
      firebase.auth().signOut()
          .then(() => {
              localStorage.removeItem('idToken')
              this.token_id = undefined
              this.router.navigate(['/'])
          })
  }
}
