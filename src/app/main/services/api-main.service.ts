import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardIDRequestModel, BoardRequestModel } from '../models/main.model';

@Injectable()
export class ApiMainService {
  constructor(private httpClient: HttpClient) {}

  createBoard(payload: BoardRequestModel): Observable<BoardIDRequestModel> {
    return this.httpClient.post<BoardIDRequestModel>('/boards', payload);
  }

  deleteBoard(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/boards/${id}`);
  }

  updateBoard(
    id: string,
    payload: BoardRequestModel,
  ): Observable<BoardIDRequestModel> {
    return this.httpClient.put<BoardIDRequestModel>(`/boards/${id}`, payload);
  }

  getAllBoards(): Observable<BoardIDRequestModel[]> {
    return this.httpClient.get<BoardIDRequestModel[]>('/boards');
  }
}
