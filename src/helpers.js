export function textToTimestamp(date){
  return new Date(...date.split('-').map((item, index) => {
    if (index === 1)
      return item - 1
    return item
  })).getTime()
}

export function calculateAge(birthDateInTimestamp){
  const today = new Date().getTime();
  const age = Math.round((today - birthDateInTimestamp) / (370 * 24 * 60 * 60 * 1000));

  return age;
}

