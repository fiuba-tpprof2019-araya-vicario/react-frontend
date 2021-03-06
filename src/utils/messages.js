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
  GO_TO_REQUERIMENT_DESCRIPTION:
    'Puedes crear una idea, a partir de un requerimiento. Los mismos son posibles proyectos propuestos por profesores, no docentes o personas ajenas a la FIUBA.',
  EMPTY_PROPOSAL: 'No se ha subido ninguna propuesta.',
  EMPTY_PRESENTATION: (name) => `No se ha subido ninguna ${name}.`,
  ACCEPT_PROPOSAL:
    '¿Estás seguro que deseas aceptar la propuesta?  Recordamos que una vez aceptada la propuesta, esta será entregada a la comisión curricular y no podrá ser modificada.',
  ACCEPT_PROPOSAL_WARNING:
    'He leído y corroborado la propuesta entregada por los alumnos.',
  ACCEPT_PRESENTATION:
    '¿Estás seguro que deseas subir los archivos de presentación? Recuerde que estos archivos no podran ser modificados luego.',
  ACCEPT_PRESENTATION_WARNING:
    'He leído y corroborado los archivos de presentación entregada por los alumnos.',
  REPROBATE_PROPOSAL: '¿Estás seguro que deseas reprobar la propuesta?',
  APPROBATE_PROPOSAL:
    '¿Estás seguro que deseas aprobar la propuesta con la carrera seleccionada?',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Para avanzar al siguiente paso el proyecto debe tener un tutor asignado a tu proyecto que haya aceptado la solicitud de tutoría. Los coautores pueden aceptar en este paso o en el siguiente.',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Para avanzar al siguiente paso, debes tener una propuesta aceptada por todos los miembros del proyecto. Una vez que todos acepten, la misma pasará a la comisión curricular.',
  NEW_STEP_PROPOSAL_UNDER_REVISION_INFO:
    'La comisión curricular esta revisando la propuesta ingresada. En caso de ser aprobada avanzaras al siguiente paso.',
  NEW_STEP_PENDING_PRESENTATION_INFO: (projectType) =>
    `La comisión curricular aprobo tu propuesta, ya estan en condiciones de realizar su ${projectType}.`,
  NEW_STEP_PENDING_PUBLICATION_INFO:
    'Para avanzar al siguiente paso, debes subir la presentación y/o la documentación del proyecto y una descripción a modo de resumén del mismo. Una vez que todos aceptada por el tutor, la misma sera publicada.',
  SELECT_ONE_CAREER_INFO:
    'Tenés que ingresar la carrera con la cúal aprobar la propuesta',
  ABANDON_WARNING: (proyect) =>
    `¿Estás seguro de que quieres abandonar el proyecto ${proyect}?`,
  NEW_STEP_PROPOSAL_PROPOSAL_PUBLICATED_INFO:
    'Todos los archivos han sido publicados.'
};

export const requestMessages = {
  TITLE: 'Mis solicitudes',
  SUBTITLE: 'Administra todas tus solicitudes para formar parte de un proyecto',
  NO_RESULTS_MESSAGE:
    'No te han llegado solicitudes para colaborar en otros proyectos. Puedes enviar solicitudes creando un nuevo proyecto e invitando a otros estudiantes para que sean tus colaboradores.',
  ACCEPT_WARNING: (request) =>
    `¿Estás seguro de que quieres aceptar el pedido para trabajar en el proyecto ${request}?`,
  ENABLE_WARNING: (request) =>
    `¿Estás seguro de que los alumnos están en condiciones de presentar el proyecto proyecto ${request}?`,
  REJECT_WARNING: (request) =>
    `¿Estás seguro de que quieres rechazar el pedido para trabajr en el proyecto ${request}?`
};

export const requirementMessages = {
  TITLE: 'Requerimientos',
  SUBTITLE: 'Colabora con los distintos requerimientos solicitados',
  EDIT_TITLE: 'Editar Requerimiento',
  DELETE_WARNING: (requirement) =>
    `¿Estás seguro que quieres borrar el requerimiento ${requirement}?`,
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
    'Debes colaborar con los integrantes del proyecto para realizar una propuesta. Una vez subida una propuesta todos los integrantes deben aprobar la misma para avanzar al siguiente paso.',
  NEW_STEP_PROPOSAL_UNDER_REVISION_INFO:
    'La comisión curricular esta revisando la propuesta ingresada.',
  NEW_STEP_PROPOSAL_PENDING_PRESENTATION_INFO:
    'Habilitá la presentación cuando creas que el proyecto esta en condiciones de ser presentado.',
  NEW_STEP_PROPOSAL_PENDING_PUBLICATION_INFO:
    'Aprueba la publicación cuando creas que el proyecto esta en condiciones de ser publicado.',
  NEW_STEP_PROPOSAL_PROPOSAL_PUBLICATED_INFO:
    'Todos los archivos han sido publicados.'
};

export const commissionsMessages = {
  TITLE: 'Comisión curricular',
  SUBTITLE: 'Aministra los distintos proyectos en curso',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
  NEW_STEP_PROPOSAL_UNDER_REVISION_INFO:
    'Puedes aprobar o rechazar la propuesta, en cualquiera de los casos debes especificar la carrera que estas evaluando, entre las carreras del proyecto. En caso de rechazar debes ingresar el motivo de rechazo.'
};

export const dashboardMessages = {
  TITLE: 'Tablero de control',
  SUBTITLE: 'Monitorea la evolución de los proyectos en la plataforma'
};

export const ideasMessages = {
  TITLE: 'Ideas',
  SUBTITLE:
    'Conocé las distintas ideas que se estan llevando a cabo por otros estudiantes',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados',
  ABANDON_SUCCESS: 'Abandonaste el proyecto correctamente',
  NEW_STEP_PROJECT_CREATED_INFO:
    'Si aceptas la solicitud pasaras a ser el tutor de este proyecto',
  NEW_STEP_PROJECT_ACCEPTED_INFO:
    'Debes colaborar con los integrantes del proyecto para realizar una propuesta. Una vez subida una propuesta todos los integrantes deben aprobar la misma para avanzar.'
};

export const publicProjectsMessages = {
  TITLE: 'Proyectos públicos',
  SUBTITLE: 'Conocé las distintas proyectos que se llevaron a cabo',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados'
};

export const userMessages = {
  TITLE: 'Administración de usuarios',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados'
};

export const myUserMessages = {
  TITLE: 'Mi perfil',
  NO_RESULTS_MESSAGE: 'La búsqueda no trajo resultados'
};

export const utilsMessages = {
  QUERY_ERROR:
    'Se produjo un error al comunicarse con el servidor, vuelve a intentar en unos minutos'
};
