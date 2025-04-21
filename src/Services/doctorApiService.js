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

const getAllDoctorInFaculty = async (faculty_id) => {
  try {
    // get all hospital
    let doctor = await db.accounts.find({
      faculty_id: faculty_id,
    });

    if (doctor) {
      return {
        EM: "get data success",
        EC: 0,
        DT: doctor,
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

const getAllAppointment = async (valueSearch, doctor_id) => {
  try {
    // get all hospital
    let Appointment = await db.appointment
      .find({
        doctor_id: doctor_id,
        status: valueSearch,
      })
      .populate({
        path: "patient_id",
        select: "username",
      });

    if (Appointment) {
      return {
        EM: "get data success",
        EC: 0,
        DT: Appointment,
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

const getAppointmentdWithPagination = async (
  valueSearch,
  doctor_id,
  page,
  limit
) => {
  try {
    const offset = (page - 1) * limit;

    const [Appointment, count] = await Promise.all([
      db.appointment
        .find({
          doctor_id: doctor_id,
          status: valueSearch,
        })
        .populate({
          path: "patient_id",
          select: "username",
        })
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
      Appointment: Appointment,
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

const updateAppointment = async (data) => {
  try {
    const appointment = await db.appointment.findById(data.id);
    if (!appointment) {
      return {
        EM: "Appointment not found",
        EC: 2,
        DT: "",
      };
    }

    appointment.status = data.status;
    await appointment.save();

    return {
      EM: "Update appointment successfully!",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return { EM: "Something went wrong with service", EC: 1, DT: [] };
  }
};

const createMedicalRecord = async (data) => {
  try {
    console.log(data);

    await db.MedicalRecords.create({
      doctor_id: data.doctor_id,
      patient_id: data.patient_id,
      hospital_id: data.hospital_id,
      diagnosis: data.diagnosis,
      notes: data.notes,
    });

    const appointment = await db.appointment.findById(data.id);
    if (!appointment) {
      return {
        EM: "Appointment not found",
        EC: 2,
        DT: "",
      };
    }

    appointment.status = "Done";
    await appointment.save();

    return {
      EM: "Create Medical Record succeeds",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

module.exports = {
  getAllMedicalRecord,
  getMedicalRecordWithPagination,
  getAllDoctorInFaculty,
  getAllAppointment,
  getAppointmentdWithPagination,
  updateAppointment,
  createMedicalRecord,
};
