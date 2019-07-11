
export function isValidEmail(email) {
  return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email));
}

export function getSelectOptions (options, valueString = 'id', labelString = 'name' ) {
  return options.map((elem) => {
    return { value: elem[valueString], label: elem[labelString] };
  });
}

export function getSelectOptionsWithIgnore (options, ignoreValue, valueString = 'id', labelString = 'name' ) {
  return options.map((elem) => {
    return { value: elem[valueString], label: elem[labelString] };
  }).filter((elem) => {
    return elem.value != ignoreValue;
  });
}