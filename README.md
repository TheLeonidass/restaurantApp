# restaurantApp

A React Native mobile application with a Node.js backend and MariaDB database, designed for managing restaurant-related features.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [Running the Backend](#running-the-backend)
- [Running the React Native App](#running-the-react-native-app)

- [Notes](#notes)

---

## Project Overview

This project includes:

- A **React Native** app for Android/iOS.
- A **Node.js** backend using Express.js.
- A **MariaDB** database.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [MariaDB](https://mariadb.org/download/)
- React Native environment set up ([official guide](https://reactnative.dev/docs/environment-setup))
- Android Studio / Xcode for mobile emulators or a physical device

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/TheLeonidass/restaurantApp.git
cd restaurantApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Rename the .env.example file in the root folder to .env
Edit .env and update with your database credentials and any other required variables.

### 4. Make changes to config.js

In the config.js file change the IP address with YOUR IP address and the PORT that you chose to run the backend. To see your IP address run:
```
ipconfig
```

---

## Database Setup

### 1. Create the MariaDB database

Log into your MariaDB client and run:
```
CREATE DATABASE restaurant_app;
```

### 2. Import the database schema

Schema is located at database/schema.sql
or
Run this command in the terminal
```
mysql -u your_db_user -p restaurant_app < database/schema.sql
```

---

## Running the Backend

Start the Node.js server:
```
node server.js
```

---

## Running the React Native App

For Android make sure you have Expo Go installed on your device:
```
npx expo start
```
This will build the project and you can scan the QR Code to use it on your phone.

---

## Notes

# Make sure to put your correct credentials in the .env file.
# Change the config.js file with YOUR IP address and PORT.
