export const loginMessages = {
  TITLE: 'Biblioteca digital',
  SUBTITLE: 'Registrarse con google para ingresar al sistema'
};

export const contactMessages = {
  TITLE: 'Contacto',
  SUBTITLE: 'Ponerse en contacto con la FIUBA',
  UPLOAD_SUCCESS:
    'El requerimiento se ha cargado correctamente. Espera a que personal de FIUBA se contacte con usted'
};

export const myProjectMessages = {
  TITLE: 'Mi proyecto',
  SUBTITLE: '',
  NEW_IDEA_DESCRIPTION:
    'No se ha creado una idea aún, agregue una para dar comienzo a su propuesta. En la misma debe describir brevemente el proposito de su proyecto (En caso de no tener un tutor asignado puede realizarlo en pasos posteriores).',
  GO_TO_REQUERIMENT_DESCRIPTION: 'Puedes tomar un requerimiento.',
  EMPTY_PROPOSAL: 'Todavia no has subido ninguna propuesta.',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Para avanzar al siguiente paso el proyecto debe tener un tutor asignado a tu proyecto, que haya aceptado la solicitud de tutoría.',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Para avanzar al siguiente paso el proyecto debe tener una propuesta aceptada por todos los miembros del proyecto.',
  ABANDON_WARNING: (proyect) =>
    `¿Estas seguro de que quieres abandonar el proyecto ${proyect}?`
};

export const requestMessages = {
  TITLE: 'Mis solicitudes',
  SUBTITLE: 'Administra todas tus solicitudes para formar parte de un proyecto',
  NO_RESULTS_MESSAGE:
    'No te han llegado solicitudes para colaborar en otros proyectos',
  ACCEPT_WARNING: (request) =>
    `¿Estas seguro de que quieres aceptar el pedido para trabajar en el proyecto ${request}?`,
  REJECT_WARNING: (request) =>
    `¿Estas seguro de que quieres rechazar el pedido para trabajr en el proyecto ${request}?`
};

export const requirementMessages = {
  TITLE: 'Requerimientos',
  SUBTITLE: 'Colabora con los distintos requerimientos solicitados',
  EDIT_TITLE: 'Editar Requerimiento',
  DELETE_WARNING: (requirement) =>
    `¿Estas seguro que quieres borrar el requerimiento ${requirement}?`,
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados'
};

export const myTutorialsMessages = {
  TITLE: 'Mis tutorías',
  SUBTITLE: 'Aministra las distintas tutorias y solicitudes de tutorias',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
  ABANDON_SUCCESS: 'Abandonaste el proyecto correctamente',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Si aceptas la solicitud pasaras a ser el tutor de este proyecto',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Debes colaborar con los integrantes del proyecto para realizar una propuesta'
};

export const commissionsMessages = {
  TITLE: 'Mis comisiones',
  SUBTITLE: 'Aministra los distintas projectos en curso',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
  ABANDON_SUCCESS: 'Abandonaste el proyecto correctamente',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Si aceptas la solicitud pasaras a ser el tutor de este proyecto',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Debes colaborar con los integrantes del proyecto para realizar una propuesta'
};

export const ideasMessages = {
  TITLE: 'Ideas',
  SUBTITLE:
    'Conocé los distintas ideas que se estan llevando a cabo por otros estudiantes',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
  ABANDON_SUCCESS: 'Abandonaste el proyecto correctamente',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Si aceptas la solicitud pasaras a ser el tutor de este proyecto',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Debes colaborar con los integrantes del proyecto para realizar una propuesta'
};

export const userMessages = {
  TITLE: 'Administración de usuarios',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados'
};

export const utilsMessages = {
  QUERY_ERROR:
    'Se produjo un error al comunicarse con el servidor, vuelve a intentar en unos minutos'
};
