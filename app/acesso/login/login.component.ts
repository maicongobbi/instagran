import { Autenticacao } from "./../../autenticacao.service";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<
    string
  >();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null)
  });

  constructor(private autenticacao: Autenticacao) {}

  ngOnInit() {}

  /**
   * informa ao componente pai acesso oara renderizar o componente login
   */
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit("cadastro");
  }
  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }
}
