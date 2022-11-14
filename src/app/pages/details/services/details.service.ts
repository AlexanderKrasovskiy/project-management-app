import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserModel } from 'src/app/auth/models/auth.model';
import {
  BoardResModel,
  ColumnModel,
  UpdateColumnPayload,
  CreateTaskPayload,
  TaskModel,
  UpdateTaskPayload,
  UpdateTaskResponse,
} from '../models/details.model';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {}

  getBoardById(id: string): Observable<BoardResModel> {
    return this.http.get<BoardResModel>(`/boards/${id}`);
    // fact - 404 - "Board was not founded!"
    // fact - 400 - "Validation failed (uuid  is expected)" - with long id
  }

  createColumn(boardId: string, title: string): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`/boards/${boardId}/columns`, { title });
    // fact - 404 - "Board was not founded!"
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}`);
    // fact - 404 - "Board was not founded!" - redirect main / 404 ?
    // fact - 404 - "Column was not founded!" - reload board ?
  }

  updateColumn(boardId: string, columnId: string, body: UpdateColumnPayload) {
    return this.http.put<ColumnModel>(
      `/boards/${boardId}/columns/${columnId}`,
      body,
    );
    // fact - 404 - "Board was not founded!" - redirect main / 404 ?
    // fact - 404 - "Column was not founded!" - reload board ?
    // m.b. text limits
  }

  createTask(boardId: string, columnId: string, body: CreateTaskPayload) {
    const { id } = JSON.parse(
      `${localStorage.getItem('PlanUserInfo')}`,
    ) as GetUserModel;

    return this.http.post<TaskModel>(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      {
        ...body,
        userId: id,
      },
    );
    // 404 - "User was not founded!" - redirect main / 404 ?
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
    // 404 - "Task was not founded!"
  }

  updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    body: UpdateTaskPayload,
  ): Observable<UpdateTaskResponse> {
    const newBody = {
      ...body,
      boardId,
    };

    return this.http.put<UpdateTaskResponse>(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      newBody,
    );
    // userId - ?
    // order - 400 - "The task order number cannot be greater than the total number of tasks!"
    // 503 - Service Unavailable
    // 0 - Unknown Error
  }
}
