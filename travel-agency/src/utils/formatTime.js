export const formatTime = seconds => {

  if (seconds === undefined || isNaN(seconds) || seconds < 0) {
    return null;
  } else {
    const sec = Math.floor(seconds % 60).toString();
    const min = Math.floor((seconds / 60) % 60).toString();
    const hour = Math.floor((seconds / 3600) % 60).toString();

    return hour.padStart(2, '0') + ':' + min.padStart(2, '0') + ':' + sec.padStart(2, '0');

  }
};

//const formatTime = (seconds, h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60) => [h, m > 9 ? m : '0' + m, s > 9 ? s : '0' + s].filter(s => s).join(':');