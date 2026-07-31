import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementStockDialog } from './mouvement-stock-dialog';

describe('MouvementStockDialog', () => {
  let component: MouvementStockDialog;
  let fixture: ComponentFixture<MouvementStockDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementStockDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouvementStockDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
