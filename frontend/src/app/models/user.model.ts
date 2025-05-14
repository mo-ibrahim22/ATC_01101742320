export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: 'user' | 'admin';
  language: 'en' | 'ar';
  active: boolean;
  passwordChangedAt?: Date;
  createdAt?: Date;
}