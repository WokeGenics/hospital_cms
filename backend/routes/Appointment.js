const express = require("express");
const Appointment = require("../models/Appointment");
const { getNextSequence } = require("../counter");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { department, doctorName, appointmentDate, timeSlot, problem } =
      req.body;

    const appointmentId = getNextSequence();

    const newAppointment = new Appointment({
      appointmentId,
      department,
      doctorName,
      appointmentDate,
      timeSlot,
      problem,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Failed to create appointment.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments.",
      error: error.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { department, doctorName, appointmentDate, timeSlot, problem } =
      req.body;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.id },
      { department, doctorName, appointmentDate, timeSlot, problem },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({
      message: "Appointment updated successfully.",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findOneAndDelete({
      appointmentId: req.params.id,
    });

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({
      message: "Appointment deleted successfully.",
      appointment: deletedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete appointment.",
      error: error.message,
    });
  }
});

module.exports = router;
