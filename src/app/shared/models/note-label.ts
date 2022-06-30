import { INoteLabelDto } from '../dtos/inote-label-dto';
import { INoteDto } from '../dtos/inote-dto';
import { Note } from './note';
export class NoteLabel {
    id: number;
    text: string;
    notes: Note[];

    constructor(label: INoteLabelDto, notes: INoteDto[]) {
        this.id = label.id;
        this.text = label.text;

        this.notes = notes.map((x) => new Note(x));

        console.log(this.notes);
    }

    public getDataByWeek(weekNumber: number): void {}
}
