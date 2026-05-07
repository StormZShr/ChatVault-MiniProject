# ChatVault

## Abstract
ChatVault is a categorized media-sharing web application designed to solve the problem of important class materials getting buried in continuous group chat feeds. Whether a user is looking for handwritten notes, schedule information, or casual media, this platform offers a structured, automated, and secure archive for classmates. Powered by the Gemini AI vision model for automated image categorization, a FastAPI backend, and a modern React frontend, ChatVault helps users securely upload, organize, and retrieve class media with ease.

## Features
* **Automated Organization:** Uses Google Gemini AI to automatically categorize uploaded images into Notes, Information, or Funny Media, eliminating manual sorting.
* **Secure Vault:** Implements JWT authentication and bcrypt password hashing to ensure secure user access and data protection.
* **Cloud-Optimized Delivery:** Utilizes ImageKit CDN for high-performance image delivery and Neon PostgreSQL for serverless, scalable database management.
* **Responsive UI:** Built with React and Tailwind CSS for a fast, lightweight, and user-friendly experience including dark-mode vault styling.

## Technology Stack
* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** FastAPI (Python), UV (Package Manager)
* **Database:** PostgreSQL (Neon.tech)
* **AI Service:** Google Gemini 2.5 Flash API
* **Storage/CDN:** ImageKit
* **DevOps & Hosting:** Docker, Docker Compose, Vercel (Frontend), Render (Backend)

## Software Requirements Specifications (SRS)

### 1. System Architecture & Logic Flow
The application operates on a modular architecture separated into distinct services:
* **Controller (FastAPI_App):** Acts as the main gateway for the backend API. It defines RESTful endpoints handling requests for registration, login, media uploads, retrievals, and deletions.
* **Auth Service:** Manages security functions, including bcrypt password hashing, credential verification, and JWT token generation/decoding.
* **AI Categorizer:** Handles communication with the Google Gemini API. It accepts raw image bytes and returns a strict text category label based on AI analysis.
* **Storage Service:** Interfaces with the external ImageKit CDN for synchronous file uploads, retrieving secure media URLs, and managing file deletions.

### 2. Database Schema (Entity Relationship)
The application utilizes a standard normalized relational schema centered around two principal entities with a One-to-Many relationship (a User can upload many Media files).
* **USER Entity:** * `user_id` (Primary Key): Unique integer for each user.
  * `username`: Unique login string.
  * `password_hash`: Securely hashed password.
  * `created_at`: Registration timestamp.
* **MEDIA Entity:** * `media_id` (Primary Key): Unique integer for each media record.
  * `filename`: Original name of the uploaded file.
  * `file_id_cdn`: Unique identifier returned by ImageKit.
  * `media_url`: CDN link used to serve the image.
  * `category`: AI-generated classification ("notes", "information", or "funny").
  * `uploaded_at`: Timestamp of processing.
  * `uploaded_by` (Foreign Key): Links to the `USER` entity's `user_id`.

### 3. Hardware & Software Requirements
**Development Environment:**
* **Processor:** Multi-core processor (Intel Core i5 or equivalent)
* **Memory (RAM):** Minimum 8 GB; 16 GB preferred for running Docker containers, Vite, and Python servers.
* **Storage:** SSD with at least 50 GB of free space.
* **Software:** Visual Studio Code, Docker, UV package manager, modern web browsers (Chrome, Safari, Edge).

**Production Environment:**
* **Backend Hosting (e.g., Render):** vCPU with 512 MB to 1 GB RAM.
* **Network:** Reliable bandwidth required for Gemini API interactions and ImageKit media serving.

## Future Enhancements
* **AI-Powered OCR Search:** Integrating Optical Character Recognition to allow students to search by keyword and find images containing specific handwritten text.
* **Mobile App Development:** Building a native mobile application for Android and iOS using React Native to reach learners on the go.
* **Administrator Dashboards:** Adding administrative roles to moderate content, view storage analytics, and manage users across classrooms.
