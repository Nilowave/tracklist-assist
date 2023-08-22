import { format, formatDistanceToNow } from 'date-fns';

export type DateFormat = {
  day: string;
  month: string;
  year: string;
  time: string;
};

export const cardDateFormat = (date: number | string): DateFormat => {
  const _date = new Date(date);
  const day = format(_date, 'dd');
  const month = format(_date, 'MMM');
  const year = format(_date, 'yyy');
  const time = formatDistanceToNow(_date, { addSuffix: true, includeSeconds: true }) + ' at ' + format(_date, 'p');

  return {
    day,
    month,
    year,
    time,
  };
};
