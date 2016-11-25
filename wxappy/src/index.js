export const connect = (Type) => {
  return (Target) => {
    const target = new Target();
    const obj = {};
    Object.getOwnPropertyNames(target).forEach((name) => {
      obj[name] = target[name];
    });
    Object.getOwnPropertyNames(Target.prototype).forEach((name) => {
      obj[name] = Target.prototype[name];
    });
    Type(obj);
  };
};

export const app = (Target) => {
  return connect(App)(Target);
};

export const page = (Target) => {
  return connect(Page)(Target);
};

const appy = {
  get app() {
    return getApp();
  },
  get pages() {
    return getCurrentPages();
  },
  get page() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  },
};

Object.keys(wx).forEach((key) => {
  if (/(^on.+|.+Sync$)/.test(key)) {
    appy[key] = wx[key];
    return;
  }
  appy[key] = (options = {}) => {
    return new Promise((resolve, reject) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      options.success = resolve;
      options.fail = (res) => {
        reject(res && res.errMsg ? new Error(res.errMsg) : res);
      };
      wx[key].call(wx, options);
    });
  };
});

export default appy;
