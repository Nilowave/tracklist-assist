const { formatDistance, intervalToDuration, formatDuration, add } = require('date-fns');

module.exports = (items) => {
  return items.map((item) => {
    const date = new Date(item.tracks.slice(-1)[0]);
    const lastTrack = formatDistance(date || new Date(), new Date(), { addSuffix: true });

    // intervals + average

    const intervals = [];
    let average = 0;
    item.tracks.map((d, index) => {
      if (item.tracks && item.tracks[index + 1]) {
        const next = item.tracks[index + 1];
        const interval = intervalToDuration({
          start: new Date(d),
          end: new Date(next),
        });
        intervals.push(interval);
        const diff = +add(0, interval);

        average += diff;
      }
    });

    average = average / (item.tracks.length - 1);

    if (average > 0) {
      average = intervalToDuration({
        start: 0,
        end: average,
      });
    }

    return {
      ...item.toObject(),
      intervals,
      lastTrack,
      average,
    };
  });
};
