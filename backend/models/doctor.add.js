const mongoose = require("mongoose");

const NewDoctor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    experience: {
      type: Number,
      required: true,
      min: 0, // Years of experience
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    doctorDetails: {
      type: String,
      required: true,
      maxlength: 350,
    },
    address: {
      type: String,
    },
    file: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doctor.add", NewDoctor);
