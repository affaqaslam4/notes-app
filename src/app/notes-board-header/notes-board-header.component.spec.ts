import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBoardHeaderComponent } from './notes-board-header.component';

describe('NotesBoardHeaderComponent', () => {
  let component: NotesBoardHeaderComponent;
  let fixture: ComponentFixture<NotesBoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesBoardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
