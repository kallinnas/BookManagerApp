import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../modules/general.module';
import { BookService } from '../services/book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookStatus } from '../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {

  form!: any;
  statuses: any;
  isDisabled: boolean = true;

  service = inject(BookService);
  router = inject(Router);

  ngOnInit(): void {
    this.resetForm();
    this.statuses = this.service.enumToArray(BookStatus);
  }

  onFormEdit() {
    this.service.updateBookAsync(this.mapBook(this.form.value)).subscribe(book => {
      if (book) {
        alert('Book was edited successfully.');
        this.resetForm();
        this.router.navigate(['/display-books']);
      }
    });
  }

  onSearch() {
    this.service.getBookByIdAsync(this.form.value.id).subscribe(book => {
      if (book) {
        this.form.setValue(this.mapBook(book));
        this.isDisabled = false;
      }
    });
  }

  private resetForm() {
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      status: new FormControl('', Validators.required)
    });
  }

  private mapBook(source: any) {
    return {
      id: source.id,
      title: source.title,
      author: source.author,
      year: source.year,
      status: +source.status
    }
  }
}
