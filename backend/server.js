const express = require('express');
const cors = require('cors');
const path = require('path');
const { connect } = require('./config/db');
const applicantRoutes = require('./routes/applicantRoutes');
require('dotenv').config();

connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/applicants', applicantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
