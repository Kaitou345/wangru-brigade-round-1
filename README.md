# Smart Office Energy Monitoring System

<p align="center">
  <img src="./architecture.png" alt="System Architecture" width="850">
</p>

A real-time Smart Office Energy Monitoring System built for the **IUT Hackathon**.

The system simulates an office environment containing multiple rooms and electrical appliances, continuously tracks their states, provides a live monitoring dashboard, responds to Discord commands using an LLM, and proactively notifies users when devices remain active after office hours.

---

## Features

- 🏢 Simulated office environment
- ⚡ Real-time device state updates
- 📊 Live React dashboard
- 🤖 Discord bot with natural language responses
- 🧠 Gemini-powered office assistant
- 🔔 Automatic after-hours alerts
- 🔌 REST API
- 📡 Socket.IO real-time communication

---

## Project Structure

```
IUT-HACKATHON/
│
├── backend/      # Express + Socket.IO + Simulator + Gemini API
├── bot/          # Discord Bot
├── dashboard/    # React + Tailwind Dashboard
└── README.md
```

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Socket.IO
- Google Gemini API

### Dashboard
- React
- Tailwind CSS
- Socket.IO Client

### Bot
- Discord.js
- Axios
- Socket.IO Client

---

# Setup

Clone the repository.

Then install dependencies for **each project**.

## Backend

```bash
cd backend
npm install
```

---

## Discord Bot

```bash
cd bot
npm install
```

---

## Dashboard

```bash
cd dashboard
npm install
```

---

# Running the Project

Open **three terminals**.

---

### Terminal 1

```bash
cd backend
npm run dev
```

---

### Terminal 2

```bash
cd bot
npm run dev
```

---

### Terminal 3

```bash
cd dashboard
npm run dev
```

---

The system will now be running.

- Backend API + Socket.IO server
- Discord Bot
- React Dashboard

---

# Architecture

The system consists of four major components:

- **Simulator**
  - Simulates office rooms, devices, and a virtual office clock.
  - Emits state updates and after-hours alerts.

- **Backend**
  - Hosts the REST API.
  - Streams real-time updates through Socket.IO.
  - Acts as the communication hub between all components.

- **Dashboard**
  - Displays live office state.
  - Shows room-wise power consumption.
  - Displays after-hours alerts.

- **Discord Bot**
  - Responds to user commands.
  - Uses Gemini to generate natural-language summaries.
  - Receives proactive alert notifications from the backend.

---

# Discord Commands

```
!help

!status

!usage

!room drawing

!room work1

!room work2
```

---

# API Endpoints

```
GET /api/state

GET /api/usage

GET /api/alerts

GET /api/discord/status

GET /api/discord/usage

GET /api/discord/room/:room
```

---

# Real-Time Events

### Dashboard

```
office:update
```

Receives simulator state updates in real time.

---

### Discord Bot

```
after-hours-alert
```

Receives proactive alerts every simulated hour after office hours while devices remain active.

---

# Office Simulation

The simulator models:

- Drawing Room
- Work Room 1
- Work Room 2

Each room contains:

- Ceiling Fans
- Lights

The simulator advances using a virtual office clock and randomly toggles device states to emulate real-world activity.

---

# Office Hours

```
09:00 AM
↓

05:00 PM
```

Devices still running after office hours automatically generate alerts.

---

# Authors

Developed for the **IUT Hackathon**.
