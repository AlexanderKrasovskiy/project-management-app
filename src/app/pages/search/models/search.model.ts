export interface BoardIDModel {
  id: string;
  title: string;
  description: string;
}

export interface BoardResModel {
  id: string;
  title: string;
  description: string;
  columns: ColumnModel[];
}

interface ColumnModel {
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
  boardId: string;
  files: FileModel[];
}

interface FileModel {
  filename: string;
  fileSize: number;
}

export interface UserModel {
  id: string;
  name: string;
  login: string;
}

export enum SortKeyword {
  byWord = 'word',
  byOrder = 'order',
  byTitle = 'title',
  byDescription = 'description',
  byUser = 'userId',
}

export enum BySort {
  ascending = '▼',
  descending = '▲',
}
