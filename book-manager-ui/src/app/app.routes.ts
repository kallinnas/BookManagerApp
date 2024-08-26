import { Routes } from '@angular/router';
import { DisplayBooksComponent } from './display-books/display-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

export const routes: Routes = [
    { path: 'display-books', component: DisplayBooksComponent },
    { path: '', component: DisplayBooksComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book', component: EditBookComponent },
];
