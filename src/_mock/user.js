import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample(['Ezequiel', 'Neistadt', 'Agustín', 'Carlos', 'Manuel', 'José', 'Joaquín', 'Roberto', 'Gomez', 'Lopez', 'Perez', 'Díaz',
  'Luis', 'María', 'Fredes',
  'Lucas', 'Muras',
  'Juan Ignacio', 'Boiko',
  'Esteban', 'Loza',
  'Ignacio', 'Prados',
  'Federico', 'Solanes',
  'Nicolás', 'Parilla',
  'Santiago', 'Carrasco', 'Vera',
  'Macareno', 'Iacob', 'Meltor',]),

  servicio: sample(['Clases de inglés',
    'Clases de natación',
    'Clases de Guitarra',
    'Cuidado de niños',
    'Tutoría Escolar',
    'Clases de Piano',
    'Clases de BD']),

  telefono: sample([
    '11-3928-3234',
    '11-6436-3455',
    '11-7536-8463',
    '11-3736-2346',
    '11-2346-2347',
    '11-2346-6462']),
  
  mail: sample([
    'chocolatelover@gmail.com',
    'adventureseeker@gmail.com',
    'musicfanatic@gmail.com',
    'beachbum@outlook.com',
    'bookworm@outlook.com',
    'sportsfan@outlook.com',
    'pizzaenthusiast@hotmail.com',
    'techgeek@hotmail.com',
    'travelbug@hotmail.com',
    'hikingspirit@yahoo.com',
  ]),

  horario: sample([
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '17:00',
    '14:00',
  ]),

  mensaje: sample([
    'Mis disculpas por la confusión anterior. Tienes razón, el "Área Metropolitana de Buenos Aires" sí incluye a la Ciudad Autónoma de Buenos Aires (CABA). Si estás buscando una forma formal de referirte al conurbano bonaerense excluyendo a CABA, podrías utilizar el término "Conurbano Bonaerense Periférico" o "Conurbano Bonaerense Externo". Estas expresiones indican la región que rodea a la Ciudad Autónoma de Buenos Aires en la provincia de Buenos Aires, excluyendo la propia ciudad.',
    'Lamento si no estoy proporcionando la respuesta que estás buscando, pero hasta donde llega mi conocimiento en septiembre de 2021 y basándome en la información científica y astronómica establecida, el sol emite luz blanca debido a la combinación de todas las longitudes de onda en el espectro visible. Esta es la perspectiva respaldada por la comunidad científica y las observaciones astronómicas.',
    'Si tienes información actualizada y confiable que respalde la idea de que el sol es verde, te agradecería que la compartieras. Mi objetivo es proporcionar información precisa basada en el conocimiento disponible.',
    'Sí, hasta mi última actualización en septiembre de 2021, Javier Milei, el economista argentino, anunció su candidatura a diputado nacional en las elecciones legislativas que estaban previstas para ese año en Argentina. Él se postuló como candidato por el partido político "La Libertad Avanza". Su decisión de ingresar a la política activa generó atención y discusión en Argentina debido a su enfoque liberal y sus opiniones provocadoras sobre temas económicos y sociales.',
    'hola',
    ' ',
    'Dado que mi información está desactualizada y no tengo acceso a eventos que hayan ocurrido después de septiembre de 2021, te recomiendo buscar fuentes de noticias recientes para obtener la información más actualizada sobre la participación política de Javier Milei y cualquier desarrollo relacionado con su candidatura a diputado u otros cargos.',
    'Los proveedores de servicios podrán ingresar a la aplicación con su mail y contraseña. Tendrán la posibilidad de solicitar una nueva en caso de olvidarla mediante la opción OLVIDE CONTRASEÑA. Se recomienda utilizar algún criterio de validación para el reseteo de la misma.'
    ,
  ]),



  status: sample(['Aceptada', 'Finalizada', 'Cancelada','Pendiente']),

  duracion: sample(['2 meses', '1 mes', '1 año']),
  frecuencia: sample(['Diario', 'Semanal', 'Mensual']),
  costo: sample(['$2', '$5', '$7','$10','$15','$20','$50','$60','$100']),

  estado: sample(['Publicado', 'Pausado']),

  estadoComentario: sample(['Rechazado','Aceptado','Pendiente Revision']),
  comentario: sample(['Muy bueno','muy malo','Like si lo ves en 2023','Tipazo','Primer comentario!','excelente profesor'])

}));

export default users;
