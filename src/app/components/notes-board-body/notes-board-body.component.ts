import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    OnInit,
    EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import { NoteLabel } from '../../shared/models/note-label';
import { Note } from '../../shared/models/note';
import { INoteDto } from '../../shared/dtos/inote-dto';

@Component({
    selector: 'app-notes-board-body',
    templateUrl: './notes-board-body.component.html',
    styleUrls: ['./notes-board-body.component.scss'],
})
export class NotesBoardBodyComponent implements OnInit, OnChanges {
    @Input() public noteLabels: NoteLabel[];
    @Input() public currentWeekNumber: number;
    @Input() public labelId: number;

    public visibleLabels: NoteLabel[] = [];

    public getWeekDateByDay(day: string): string {
        return moment().day(day).week(this.currentWeekNumber).format('DD.MM');
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.currentWeekNumber &&
            changes.currentWeekNumber.previousValue != this.currentWeekNumber
        ) {
            this.updateWeekData();
        }

        if (changes.labelId && changes.labelId.previousValue != this.labelId) {
            this.visibleLabels = this.noteLabels.filter(
                (x) => x.id === this.labelId || this.labelId === -1
            );
        }
    }

    public onNoteUpdate(updatedNote: INoteDto): void {
        if (updatedNote) {
            this.noteLabels.forEach((x) => {
                const noteIndex = x.notes.findIndex(
                    (y) => y.id === updatedNote.id
                );

                if (noteIndex > -1 && !updatedNote.labels.includes(x.id)) {
                    x.notes.splice(noteIndex, 1);
                } else if (
                    noteIndex === -1 &&
                    updatedNote.labels.includes(x.id)
                ) {
                    x.notes.splice(noteIndex, 0, new Note(updatedNote));
                } else if (
                    noteIndex > -1 &&
                    updatedNote.labels.includes(x.id)
                ) {
                    x.notes[noteIndex] = new Note(updatedNote);
                }
            });
        }

        this.updateWeekData();
    }

    public onDeleteNote(
        noteLabel: NoteLabel,
        note: Note,
        weekNumber: number
    ): void {
        noteLabel.notesByWeekNumber[weekNumber].pop();
        const noteIndex = noteLabel.notes.findIndex((x) => x.id === note.id);
        noteLabel.notes.splice(noteIndex, 1);
    }

    public ngOnInit(): void {
        this.visibleLabels = this.noteLabels;
    }

    public updateWeekData() {
        this.noteLabels.forEach((x) =>
            x.setNotesByWeek(this.currentWeekNumber)
        );
    }
}
