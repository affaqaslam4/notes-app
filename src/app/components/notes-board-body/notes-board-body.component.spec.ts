import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBoardBodyComponent } from './notes-board-body.component';

describe('NotesBoardBodyComponent', () => {
  let component: NotesBoardBodyComponent;
  let fixture: ComponentFixture<NotesBoardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesBoardBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesBoardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
