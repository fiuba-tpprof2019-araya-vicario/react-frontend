
export function isValidEmail(email) {
  return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email));
}

export const formatterDate = (data) => {
  if(!data)
    return '';
  let dates = data.split('-');
  let dayAndHour = dates[2].split('T');
  const hour = dayAndHour[1].split('.');
  const day = dayAndHour[0];
  let fullDate = day + '-' + dates[1] + '-' + dates[0] + ' ' + hour[0];
  return fullDate;
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

export function getSelectOptions (options, { valueString = 'id', getLabel = (e) => { return e['name']; }}) {
  if (!options || options.length === 0){
    return [];
  }
  return options.map((elem) => {
    return { value: elem[valueString], label: getLabel(elem) };
  });
}

export function getSelectOption (option, { valueString = 'id', getLabel = (e) => { return e['name']; }}) {
  if (!option  || option === {}){
    return null;
  }
  return option && option !== {} && { value: option[valueString], label: getLabel(option) };
}

export function getFullName (user) {
  return user ? user.name + ' ' + user.surname : '';
}