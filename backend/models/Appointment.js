const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
      trim: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
      enum: [
        "9AM-10AM",
        "10AM-11AM",
        "11AM-12PM",
        // other slots as needed
      ],
    },
    tokenNumber: {
      type: Number,
      unique: true,
      default: function () {
        return Math.floor(Math.random() * 10000); // Generate a random token number
      },
    },
    problem: {
      type: String,
      maxlength: 250,
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("schedule.appointment", AppointmentSchema);
