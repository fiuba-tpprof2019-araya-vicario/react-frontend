
export function isValidEmail(email) {
  return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email));
}

export function getSelectOptions (options, valueString = 'id', labelString = 'name' ) {
  return options && options.map((elem) => {
    return { value: elem[valueString], label: elem[labelString] };
  });
}

export function getOnlyField (values, valueString = 'value') {
  return values.map((elem) => {
    return elem[valueString];
  });
}

export function getSelectOptionsWithIgnore (options, ignoreValue, valueString = 'id', labelString = 'name' ) {
  return options && options.map((elem) => {
    return { value: elem[valueString], label: elem[labelString] };
  }).filter((elem) => {
    return elem.value != ignoreValue;
  });
}

export function getSelectOption (option, valueString = 'id', labelString = 'name' ) {
  return option && { value: option[valueString], label: option[labelString] };
}

export function getFullName (user) {
  return user ? user.name + ' ' + user.surname : '';
}