const screenfullMethods = [
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
  'fullscreenchange',
  'fullscreenerror',
];
screenfullMethods.forEach((item) => {
  document[item] = () => {};
  HTMLElement.prototype[item] = () => {};
});
