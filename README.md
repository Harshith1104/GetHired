# GetHired

GetHired is a full-stack placement and job application tracker built for students to manage their job and internship applications in one place.

It helps students track companies, job roles, application status, deadlines, resume versions, package details, notes, and overall placement progress through a clean dashboard.

---

## Problem Statement

During placements, students apply to many companies through placement portals, company career pages, referrals, and internship websites. As the number of applications increases, it becomes difficult to remember deadlines, resume versions, current status, interview progress, and follow-up notes.

GetHired solves this problem by providing a centralized dashboard where students can manage applications, search records, filter by status, track upcoming deadlines, and view placement progress statistics.

---

## Objectives

- Track all job and internship applications in one place.
- Manage company, role, status, deadline, resume version, location, package, and notes.
- Support add, view, edit, delete, search, and filter operations.
- Show dashboard analytics for applications, interviews, offers, rejections, and dream companies.
- Display upcoming deadlines to avoid missing opportunities.
- Provide a clean, professional, and responsive user interface.

---

## Key Features

- Add, edit, delete, and view job applications.
- Search applications by company name, job role, or location.
- Filter applications by status.
- Track statuses: Applied, Shortlisted, Interview, Offer, and Rejected.
- Mark companies as dream companies.
- Store resume version used for each application.
- Track upcoming deadlines.
- View placement progress through dashboard cards.
- Responsive UI built with normal CSS.

---

## Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-Normal_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-REST_API-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![mysql2](https://img.shields.io/badge/mysql2-Driver-2F6F9F?style=for-the-badge)
![No ORM](https://img.shields.io/badge/No_ORM-Raw_SQL-success?style=for-the-badge)

### Stack Details

- **Frontend:** React + Vite + normal CSS
- **Backend:** NestJS + TypeScript REST API
- **Database:** MySQL
- **Database Driver:** mysql2
- **API Style:** REST API
- **State Management:** React hooks
- **Styling:** Normal CSS only


---

## Project Structure

```text
GetHired/
│
├── back-end/
│   │
│   ├── docs/
│   │   └── api.md                         # API documentation
│   │
│   ├── src/
│   │   │
│   │   ├── common/
│   │   │   ├── constants/
│   │   │   │   └── application-status.constant.ts
│   │   │   └── utils/
│   │   │       └── response.util.ts
│   │   │
│   │   ├── data/
│   │   │   ├── database.ts                # MySQL connection pool
│   │   │   └── schema.sql                 # Database schema
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── applications/
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-application.dto.ts
│   │   │   │   │   └── update-application.dto.ts
│   │   │   │   ├── applications.controller.ts
│   │   │   │   ├── applications.module.ts
│   │   │   │   └── applications.service.ts
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── dashboard.controller.ts
│   │   │       ├── dashboard.module.ts
│   │   │       └── dashboard.service.ts
│   │   │
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   │
│   ├── test/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
│
├── front-end/
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   └── applicationApi.js          # API calls
│   │   │
│   │   ├── components/
│   │   │   ├── ApplicationForm.jsx
│   │   │   ├── ApplicationTable.jsx
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── DeadlineList.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── SearchFilterBar.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

```

---

## API Documentation

> Complete backend API documentation is available in the project repository.

[![API Documentation](https://img.shields.io/badge/API_Documentation-back--end/docs/api.md-blue?style=for-the-badge&logo=readme&logoColor=white)](back-end/docs/api.md)

### Main API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Backend health check |
| `POST` | `/applications` | Create a new job application |
| `GET` | `/applications` | Fetch all job applications |
| `GET` | `/applications?search=google` | Search applications |
| `GET` | `/applications?status=Applied` | Filter applications by status |
| `GET` | `/applications/:id` | Fetch one application by ID |
| `PUT` | `/applications/:id` | Update an application |
| `DELETE` | `/applications/:id` | Delete an application |
| `GET` | `/dashboard/stats` | Fetch dashboard statistics |

---

## Quick Start

Follow these steps to clone, configure, run, and test the project locally.

---

## 1. Clone the Repository

```bash
git clone https://github.com/Harshith1104/GetHired.git
cd GetHired
```

---

## 2. Backend Environment Setup

Create a local `.env` file inside the `back-end` folder using the sample environment file.

```bash
cd back-end
cp .env.example .env
```

Example `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=gethired_user
DB_PASSWORD=gethired123
DB_NAME=gethired_db
FRONTEND_URL=http://localhost:5173
PORT=3000
```

> `.env` is used only for local configuration and should not be pushed to GitHub.  
> `.env.example` should be pushed because it helps others understand the required environment variables.

---

## 3. MySQL Database Setup

If MySQL is running in Ubuntu/WSL, start MySQL from Ubuntu.

```bash
sudo service mysql start
sudo mysql
```

Run the following SQL commands:

```sql
CREATE DATABASE IF NOT EXISTS gethired_db;

CREATE USER IF NOT EXISTS 'gethired_user'@'localhost' IDENTIFIED BY 'gethired123';

GRANT ALL PRIVILEGES ON gethired_db.* TO 'gethired_user'@'localhost';

FLUSH PRIVILEGES;

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

exit;
```

You can also run the schema file directly:

```bash
cd back-end
mysql -u root -p < src/data/schema.sql
```

---


## Testing Checklist

Use this checklist to verify that the project is working correctly.

| Feature | Expected Result |
|---|---|
| Open frontend | Dashboard loads at `http://localhost:5173` |
| Open backend | API responds at `http://localhost:3000` |
| Add application | New application appears in the table |
| Edit application | Updated details reflect immediately |
| Delete application | Application is removed after confirmation |
| Search | Applications filter by company, role, or location |
| Status filter | Applications filter by selected status |
| Reset | Search and filter are cleared |
| Dashboard cards | Counts update after add, edit, or delete |
| Upcoming deadlines | Nearest future deadlines are displayed |
| Browser console | No red errors |

---


## Project Summary

GetHired is a practical full-stack project that solves a real student problem during placement preparation. It combines a React dashboard, NestJS REST API, and MySQL database to provide organized application tracking, search, filtering, dashboard analytics, and deadline monitoring.

This project demonstrates full-stack development skills, REST API design, database integration, frontend state management, professional UI design, and clean academic project structuring without relying on heavy external frameworks.
