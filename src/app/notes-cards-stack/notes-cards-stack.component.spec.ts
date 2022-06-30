import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCardsStackComponent } from './notes-cards-stack.component';

describe('NotesCardsStackComponent', () => {
  let component: NotesCardsStackComponent;
  let fixture: ComponentFixture<NotesCardsStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesCardsStackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesCardsStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
