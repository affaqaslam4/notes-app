import { INoteLabelDto } from '../dtos/inote-label-dto';
import { INoteDto } from '../dtos/inote-dto';
import { Note } from './note';
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
        for (let i = 0; i < 5; i++) {
            this.notesByWeekNumber[i] = this.notes.filter(
                (x) =>
                    x.startDate.week() === weekNumber ||
                    x.endDate.week() === weekNumber
            );
        }
    }
}
