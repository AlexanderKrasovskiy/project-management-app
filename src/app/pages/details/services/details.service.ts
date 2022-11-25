import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserModel } from 'src/app/pages/auth/models/auth.model';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
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
  }

  createColumn(boardId: string, title: string): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`/boards/${boardId}/columns`, { title });
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  updateColumn(boardId: string, columnId: string, body: UpdateColumnPayload) {
    return this.http.put<ColumnModel>(
      `/boards/${boardId}/columns/${columnId}`,
      body,
    );
  }

  createTask(boardId: string, columnId: string, body: CreateTaskPayload) {
    const { id } = JSON.parse(
      `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
    ) as GetUserModel;

    return this.http.post<TaskModel>(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      {
        ...body,
        userId: id,
      },
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
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
  }
}
