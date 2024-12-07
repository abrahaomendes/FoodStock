import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarCategoriaComponent } from './alterar-categoria.component';

describe('AlterarCategoriaComponent', () => {
  let component: AlterarCategoriaComponent;
  let fixture: ComponentFixture<AlterarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
