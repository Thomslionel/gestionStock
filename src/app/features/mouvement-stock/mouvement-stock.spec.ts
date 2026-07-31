import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementStock } from './mouvement-stock';

describe('MouvementStock', () => {
  let component: MouvementStock;
  let fixture: ComponentFixture<MouvementStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouvementStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
