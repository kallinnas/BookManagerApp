import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book, BookStatus } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {

  private baseUrl: string = `https://localhost:7197/api/Books`;
  BookStatus = BookStatus;
  http = inject(HttpClient);

  $books = this.http.get<Book[]>(this.baseUrl);

  addBookAsync(book: Book) {
    return this.http.post<Book>(this.baseUrl, book);
  }

  getBookByIdAsync(id: number) {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  updateBookAsync(book: Book) {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  deleteBookAsync(id: number) {
    return this.http.delete<Book>(`${this.baseUrl}/${id}`);
  }

  getBookByStatus(status: number) {
    return this.http.get<Book[]>(`${this.baseUrl}/Status?status=${status}`);
  }

  enumToArray(enumObj: any) {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => { return { value: enumObj[key], viewValue: key }; });
  }

}
