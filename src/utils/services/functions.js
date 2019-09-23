import _ from 'lodash';
import { REQUEST_STATES, REQUIREMENT_STATES, STATES } from './references';

export function getById(objects, id) {
  return _.find(objects, (object) => object.id === id);
}

export function isValidEmail(email) {
  // eslint-disable-next-line no-useless-escape
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function hasDuplicates(array) {
  const set = new Set(array);

  return set.size !== array.length;
}

export const formatterDate = (data) => {
  if (!data) {
    return '';
  }
  const dates = data.split('-');
  const dayAndHour = dates[2].split('T');
  const hour = dayAndHour[1].split('.');
  const day = dayAndHour[0];
  const fullDate = `${day}/${dates[1]}/${dates[0]} ${hour[0]}`;

  return fullDate;
};

export function getOnlyField(values, valueString = 'value') {
  return values && values.length > 0
    ? values.map((elem) => elem[valueString])
    : [];
}

export function getSelectOptionsWithIgnore(
  options,
  ignoreValue,
  valueString = 'id',
  labelString = 'name',
  surlabelString = 'surname'
) {
  return (
    options &&
    options
      .map((elem) => ({
        value: elem[valueString],
        label: `${elem[labelString]} ${elem[surlabelString]}`
      }))
      .filter((elem) => elem.value !== ignoreValue)
  );
}

export function getSelectOptions(
  options,
  { valueString = 'id', getLabel = (e) => e.name, getFixed = () => {} }
) {
  if (!options || options.length === 0) {
    return [];
  }

  return options.map((elem) => ({
    value: elem[valueString],
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

export function getFullNameWithEmail(user) {
  return user ? `${user.name} ${user.surname} (${user.email})` : '';
}

export function getDescriptionByRequestStatus(stateRequest) {
  return stateRequest && stateRequest !== STATES.accepted
    ? ` (${REQUEST_STATES[stateRequest]}) `
    : '';
}

export function getDescriptionByRequirementStatus(status) {
  return status ? REQUIREMENT_STATES[status] : '';
}

export function getDescriptionByProjectStatus(status) {
  return status ? REQUIREMENT_STATES[status] : '';
}

export function getFullNameWithStatus(user, label) {
  const requests = user[label];
  const description = getDescriptionByRequestStatus(
    requests[requests.length - 1].status
  );

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
  if (project.Tutor && project.Tutor.id === userId) {
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

  return null;
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
