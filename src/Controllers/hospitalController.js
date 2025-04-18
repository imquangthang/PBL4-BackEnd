import hospitalApiService from "../Services/hospitalApiServirce";

const createFaculty = async (req, res) => {
  try {
    // service: create faculty
    let data = await hospitalApiService.createFaculty(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error form server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const readFacultyFunc = async (req, res) => {
  try {
    // Lấy giá trị từ query
    let page = req.query.page || null;
    let limit = req.query.limit || null;
    let hospital_id = req.query.hospital_id;

    // Kiểm tra nếu hospital_id có và trang & giới hạn có
    if (hospital_id) {
      // Nếu có page và limit, gọi API với phân trang
      if (page && limit) {
        let data = await hospitalApiService.getFacultylWithPagination(
          hospital_id,
          +page,
          +limit
        );
        return res.status(200).json({
          EM: data.EM, // thông điệp lỗi
          EC: data.EC, // mã lỗi
          DT: data.DT, // dữ liệu
        });
      } else {
        // Nếu không có page và limit, gọi API lấy tất cả dữ liệu
        let data = await hospitalApiService.getAllFaculty(hospital_id);
        return res.status(200).json({
          EM: data.EM, // thông điệp lỗi
          EC: data.EC, // mã lỗi
          DT: data.DT, // dữ liệu
        });
      }
    } else {
      return res.status(400).json({
        EM: "hospital_id is required", // thông báo lỗi nếu thiếu hospital_id
        EC: "-1", // mã lỗi
        DT: "", // không có dữ liệu
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // thông báo lỗi
      EC: "-1", // mã lỗi
      DT: "", // không có dữ liệu
    });
  }
};

const updateCurrentFaculty = async (req, res) => {
  try {
    let data = await hospitalApiService.updateCurrentFaculty(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createDoctor = async (req, res) => {
  try {
    // req.body: email,phone,username,password,
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(200).json({
        EM: "missing required parameters", // error message
        EC: "1", // error code
        DT: "", //data
      });
    }

    // if (req.body.password && req.body.password.length < 4) {
    //   return res.status(200).json({
    //     EM: "Your password must have more than 3 letter", // error message
    //     EC: "1", // error code
    //     DT: "", //data
    //   });
    // }

    // service: create user
    let data = await hospitalApiService.createDoctor(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error form server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const readDoctor = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let hospital_id = req.query.hospital_id;
    if (page && limit && hospital_id) {
      let data = await hospitalApiService.getDoctorWithPagination(
        hospital_id,
        +page,
        +limit
      );
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await hospitalApiService.getAllDoctor(hospital_id);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createStaff = async (req, res) => {
  try {
    // req.body: email,phone,username,password,
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(200).json({
        EM: "missing required parameters", // error message
        EC: "1", // error code
        DT: "", //data
      });
    }

    // if (req.body.password && req.body.password.length < 4) {
    //   return res.status(200).json({
    //     EM: "Your password must have more than 3 letter", // error message
    //     EC: "1", // error code
    //     DT: "", //data
    //   });
    // }

    // service: create user
    let data = await hospitalApiService.createStaff(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error form server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const readStaff = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let hospital_id = req.query.hospital_id;
    if (page && limit && hospital_id) {
      let data = await hospitalApiService.getStaffWithPagination(
        hospital_id,
        +page,
        +limit
      );
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await hospitalApiService.getAllStaff(hospital_id);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

module.exports = {
  createFaculty,
  readFacultyFunc,
  updateCurrentFaculty,
  createDoctor,
  readDoctor,
  createStaff,
  readStaff,
};
