export interface IResponseType {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
    branchId?: string;
  };
}
