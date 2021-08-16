const user = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

module.exports = {
  async signout(userId) {
    await user.deleteUser(userId).then((response) => {
      console.log(response);
      if (response === "success") {
        return res.json(resUtil.success(200, "user deleted"));
      } else {
        return res.json(resUtil.fail(400, "failed to delete user"));
      }
    });
  },
};
