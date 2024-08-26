import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralModule } from '../modules/general.module';
import { Book, BookStatus } from '../models/book.model';

@Component({
  selector: 'app-display-books',
  standalone: true,
  imports: [GeneralModule],
  templateUrl: './display-books.component.html',
  styleUrl: './display-books.component.css'
})
export class DisplayBooksComponent implements OnInit {

  statuses: any;
  dataSource: any;
  selectedStatus: any = { value: -1, valueView: 'STATUSES' };
  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'status', 'remove'];

  service = inject(BookService);

  ngOnInit(): void {
    this.setDataSource();
    this.prepareStatuses();
  }

  applyFilter($event: Event) {
    const filterInput = (event?.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: Book, filter: string) => {
      return data.title.trim().toLowerCase().includes(filter);
    }

    this.dataSource.filter = filterInput.trim().toLowerCase();
  }

  deleteBook(id: any) {
    this.service.deleteBookAsync(id).subscribe(result => {
      if (result) {
        alert('Book successfully removed.');
        this.setDataSource();
      }
    });
  }

  onStatusChange(status: any) {
    if (status < 0) {
      this.setDataSource();
    } else {
      this.service.getBookByStatus(status).subscribe(books => {
        if (books) {
          this.dataSource = new MatTableDataSource(books);
        }
      });
    }
  }

  private prepareStatuses() {
    this.statuses = this.service.enumToArray(BookStatus);
    this.statuses.push({ value: -1, viewValue: 'ALL STATUSES' });
  }

  private setDataSource() {
    this.service.$books.subscribe(books => {
      if (books) {
        this.dataSource = new MatTableDataSource(books);
      }
    });
  }
}
