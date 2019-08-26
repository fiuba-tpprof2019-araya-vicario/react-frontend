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
  NEW_STEP_PROJECT_CREATED_INFO:
    'Para avanzar al siguiente paso el proyecto debe tener un tutor asignado a tu proyecto, que haya aceptado la solicitud de tutoría.'
};

export const requestMessages = {
  TITLE: 'Mis solicitudes',
  SUBTITLE: 'Administra todas tus solicitudes para formar parte de un proyecto',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
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

export const utilsMessages = {
  QUERY_ERROR:
    'Se produjo un error al comunicarse con el servidor, vuelve a intentar en unos minutos'
};
