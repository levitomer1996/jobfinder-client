# React Project - Environment Configuration Guide

This project uses environment variables defined in a `.env` file to connect to backend services. Below is a guide to help you configure the `.env` file for local development or deployment.

---

## 📁 `.env` File Example

```env
# These are the production (hosted) server URLs:
# REACT_APP_SERVER_URL=https://jobfinder-server-d7g6.onrender.com
# REACT_APP_SOCKET_URL=https://jobfinder-server-d7g6.onrender.com

# Change these to match your local server IP and port:
REACT_APP_SERVER_URL=http://192.168.90.30:4000
REACT_APP_SOCKET_URL=http://192.168.90.30:4000

# WebSocket Namespaces (leave unchanged unless backend changes)
REACT_APP_USER_NAMESPACE=/user
REACT_APP_NOTIFICATION_NAMESPACE=/notification

# Google Maps API Key
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

---

## 🛠 Instructions for Local Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```bash
   npm install
   ```

3. **Set Up Environment File**

   - Copy the example `.env` format above into a new file named `.env`.
   - Replace the IP address `192.168.90.30` with your own local IP address or `localhost` if running on the same machine as the server.

4. **Run the Development Server**

   ```bash
   npm start
   ```

   The app will typically run at [http://localhost:3000](http://localhost:3000).

---

## 🔁 Switching to Production Server

To point to the deployed (hosted) backend, comment the local server lines and uncomment the hosted URLs:

```env
REACT_APP_SERVER_URL=https://jobfinder-server-d7g6.onrender.com
REACT_APP_SOCKET_URL=https://jobfinder-server-d7g6.onrender.com
```

---

## 🔑 Google Maps API Key

If your app uses Google Maps, make sure to:

- Generate an API key from the [Google Cloud Console](https://console.cloud.google.com/).
- Replace the placeholder value in `.env`:
  ```env
  REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_REAL_API_KEY
  ```

---

## ✅ You're All Set!

Once configured, your local environment should be ready for development. Happy coding! 🎉
