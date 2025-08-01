# 🛠️ NestJS Backend - Installation Guide

This is a backend project built with [NestJS](https://nestjs.com/) and connected to MongoDB. It includes Google OAuth2 authentication and JWT-based login.

---

## 📦 Requirements

- Node.js (v18+ recommended)
- npm (v9+)
- MongoDB (cloud or local)
- Google Cloud Console credentials (for OAuth2)

---

## 🚀 Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and copy the following content:

   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/

   # Server settings
   PORT=4000

   # JWT configurations
   JWT_SECRET=tomer
   JWT_EXPIRES_IN=24h

   # Google OAuth2
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Use your local machine's IP for server (if not using localhost)
   GOOGLE_CALLBACK_URL=http://<your-server-ip>:4000/users/google/redirect

   # Redirect after login – this is usually your frontend (React) address
   GOOGLE_RES_REDIRECT=http://<your-frontend-address>:3000
   ```

   **Notes:**

   - Replace `<username>`, `<password>`, and `xxxxx` in `MONGO_URI`.
   - Use your **own IP address** or `localhost` depending on your setup.
   - Replace Google OAuth credentials with your own from [Google Developer Console](https://console.cloud.google.com/).

4. **Run the Project**

   ```bash
   npm run start:dev
   ```

   The server will be available at: `http://localhost:4000`

---

## 🔑 Google OAuth2 Setup

To make OAuth2 work:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create an OAuth2 Client ID.
3. Set the **Authorized redirect URI** to match your `GOOGLE_CALLBACK_URL` (e.g., `http://localhost:4000/users/google/redirect`).
4. Copy the client ID and secret to `.env`.

---

## 🧪 Useful Commands

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run start`     | Run in production mode   |
| `npm run start:dev` | Run in development mode  |
| `npm run build`     | Compile the project      |
| `npm run lint`      | Check for linting errors |
| `npm run test`      | Run unit tests           |

---

## 🗒️ Troubleshooting

- Make sure ports `4000` (backend) and `3000` (frontend) are available.
- Ensure your Google credentials match the redirect URI.
- If working across machines, update the `.env` file with correct IPs or hostnames.

---

## ⚛️ React Client Environment Setup

Create a `.env` file in your React project root with the following content:

```env
# REACT_APP_SERVER_URL=https://jobfinder-server-d7g6.onrender.com
# REACT_APP_SOCKET_URL=https://jobfinder-server-d7g6.onrender.com
REACT_APP_SERVER_URL=http://192.168.90.30:4000
REACT_APP_SOCKET_URL=http://192.168.90.30:4000
REACT_APP_USER_NAMESPACE=/user
REACT_APP_NOTIFICATION_NAMESPACE=/notification

REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDRY93KKvKIsO4e4p3K_OiOMrK8w-R45eI
```

**Note:** Do not change these values unless you understand the environment configuration and IP setup. Adjust the server IP only if your backend is hosted on a different machine.

---
