require("dotenv").config();
import db from "../Models/index.js";

const getAllMedicalRecord = async (doctor_id) => {
  try {
    // get all hospital
    let MedicalRecord = await db.MedicalRecords.find({
      doctor_id: doctor_id,
    }).populate([
      {
        path: "patient_id",
        select: "username",
      },
      { path: "doctor_id", select: "username" },
    ]);

    if (MedicalRecord) {
      return {
        EM: "get data success",
        EC: 0,
        DT: MedicalRecord,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getMedicalRecordWithPagination = async (doctor_id, page, limit) => {
  try {
    const offset = (page - 1) * limit;

    const [MedicalRecord, count] = await Promise.all([
      db.MedicalRecords.find({ doctor_id: doctor_id })
        .populate([
          {
            path: "patient_id",
            select: "username",
          },
          { path: "doctor_id", select: "username" },
        ])
        .skip(offset)
        .limit(limit)
        .sort({ _id: -1 }),
      db.faculty.countDocuments({
        doctor_id: doctor_id,
      }), // Đếm có điều kiện
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      MedicalRecord: MedicalRecord,
    };

    return {
      EM: "FETCH Ok!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllMedicalRecord,
  getMedicalRecordWithPagination,
};
