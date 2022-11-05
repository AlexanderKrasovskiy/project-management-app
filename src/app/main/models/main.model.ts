export interface BoardIDRequestModel {
  id: string;
  title: string;
  description: string;
}

export interface BoardRequestModel {
  title: string;
  description: string;
}

export interface LoginRequestModel {
  login: string;
  password: string;
}

export interface UserModel {
  id: string;
  login: string;
  password: string;
}

export interface TokenResponseModel {
  token: string;
}
