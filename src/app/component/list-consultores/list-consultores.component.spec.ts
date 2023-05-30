import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultoresComponent } from './list-consultores.component';

describe('ListConsultoresComponent', () => {
  let component: ListConsultoresComponent;
  let fixture: ComponentFixture<ListConsultoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsultoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsultoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
