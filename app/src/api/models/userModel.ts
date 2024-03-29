export type CreateUser = {
  name: string;
  group: string;
  login: string;
  password: string;
};

export type CreateUserName = {
  name: string;
};

export type CreateUserCredentials = {
  login: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  login: string;
  role: string;
};
