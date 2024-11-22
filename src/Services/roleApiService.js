import db from "../Models/index";

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.roles.find({}).select("url description").lean();
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (persists.length === 0) {
      return { EM: "Nothing to create...", EC: 0, DT: [] };
    }

    await db.roles.insertMany(persists); // Dùng insertMany để thêm nhiều role
    return {
      EM: `Create roles succeeds: ${persists.length} roles...`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getAllRolesWithPaging = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const roles = await db.roles
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }) // Sắp xếp theo id giảm dần
      .lean();
    const totalCount = await db.roles.countDocuments(); // Đếm tổng số bản ghi
    const totalPages = Math.ceil(totalCount / limit);
    return {
      EM: "Get all Roles succeeds...",
      EC: 0,
      DT: {
        totalRows: totalCount,
        totalPages: totalPages,
        roles: roles,
      },
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.roles.find().sort({ _id: -1 }).lean();
    return {
      EM: "Get all Roles succeeds...",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.roles.findById(id);
    if (role) {
      await role.deleteOne(); // Xóa role
    }
    return {
      EM: "Delete Role succeeds...",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any roles",
        EC: 0,
        DT: [],
      };
    }

    let group = await db.groups
      .findById(id)
      .select("id name description")
      .populate("roles", "id url description") // Liên kết với Role
      .lean();

    return {
      EM: "Get Role by group succeeds...",
      EC: 0,
      DT: group,
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    // Xóa các bản ghi cũ trong bảng group_roles
    await db.groups.updateOne(
      { _id: data.groupId },
      { $set: { roles: [] } } // Reset roles cho group
    );

    // Cập nhật roles mới cho group
    const group = await db.groups.findById(data.groupId);
    group.roles = data.groupRoles; // groupRoles là mảng các id của roles
    await group.save();

    return {
      EM: "Assign Roles to Group succeeds...",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

module.exports = {
  createNewRoles,
  getAllRoles,
  getAllRolesWithPaging,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
