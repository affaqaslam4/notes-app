import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NoteLabel } from '../shared/models/note-label';

@Component({
    selector: 'app-notes-board-body',
    templateUrl: './notes-board-body.component.html',
    styleUrls: ['./notes-board-body.component.scss'],
})
export class NotesBoardBodyComponent implements OnInit {
    @Input() public noteLabels: NoteLabel[];
    @Input() public currentWeekNumber: number;

    public getWeekDateByDay(day: string): string {
        return moment().day(day).week(this.currentWeekNumber).format('DD.MM');
    }

    constructor() {}

    ngOnInit(): void {}
}
