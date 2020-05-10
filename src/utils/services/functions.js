import { REQUEST_STATES, REQUIREMENT_STATES } from './references';

export function getById(objects, id) {
  if (!objects) {
    return null;
  }

  return objects.find((object) => object.id === id) || null;
}

export function getDifferenceById(values, excludedValues) {
  if (!values) {
    return null;
  }

  if (!excludedValues) {
    return values;
  }

  return values.filter(
    (value) => !excludedValues.find(({ id }) => id === value.id)
  );
}

export function isValidEmail(email) {
  // eslint-disable-next-line no-useless-escape
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const formatterDate = (data) => {
  if (!data) {
    return '';
  }
  const dates = data.split('-');
  const dayAndHour = dates[2].split('T');
  const hour = dayAndHour[1].split('.');
  const day = dayAndHour[0];

  return `${day}/${dates[1]}/${dates[0]} ${hour[0]}`;
};

export const getYearFromDate = (date) => date.split('-')[0];

export function getOnlyField(values, getValue = (element) => element.value) {
  return values && values.length > 0
    ? values.map((elem) => getValue(elem))
    : [];
}

export function getSelectOptionsWithIgnore(
  options,
  ignoreValue = 0,
  {
    valueString = 'id',
    labelString = 'name',
    surlabelString = 'surname',
    color = null
  } = {}
) {
  return options
    ? options
        .map((option) => ({
          value: option[valueString],
          label: `${option[labelString]} ${option[surlabelString]}`,
          color
        }))
        .filter(({ value }) => value !== ignoreValue)
    : [];
}

export function getSelectOptions(
  options,
  { getValue = (e) => e.id, getLabel = (e) => e.name, getFixed = () => {} }
) {
  if (!options || options.length === 0) {
    return [];
  }

  return options.map((elem) => ({
    value: getValue(elem),
    label: getLabel(elem),
    isFixed: getFixed(elem)
  }));
}

export function getSelectOption(
  option,
  { valueString = 'id', getLabel = (e) => e.name }
) {
  if (!option || option === {}) {
    return null;
  }

  return (
    option &&
    option !== {} && { value: option[valueString], label: getLabel(option) }
  );
}

export function getFullName(user) {
  return user ? `${user.name} ${user.surname}` : '';
}

export function getFullNameWithDescription(user, description) {
  return user ? `${user.name} ${user.surname}${description}` : '';
}

export function getDescriptionByRequestStatus(stateRequest) {
  return stateRequest ? REQUEST_STATES[stateRequest] : '';
}

export function getDescriptionByRequirementStatus(status) {
  return status ? REQUIREMENT_STATES[status] : '';
}

export function getFullNameWithStatus(user, label) {
  const requests = user[label];
  const description = ` (${getDescriptionByRequestStatus(
    requests[requests.length - 1].status
  )}) `;

  return getFullNameWithDescription(user, description);
}

export function getTutorFullName(user) {
  return user ? getFullNameWithStatus(user, 'TutorRequests') : '';
}

export function getStudentFullName(user) {
  return user ? getFullNameWithStatus(user, 'StudentRequests') : '';
}

export function getStudentIsApproved(student) {
  return student.StudentRequests.status === REQUEST_STATES.accepted;
}

export function getRequestFromUser(userId, project) {
  if (project.Tutor && userId && project.Tutor.id === userId) {
    return project.Tutor.TutorRequests[0];
  }

  const studentUser =
    project.Students &&
    project.Students.filter((student) => student.id === userId);

  if (studentUser && studentUser.length) {
    return studentUser[0].StudentRequests[0];
  }

  const cotutorUser =
    project.Cotutors &&
    project.Cotutors.filter((cotutor) => cotutor.id === userId);

  if (cotutorUser && cotutorUser.length) {
    return cotutorUser[0].TutorRequests[0];
  }

  return {};
}

export function getStudentsNames(Creator, Students) {
  return [
    getFullName(Creator),
    ...Students.map((student) => `, ${getFullName(student)}`)
  ];
}

export function getTutorsNames(Tutor, Cotutors) {
  return [
    getFullName(Tutor),
    ...Cotutors.map((cotutor) => `, ${getFullName(cotutor)}`)
  ];
}

export const getMonthTextFromNumber = (monthNumber) => {
  switch (monthNumber) {
    case 1:
      return 'Enero';
    case 2:
      return 'Febrero';
    case 3:
      return 'Marzo';
    case 4:
      return 'Abril';
    case 5:
      return 'Mayo';
    case 6:
      return 'Junio';
    case 7:
      return 'Julio';
    case 8:
      return 'Agosto';
    case 9:
      return 'Septiembre';
    case 10:
      return 'Octubre';
    case 11:
      return 'Noviembre';
    default:
      return 'Diciembre';
  }
};
