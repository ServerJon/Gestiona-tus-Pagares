import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaresCollectionComponent } from './pagares-collection.component';

describe('PagaresCollectionComponent', () => {
  let component: PagaresCollectionComponent;
  let fixture: ComponentFixture<PagaresCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagaresCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagaresCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
