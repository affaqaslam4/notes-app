import { Component, OnInit } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { DataService } from '../core/services/data-service';
import { INoteLabelDto } from '../shared/dtos/inote-label-dto';
import { INoteDto } from '../shared/dtos/inote-dto';
import { NoteLabel } from '../shared/models/note-label';
import { INotesGetResponseDto } from './dtos/inotes-get-response-dto';
import * as moment from 'moment';

@Component({
    selector: 'app-notes-board',
    templateUrl: './notes-board.component.html',
    styleUrls: ['./notes-board.component.scss'],
})
export class NotesBoardComponent implements OnInit {
    public noteLabelDtos: INoteLabelDto[];
    public notesDtos: INoteDto[];
    public noteLabels: NoteLabel[];
    public currentWeekNumber: number;
    public isLoaded = false;

    public minWeekNumber: number = 1000;
    public maxWeekNumber: number = 1000;

    public constructor(private dataService: DataService) {}

    public ngOnInit(): void {
        forkJoin({
            labels: this.dataService.get<INoteLabelDto[]>('/noteLabels'),
            notesResponse: this.dataService.get<INotesGetResponseDto>('/notes'),
        }).subscribe(({ labels, notesResponse }) => {
            this.noteLabelDtos = labels;
            this.notesDtos = notesResponse.notes;
            this.processData();
        });
    }

    private processData(): void {
        this.noteLabels = this.noteLabelDtos.map(
            (x) =>
                new NoteLabel(
                    x,
                    this.notesDtos.filter((note) => note.labels.includes(x.id))
                )
        );

        this.noteLabels.forEach((label) =>
            label.notes.forEach((note) => {
                this.minWeekNumber = Math.min(
                    this.minWeekNumber,
                    note.startDate.week(),
                    note.endDate.week()
                );
                this.maxWeekNumber = Math.max(
                    this.maxWeekNumber,
                    note.startDate.week(),
                    note.endDate.week()
                );
            })
        );

        this.currentWeekNumber = this.minWeekNumber;

        this.isLoaded = true;
    }

    public currentWeekChanges(currentWeekNumber: number): void {
        this.currentWeekNumber = currentWeekNumber;
    }
}
