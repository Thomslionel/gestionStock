import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDialog } from './lot-dialog';

describe('LotDialog', () => {
  let component: LotDialog;
  let fixture: ComponentFixture<LotDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
