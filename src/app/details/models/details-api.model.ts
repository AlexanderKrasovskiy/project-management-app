export interface BoardResModel {
  id: string;
  title: string;
  description: string;
  columns: ColumnModel[];
}

export interface ColumnModel {
  id: string;
  title: string;
  order: number;
  tasks: TaskModel[];
}

export interface TaskModel {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: FileModel[];
}

interface FileModel {
  filename: string;
  fileSize: number;
}

export interface UpdateColumnPayload {
  title: string;
  order: number;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
}

export interface UpdateTaskPayload {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface UpdateTaskResponse {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
