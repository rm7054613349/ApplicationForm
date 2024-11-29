const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  casteCategory: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  hobbies: [String],
  photo: { type: String },
  signature: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Applicant', applicantSchema);
