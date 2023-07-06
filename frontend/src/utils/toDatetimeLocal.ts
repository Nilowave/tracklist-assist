export const toDatetimeLocal = (date: Date): string => {
  const ten = (i: number) => {
      return (i < 10 ? '0' : '') + i;
    },
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds()),
    MS = ten(date.getMilliseconds());

  return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS + '.' + MS;
};
