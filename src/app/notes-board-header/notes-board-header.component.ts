import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { INoteLabelDto } from '../shared/dtos/inote-label-dto';

@Component({
    selector: 'app-notes-board-header',
    templateUrl: './notes-board-header.component.html',
    styleUrls: ['./notes-board-header.component.scss'],
})
export class NotesBoardHeaderComponent implements OnInit {
    @Input() public minWeekNumber: number;
    @Input() public maxWeekNumber: number;
    @Input() public labels: INoteLabelDto[];

    @Output() public onCurrentWeekChange = new EventEmitter<number>();

    public currentWeekNumber: number;
    public selectedLabelId = -1;

    public get currentWeekLabel(): string {
        return `Week ${this.currentWeekNumber}: ${moment()
            .day('Monday')
            .week(this.currentWeekNumber)
            .format('DD MMM')} - ${moment()
            .day('Friday')
            .week(this.currentWeekNumber)
            .format('DD MMM')}`;
    }

    public ngOnInit(): void {
        this.currentWeekNumber = this.minWeekNumber;
    }

    public decrementWeek(): void {
        this.currentWeekNumber--;
        this.onCurrentWeekChange.emit(this.currentWeekNumber);
    }

    public incrementWeek(): void {
        this.currentWeekNumber++;
        this.onCurrentWeekChange.emit(this.currentWeekNumber);
    }
}
