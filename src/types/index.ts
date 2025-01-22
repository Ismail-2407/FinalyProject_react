export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
export interface User {
  id: number;
  email: string;
  password?: string;
}
export interface AuthState {
  user: User | null;
  isAuth: boolean;
}
