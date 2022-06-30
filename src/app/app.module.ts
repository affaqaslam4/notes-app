import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesBoardComponent } from './notes-board/notes-board.component';
import { NotesBoardHeaderComponent } from './notes-board-header/notes-board-header.component';
import { NotesBoardBodyComponent } from './notes-board-body/notes-board-body.component';
import { UpdateNotesDialogComponent } from './update-notes-dialog/update-notes-dialog.component';
import { NotesCardComponent } from './notes-card/notes-card.component';
import { NotesCardsStackComponent } from './notes-cards-stack/notes-cards-stack.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        AppComponent,
        NotesBoardComponent,
        NotesBoardHeaderComponent,
        NotesBoardBodyComponent,
        UpdateNotesDialogComponent,
        NotesCardComponent,
        NotesCardsStackComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
