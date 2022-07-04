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
        this.duration = Math.abs(this.startDate.diff(this.endDate, 'days'));
        this.duration =
            this.duration -
            this.excludeWeekendsFromDiff(this.startDate, this.duration) +
            1;
    }

    private excludeWeekendsFromDiff(
        startDate: moment.Moment,
        duration: number
    ): number {
        const date = moment(startDate);
        let toDeduct = 0;
        for (let i = 1; i <= duration; i++) {
            date.add(1, 'days');

            if (date.day() === 6 || date.day() === 0) {
                toDeduct++;
            }
        }

        return toDeduct;
    }
}
