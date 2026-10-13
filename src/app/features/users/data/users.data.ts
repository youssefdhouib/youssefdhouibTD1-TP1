import { User } from '../models/user.model';

export const USERS: User[] = [
  {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true,
  },
  {
    id: 2,
    name: 'Mohamed Ben Ali',
    email: 'mohamed@taskflow.tn',
    role: 'Chef de projet',
    active: true,
  },
  {
    id: 3,
    name: 'Sarra Trabelsi',
    email: 'sarra@taskflow.tn',
    role: 'Testeur',
    active: false,
  },
  {
    id: 4,
    name: 'Karim Gharbi',
    email: 'karim@taskflow.tn',
    role: 'Designer',
    active: true,
  },
];
