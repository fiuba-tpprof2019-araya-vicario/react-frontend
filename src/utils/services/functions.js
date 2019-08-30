import _ from 'lodash';
import references from './references';

export function getById(objects, id) {
  return _.find(objects, (object) => object.id === id);
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
  const fullDate = `${day}-${dates[1]}-${dates[0]} ${hour[0]}`;

  return fullDate;
};

export function getOnlyField(values, valueString = 'value') {
  return values.map((elem) => elem[valueString]);
}

export function getSelectOptionsWithIgnore(
  options,
  ignoreValue,
  valueString = 'id',
  labelString = 'name'
) {
  return (
    options &&
    options
      .map((elem) => ({ value: elem[valueString], label: elem[labelString] }))
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
  return user ? `${user.name} ${user.surname} (${description})` : '';
}

export function getDescriptionByRequestStatus(stateRequest) {
  return stateRequest ? references.REQUEST_STATES[stateRequest] : '';
}

export function getDescriptionByRequirementStatus(status) {
  return status ? references.REQUIREMENT_STATES[status] : '';
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
  return student.StudentRequests.status === references.REQUEST_STATES.accepted;
}
