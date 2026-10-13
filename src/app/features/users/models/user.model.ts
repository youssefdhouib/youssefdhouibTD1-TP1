export type UserRole = 'Développeur' | 'Designer' | 'Chef de projet' | 'Testeur';

// Describes one user; interfaces check types without creating runtime objects.
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

