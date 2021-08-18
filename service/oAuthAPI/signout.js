const user = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

module.exports = {
  async signout(userId) {
    const deleteResult = await user.deleteUser(userId);

    return { deleteResult };
  },
};
