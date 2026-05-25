CREATE DATABASE IF NOT EXISTS gethired_db;

USE gethired_db;

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  companyName VARCHAR(150) NOT NULL,
  jobRole VARCHAR(150) NOT NULL,
  status ENUM('Applied', 'Shortlisted', 'Interview', 'Offer', 'Rejected') DEFAULT 'Applied',
  appliedDate DATE NULL,
  deadlineDate DATE NULL,
  resumeVersion VARCHAR(150),
  location VARCHAR(150),
  packageOffered VARCHAR(100),
  notes TEXT,
  isDreamCompany BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
