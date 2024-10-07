//检测是否为浏览器环境

const isBrowser = !!(
  //window是否存在
  typeof window !== 'undefined' &&
  //dom是否存在
  window.document &&
  //是否有createElement
  window.document.createElement
);

export default isBrowser;
