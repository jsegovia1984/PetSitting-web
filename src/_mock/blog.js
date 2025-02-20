import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const CLASES = [
 
];



const NOMBRES =[
  'Ezequiel', 'Neistadt', 'Agustín', 'Carlos', 'Manuel', 'José', 'Joaquín', 'Roberto', 'Gomez', 'Lopez', 'Perez', 'Díaz',
  'Luis', 'María', 'Fredes',
  'Lucas', 'Muras',
  'Juan Ignacio', 'Boiko',
  'Esteban', 'Loza',
  'Ignacio', 'Prados',
  'Federico', 'Solanes',
  'Nicolás', 'Parilla',
  'Santiago', 'Carrasco', 'Vera',
  'Macareno', 'Iacob', 'Meltor',
];

const DURACION = sample([])

const posts = [...Array(23)].map((_, index) => ({
  id: index+1,
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: CLASES[index+1],
  createdAt: faker.date.past(),
  view: sample(["Única", "Semanal", "Mensual"]),
  stars: sample(["4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.0","3.9"]),
  price: sample([
    '20',
    '50',
    '75',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750',
    '800',
    '850',
  ]),
  share: sample(["1 Hora", "2 Horas","3 Horas", "4 Horas", "30 Min."]),
  favorite: faker.datatype.number(),
  author: {
    name: sample([  'Ezequiel', 'Neistadt', 'Agustín', 'Carlos', 'Manuel', 'José', 'Joaquín', 'Roberto', 'Gomez', 'Lopez', 'Perez', 'Díaz',
    'Luis', 'María', 'Fredes',
    'Lucas', 'Muras',
    'Juan Ignacio', 'Boiko',
    'Esteban', 'Loza',
    'Ignacio', 'Prados',
    'Federico', 'Solanes',
    'Nicolás', 'Parilla',
    'Santiago', 'Carrasco', 'Vera',
    'Macareno', 'Iacob', 'Meltor',]),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
