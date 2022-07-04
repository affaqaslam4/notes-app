import { WeekDay } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Note } from '../shared/models/note';
import { INoteDto } from '../shared/dtos/inote-dto';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteDialogComponent } from '../components/edit-note-dialog/edit-note-dialog.component';

@Component({
    selector: 'app-notes-card',
    templateUrl: './notes-card.component.html',
    styleUrls: ['./notes-card.component.scss'],
})
export class NotesCardComponent {
    @Input() public note: Note;
    @Input() public weekDay: number;
    @Input() public currentWeekNumber: number;

    @Output() public onNoteUpdate = new EventEmitter<INoteDto>();
    @Output() public onDeleteNote = new EventEmitter();

    public constructor(public dialog: MatDialog) {}

    public getOverlappingClassForNote(): string {
        if (this.note.duration === 1) {
            return '';
        }
        const date = moment().day(this.weekDay).week(this.currentWeekNumber);

        let className = 'overlap-div-';

        if (
            this.note.endDate.week() === date.week() &&
            this.note.startDate.week() === date.week()
        ) {
            return className + this.note.duration;
        } else if (
            this.note.startDate.week() === date.week() &&
            this.note.endDate.week() !== date.week()
        ) {
            const durationInCurrentWeek =
                Math.abs(
                    this.note.startDate.diff(
                        moment()
                            .day(WeekDay[5].toString())
                            .week(this.currentWeekNumber),
                        'days'
                    )
                ) + 1;
            return className + durationInCurrentWeek;
        } else {
            const startDateInWeek = moment()
                .day(WeekDay[1].toString())
                .week(this.currentWeekNumber);
            const durationInNextWeek =
                Math.abs(startDateInWeek.diff(this.note.endDate, 'days')) + 1;
            return className + durationInNextWeek;
        }
    }

    public editNote(): void {
        const dialogRef = this.dialog.open(EditNoteDialogComponent, {
            data: this.note,
        });
        dialogRef.afterClosed().subscribe((updatedNote: INoteDto) => {
            if (updatedNote) {
                this.onNoteUpdate.emit(updatedNote);
            }
        });
    }

    public deleteNote(event: Event): void {
        event.stopPropagation();

        this.onDeleteNote.emit();
    }
}
