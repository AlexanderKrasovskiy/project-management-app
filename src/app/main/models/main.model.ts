export interface BoardIDRequestModel {
  id: string;
  title: string;
  description: string;
}

export interface BoardRequestModel {
  title: string;
  description: string;
}

export interface BoardModel {
  id: string;
  title: string;
  description: string;
  columns: any[];
}
