export const limitDuration = (duration: Duration): Duration => {
  const d = Object.assign({}, duration);
  if (d.hours !== 0) {
    d.seconds = 0;
  }
  if (d.days !== 0) {
    d.seconds = 0;
    d.minutes = 0;
  }
  if (d.months !== 0) {
    d.seconds = 0;
    d.minutes = 0;
    d.hours = 0;
  }
  if (d.years !== 0) {
    d.seconds = 0;
    d.minutes = 0;
    d.hours = 0;
    d.days = 0;
  }
  return d;
};
