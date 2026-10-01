# ClassMate Nepal

### Smart Classroom Attendance Management

A clean, modern, and fully functional classroom attendance system built with **React.js** and **Vite**. Designed for Nepali classrooms with a simple UI, local storage persistence, and zero unnecessary dependencies.

---

## Overview

**ClassMate Nepal** helps teachers manage daily classroom attendance quickly and easily. All data is stored in the browser’s `localStorage`, so nothing is lost on refresh and no backend is required.

Perfect for:

- College / school classroom demos
- Learning React (hooks, forms, state, localStorage)
- Small class management without a server

---

## Features

| Module                 | What it does                                                                  |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Dashboard**          | Total students, Present / Absent / Late today, overall attendance percentage  |
| **Student Management** | Add, edit, delete students • Search • Unique roll number validation           |
| **Attendance**         | Select date • Mark Present / Absent / Late • Mark All Present • Save per date |
| **Attendance History** | View any previous date’s records with counts                                  |
| **Student Report**     | Individual student summary (total classes, present, absent, late, %)          |
| **Local Storage**      | Data persists after browser refresh                                           |

### Extra touches

- Nepal-inspired green color theme
- Sample Nepali student names (BCSIT - 1A)
- Status badges with both color **and** text
- Fully responsive (mobile sidebar)
- Friendly validation & confirmation dialogs

---

## Tech Stack

- **React 19** – Functional components only
- **Vite** – Fast development server & build
- **JavaScript (JSX)** – No TypeScript
- **Plain CSS** – No UI libraries
- **Browser localStorage** – Data persistence

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/classmate-nepal.git

# Go into the project folder
cd classmate-nepal

# Install dependencies
npm install

# Start development server
npm run dev
```
