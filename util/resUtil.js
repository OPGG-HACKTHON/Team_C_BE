module.exports = {
  success: (status, data) => {
    return {
      success: true,
      status,
      data,
    };
  },
  fail: (status, msg) => {
    return {
      success: false,
      status,
      msg,
    };
  },
};
