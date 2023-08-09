const { parse, isValid } = require('date-fns');

const dateFormats = [
  'yyyy-MM-dd',
  'yyyy-MM-dd HH:mm:ss',
  'yyyy-MM-dd HH:mm:ss A',
  'yyyy-MM-dd HH:mm',
  'yyyy-MM-dd HH:mm A',
  'MM-dd-yyyy',
  'MM-dd-yyyy HH:mm:ss',
  'MM-dd-yyyy HH:mm:ss A',
  'MM-dd-yyyy HH:mm',
  'MM-dd-yyyy HH:mm A',
  'MMMM dd, yyyy',
  'MMM dd, yyyy',
  'MMMM dd yyyy',
  'MMM dd yyyy',
  'MMM',
  'MMMM',
  'EEEE',
  'yyyy',
  'QQQQ',
  'EEEE, MMMM dd yyyy, HH:mm',
  'EEEE, MMMM dd yyyy, HH:mm A',
  'EEEE MMMM dd yyyy HH:mm',
  'EEEE MMMM dd yyyy HH:mm A',
  'EEEE, MMMM dd yyyy, HH:mm:ss',
  'EEEE, MMMM dd yyyy, HH:mm:ss A',
  'EEEE MMMM dd yyyy HH:mm:ss',
  'EEEE MMMM dd yyyy HH:mm:ss A',
  'MM/dd/yyyy',
  'MM dd yyyy',
  'dd MMMM yyyy',
  'yyyy MMMM dd',
  'yyyy-MM-dd HH:mm:ss',
];

module.exports = (dateString) => {
  let result;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < dateFormats.length; i++) {
    result = parse(dateString, dateFormats[i], new Date(), { weekStartsOn: 1 });
    if (isValid(result)) {
      return result;
    }
  }

  return undefined;
};
