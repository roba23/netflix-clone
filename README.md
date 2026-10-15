markdown
# Netflix Clone (MERN Stack)

A full-stack **Netflix Clone** built using the **MERN** (MongoDB, Express, React, Node.js) stack. This application replicates core streaming platform functionalities, including session-based user authentication, content discovery, movie searching, and a premium tiered subscription model integrated with the [Chapa Payment API](https://chapa.co).

## 🚀 Features

- **User Authentication:** Secure registration, login, and persistent session management using **Passport.js**.
- **Movie Exploration:** Browse movies by categories, trending lists, and personalized banners.
- **Dynamic Search:** Real-time search functionality to find movies instantly by title or genre.
- **Subscription Tiers:** Multi-level premium access control (e.g., Basic, Standard, Premium).
- **Chapa Payment Integration:** Secure mobile money and card payment processing natively optimized for East African markets via Chapa.
- **Responsive UI:** Fully responsive design built with Tailwind CSS, mimicking the dark-themed Netflix dashboard.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit (State Management), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Payment Gateway:** Chapa API
- **Authentication:** Passport.js & Express-Session
- **Task Runner:** Concurrently (Runs frontend and backend together)

## 📋 Prerequisites

Before setting up the project locally, ensure you have:
- [Node.js](https://nodejs.org) installed (v16.x or higher)
- [MongoDB Atlas](https://mongodb.com) account or local MongoDB instance
- [Chapa Developer Account](https://chapa.co) for API Secret Keys

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com
cd netflix-clone-mern
```

### 2. Configure Environment Variables
You need to set up environment configurations for both the backend and frontend before launching the app.

#### Backend Configuration
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_express_session_secret_key
CHAPA_SECRET_KEY=CHASECK_TEST-xxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
Create a `.env` file inside the `frontend/` directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_CHAPA_PUBLIC_KEY=CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxx
```

### 3. Install Dependencies & Start Project
From the root directory of the project, run the following commands to install dependencies and boot up both application layers simultaneously:

```bash
# Install root, backend, and frontend dependencies
npm install

# Start both backend and frontend servers together
npm run dev
```
*The backend will boot on port `3000` and the React frontend will open automatically on port `5173`.*

## 🔌 API Endpoints (Quick Reference)

### Authentication (Passport.js Sessions)
- `POST /api/auth/register` - Register a new user account
- `POST /api/auth/login` - Authenticate user credentials and establish session
- `POST /api/auth/logout` - Terminate user session

### Movies
- `GET /api/movies` - Get all categorized movies
- `GET /api/movies/search?q=query` - Search movies by keyword

### Payments & Subscription
- `POST /api/payments/initialize` - Initialize subscription checkout with Chapa
- `GET /api/payments/verify/:tx_ref` - Verify transaction status webhook/callback

## 🔒 License

This project is licensed under the MIT License. See the `LICENSE` file for detail
