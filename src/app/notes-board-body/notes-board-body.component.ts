import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { NoteLabel } from '../shared/models/note-label';
import { Note } from '../shared/models/note';
import { WeekDay } from '../shared/enums/week-day';

@Component({
    selector: 'app-notes-board-body',
    templateUrl: './notes-board-body.component.html',
    styleUrls: ['./notes-board-body.component.scss'],
})
export class NotesBoardBodyComponent implements OnChanges {
    @Input() public noteLabels: NoteLabel[];
    @Input() public currentWeekNumber: number;

    public getWeekDateByDay(day: string): string {
        return moment().day(day).week(this.currentWeekNumber).format('DD.MM');
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentWeekNumber.previousValue != this.currentWeekNumber) {
            this.updateWeekData();
        }
    }

    public updateWeekData() {
        this.noteLabels.forEach((x) =>
            x.setNotesByWeek(this.currentWeekNumber)
        );
    }

    public getOverlappingClassForNote(note: Note, weekDay: number): string {
        if (note.duration === 1) {
            return '';
        }
        const date = moment().day(weekDay).weekday(this.currentWeekNumber);

        let className = 'overlap-div-';

        if (note.endDate.week() === date.week()) {
            return className + note.duration;
        } else if (note.startDate.week() === date.week()) {
            const durationInCurrentWeek = note.startDate.diff(
                moment().day(WeekDay[5].toString()),
                'days'
            );
            return className + durationInCurrentWeek;
        } else {
            const startDateInWeek = moment().day(WeekDay[1].toString());
            const durationInNextWeek = startDateInWeek.diff(
                note.endDate,
                'days'
            );
            return className + durationInNextWeek;
        }
    }
}
