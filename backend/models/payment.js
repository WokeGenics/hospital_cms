const mongoose = require("mongoose");
const { getNextSequence } = require("../counter");

const PatientRecordSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    doctorName: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    dischargeDate: {
      type: Date,
    },
    serviceName: {
      type: String,
      required: true,
    },
    costOfTreatment: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0, // Default discount to 0%
      min: 0,
      max: 100,
    },
    advancePaid: {
      type: Number,
      required: true,
      min: 0,
    },
    cardOrCheckNo: {
      type: String,
      maxLength: 100,
    },
  },
  { timestamps: true }
);
});

module.exports = mongoose.model("payment", PatientRecordSchema);
