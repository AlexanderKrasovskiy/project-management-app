import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardResModel, ColumnModel } from '../models/details.model';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {}

  getBoardById(id: string): Observable<BoardResModel> {
    return this.http.get<BoardResModel>(`/boards/${id}`);
  }

  createColumn(boardId: string, title: string): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`/boards/${boardId}/columns`, { title });
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}`);
  }
}
