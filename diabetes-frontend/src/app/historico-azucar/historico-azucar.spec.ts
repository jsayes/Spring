import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAzucar } from './historico-azucar';

describe('HistoricoAzucar', () => {
  let component: HistoricoAzucar;
  let fixture: ComponentFixture<HistoricoAzucar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoAzucar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoAzucar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
