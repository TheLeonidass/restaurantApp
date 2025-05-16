# restaurantApp

A React Native mobile application with a Node.js backend and MariaDB database, designed for managing restaurant-related features.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Backend](#running-the-backend)
- [Running the React Native App](#running-the-react-native-app)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

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

Create a .env file in the root folder by copying the example:
```bash
cp .env.example .env
```
Edit .env and update with your database credentials and any other required variables.

## Database Setup

### 1. Create the MariaDB database
Log into your MariaDB client and run:
```
CREATE DATABASE restaurantApp;
```

### 2. Import the database schema
Schema is located at database/schema.sql
or
Run this command in the terminal
```
mysql -u your_db_user -p restaurantApp < database/schema.sql
```
