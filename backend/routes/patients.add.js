const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const NewPatients = require("../models/patients.add");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { name, age, dob, email, address } = req.body;

    const newPatient = new NewPatients({
      name,
      age,
      dob,
      email,
      address: {
        street: address.street || "",
      },
    });

    if (req.file) {
      newPatient.file = req.file.buffer;
    }

    await newPatient.save();

    res.status(201).json({
      message: "Patient added successfully.",
      patient: newPatient,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({
      error: "An error occurred while adding the patient.",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const patients = await NewPatients.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching patients.",
      details: error.message,
    });
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, age, dob, email, address } = req.body;

    const updatedPatient = await NewPatients.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        dob,
        email,
        address: {
          street: address?.street || "",
        },
        ...(req.file && { file: req.file.buffer }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({
      message: "Patient updated successfully.",
      patient: updatedPatient,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists." });
    }
    res.status(500).json({
      error: "An error occurred while updating the patient.",
      details: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await NewPatients.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    res.status(200).json({
      message: "Patient deleted successfully.",
      patient: deletedPatient,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the patient.",
      details: error.message,
    });
  }
});

module.exports = { router };
