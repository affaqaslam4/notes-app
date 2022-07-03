import * as moment from 'moment';
import { INoteDto } from '../dtos/inote-dto';

export class Note {
    id: number;
    title: string;
    summary?: string;
    labels: number[];
    startDate: moment.Moment;
    endDate: moment.Moment;
    duration: number;
    startDateFormatted: string;

    public constructor(note: INoteDto) {
        this.id = note.id;
        this.title = note.title;
        this.summary = note.summary;
        this.labels = note.labels;
        this.startDate = moment.unix(note.startDate);
        this.startDateFormatted = this.startDate.format('DD.MM.');
        this.endDate = moment.unix(note.endDate);
        this.duration = this.startDate.diff(this.endDate, 'days') + 1;
    }
}
