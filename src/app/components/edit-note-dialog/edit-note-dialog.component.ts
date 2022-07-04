import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { INoteDto } from 'src/app/shared/dtos/inote-dto';
import { Note } from '../../shared/models/note';
import { DataService } from '../../core/services/data-service';

@Component({
    selector: 'app-edit-note-dialog',
    templateUrl: './edit-note-dialog.component.html',
    styleUrls: ['./edit-note-dialog.component.scss'],
})
export class EditNoteDialogComponent implements OnInit {
    public formGroup: FormGroup;
    constructor(
        private dataService: DataService,
        private dialogRef: MatDialogRef<EditNoteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Note
    ) {}

    ngOnInit(): void {
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('400px');
        this.formGroup = new FormGroup({
            title: new FormControl(this.data.title, Validators.required),
            summary: new FormControl(
                this.data.summary,
                Validators.maxLength(250)
            ),
            startDate: new FormControl(
                this.data.startDate,
                Validators.required
            ),
            endDate: new FormControl(this.data.endDate, Validators.required),
            labels: new FormControl(this.data.labels, Validators.required),
        });
    }

    public save(): void {
        const formData = this.formGroup.value;

        const requestData: INoteDto = {
            id: this.data.id,
            title: formData.title,
            summary: formData.summary,
            labels: formData.labels,
            startDate: formData.startDate.unix(),
            endDate: formData.endDate.unix(),
        };

        this.dataService
            .put(`/notes/${requestData.id}`, '', requestData)
            .subscribe(() => {
                this.dialogRef.close(requestData);
            });
    }
}
