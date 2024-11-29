const Applicant = require('../models/Applicant');

// Add new applicant
exports.addApplicant = async (req, res) => {
  try {
    const { name, fatherName, dateOfBirth, gender, religion, casteCategory, address, country, state, district, hobbies } = req.body;
    const photo = req.files['photo'] ? req.files['photo'][0].path : null;
    const signature = req.files['signature'] ? req.files['signature'][0].path : null;

    const newApplicant = new Applicant({ name, fatherName, dateOfBirth, gender, religion, casteCategory, address, country, state, district, hobbies, photo, signature });
    await newApplicant.save();
    res.status(201).json({ message: 'Applicant registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering applicant', error });
  }
};

// Get all applicants
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants', error });
  }
};

// Delete applicant
exports.deleteApplicant = async (req, res) => {
  try {
    await Applicant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting applicant', error });
  }
};
