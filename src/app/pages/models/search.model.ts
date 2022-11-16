export interface BoardIDModel {
  id: string;
  title: string;
  description: string;
}

export interface ColumnModel {
  id: string;
  title: string;
  order: number;
}

export interface TaskModel {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: FileModel[];
}

interface FileModel {
  filename: string;
  fileSize: number;
}

export interface UserRequestModel {
  id: string;
  name: string;
  login: string;
}
