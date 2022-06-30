import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotesDialogComponent } from './update-notes-dialog.component';

describe('UpdateNotesDialogComponent', () => {
  let component: UpdateNotesDialogComponent;
  let fixture: ComponentFixture<UpdateNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNotesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
