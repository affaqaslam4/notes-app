import { INoteLabelDto } from '../dtos/inote-label-dto';
import { INoteDto } from '../dtos/inote-dto';
import { Note } from './note';
import { WeekDay } from '../enums/week-day';
import * as moment from 'moment';
export class NoteLabel {
    id: number;
    text: string;
    notes: Note[];

    notesByWeekNumber: Note[][] = [];

    constructor(label: INoteLabelDto, notes: INoteDto[]) {
        this.id = label.id;
        this.text = label.text;
        this.notes = notes.map((x) => new Note(x));
    }

    public setNotesByWeek(weekNumber: number): void {
        for (let i = 1; i <= 5; i++) {
            var date = moment().day(WeekDay[i].toString()).week(weekNumber);
            this.notesByWeekNumber[i - 1] = this.notes.filter((x) => {
                return (
                    x.startDate.isSame(date, 'day') ||
                    (x.startDate.week() !== weekNumber &&
                        date.isSame(x.endDate, 'day'))
                );
            });
        }
    }
}
