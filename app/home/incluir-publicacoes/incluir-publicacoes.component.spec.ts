import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirPublicacoesComponent } from './incluir-publicacoes.component';

describe('IncluirPublicacoesComponent', () => {
  let component: IncluirPublicacoesComponent;
  let fixture: ComponentFixture<IncluirPublicacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirPublicacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirPublicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
