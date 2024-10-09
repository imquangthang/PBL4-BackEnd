import db from "../Models/index";

const getGroupWithRoles = async (user) => {
  try {
    let group = await db.groups.findOne({
      _id: user.groupId, // MongoDB uses _id by default for the primary key
    })
      .select("id name description") // Chọn các trường cần thiết từ bảng `Group`
      .exec();

    if (group) {
      // Populate các vai trò từ bảng `Role` thông qua bảng `GroupRole`
      let groupRoles = await db.group_role.find({ groupId: group._id })
        .populate("roleId", "id url description") // Populate trường `roleId` từ bảng `Role`
        .exec();

      // Thêm vai trò vào dữ liệu của nhóm
      group.roles = groupRoles.map((groupRole) => groupRole.roleId);
    }

    return group;
  } catch (error) {
    console.log(">> check error: ", error);
    return {};
  }
};

module.exports = {
  getGroupWithRoles,
};
