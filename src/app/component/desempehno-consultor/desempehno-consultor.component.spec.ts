import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempehnoConsultorComponent } from './desempehno-consultor.component';

describe('DesempehnoConsultorComponent', () => {
  let component: DesempehnoConsultorComponent;
  let fixture: ComponentFixture<DesempehnoConsultorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesempehnoConsultorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesempehnoConsultorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
