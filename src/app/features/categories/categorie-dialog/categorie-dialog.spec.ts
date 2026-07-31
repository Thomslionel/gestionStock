import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDialog } from './categorie-dialog';

describe('CategorieDialog', () => {
  let component: CategorieDialog;
  let fixture: ComponentFixture<CategorieDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
