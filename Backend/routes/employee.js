const express = require("express");
const Employee = require("../models/employees");
const multer = require("multer");
const cloudinary = require("../cloudinary");

const employeeRouter = express.Router();

// Multer setup for handling image uploads
const memory = multer.memoryStorage();
const upload = multer({ storage: memory });

// Add employees to DB
employeeRouter.post("/Add", upload.array("media"), async (req, res) => {
  const { name, email, mobileNumber, designation, gender } = req.body;
  try {
    //Upload image to cloudinary
    const mediaUrls = await Promise.all(
      req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              upload_preset: "Unsigned",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );

    //verify employee
    const employeeEmail = await Employee.findOne({ email: email });
    if (employeeEmail) {
      return res.status(400).json({ message: "Employee Email already exists" });
    }
    const employeeMobile = await Employee.findOne({
      mobileNumber: mobileNumber,
    });

    if (employeeMobile) {
      return res
        .status(400)
        .json({ message: "Employee MobileNumber already exists" });
    }
    const newEmployee = await Employee.create({
      name,
      email,
      mobileNumber,
      designation,
      gender,

      image: mediaUrls,
    });
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

//Get All employees

employeeRouter.get("/get", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// edit employee details by ID

employeeRouter.put("/edit/:id", upload.single("media"), async (req, res) => {
  const { name, email, mobileNumber, designation, gender } = req.body;
  const { id } = req.params;
  try {
    //Upload image to cloudinary
    const mediaUrls = await Promise.all(
      req.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              upload_preset: "Unsigned",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobileNumber,
        designation,
        gender,
        image: mediaUrls,
      },
      { new: true, runValidators: true }
    );
    res.json({ message: "Employee updated successfully", employee });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

// Delete employee by ID

employeeRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = employeeRouter;
