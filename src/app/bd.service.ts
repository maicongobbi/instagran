import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { Progresso } from './progresso.service'

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        console.log(publicacao)

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push( { titulo: publicacao.titulo } ) // insercao != do set
            .then((resposta: any) => {
// key é a chave única do documento inserido
                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            //console.log('Snapshot capturado no on(): ', snapshot)
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            //console.log(error)
                        },
                        () => {
                            //finalização do processo
                            this.progresso.status = 'concluido'
                            //console.log('upload completo')
                        }
                    )
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .orderByKey()
              .once('value')// once faz uma unica consulta
              // pode ter um ou vários arquivos
              // consultando o evento VALUE
              //on é como se fosse um listener escutando as mudanças se fosse usado, como não é o caso
              .then((snapshot: any) =>
              {
              // seria uma foto do banco nesse momento, ou seja  a consulta em si, pode retonar n* elementos
                console.log(snapshot.val())
                // .val mostra os valores do nosso objeto em questão

                let publicacoes: Array<any> = [];

                // aqui se faz o loop de cada publicaçãoo com o objetivo de se buscar as imagens a eles associadas
                snapshot.forEach((childSnapshot: any) => {

                    let publicacao = childSnapshot.val()
                  publicacao.key = childSnapshot.key
                  // a key é colocada na publicação para que se faça a correta ordenação


                    publicacoes.push(publicacao)
                })

                //console.log(publicacoes)
                //resolve(publicacoes)
// colocando as mais modernas em primeirto
                return publicacoes.reverse()
            })
            .then((publicacoes: any) => {

                publicacoes.forEach((publicacao) => {

                    //consultar a url da imagem (storage)
                    firebase.storage().ref()
                        .child(`imagens/${publicacao.key}`)
                        .getDownloadURL()
                      .then((url: string) =>
                      {
                          // aqui se faz o link da imagem com sua publicacao

                            publicacao.url_imagem = url

                            //consultar o nome do usuário
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                .once('value')
                              .then((snapshot: any) =>
                              {
                                  console.log('Nome do usuario ',snapshot.val());


                                    publicacao.nome_usuario = snapshot.val().nome_usuario
                                })
                        })
                })
// é como se fosse um return dessa promessa, o resolve funciona desta forma
                resolve(publicacoes)

            })

        })

    }
}
