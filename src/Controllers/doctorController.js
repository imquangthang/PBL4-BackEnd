import doctorApiService from "../Services/doctorApiService";

const getMedicalRecord = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let doctor_id = req.query.doctor_id;
    if (page && limit && doctor_id) {
      let data = await doctorApiService.getMedicalRecordWithPagination(
        doctor_id,
        +page,
        +limit
      );
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await doctorApiService.getAllMedicalRecord(doctor_id);
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
  getMedicalRecord,
};
