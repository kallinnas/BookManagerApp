import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { GeneralModule } from '../modules/general.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookStatus } from '../models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {

  form!: any;
  statuses: any;
  isDisabled: boolean = true;

  service = inject(BookService);
  router = inject(Router);

  ngOnInit(): void {
    this.resetForm();
    this.onFormValueChange();
    this.statuses = this.service.enumToArray(BookStatus);
  }

  onFormSubmit() {
    const book = this.mapBook();
    this.service.addBookAsync(book).subscribe(result => {
      if (result) {
        alert('Book added successfully.');
        this.router.navigate(['/display-books']);
      }
    });
  }

  onFormValueChange() {
    this.form.valueChanges.subscribe((result: any) => {
      if (this.form.valid) {
        this.isDisabled = false;
      } else this.isDisabled = true;
    });
  }

  private resetForm() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      status: new FormControl('', Validators.required)
    });
  }

  private mapBook() {
    return {
      id: 0,
      title: this.form.value.title,
      author: this.form.value.author,
      year: this.form.value.year,
      status: +this.form.value.status
    }
  }
}
