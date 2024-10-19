# Tales of Pirates Online

## Background

Initially, this project utilized endpoints from RealWorld's API as the backend, with two base URLs:

- **Conduit**: `https://conduit.productionready.io/api`
- **RealWorld**: `https://api.realworld.io/api`

However, due to problems with the incorrect operation of the server RealWorld's, there was a need to implement a server with its own database.

## Table of Contents

- [Background](#background)
- [Description](#description)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Description

This project is a web application built with Vue.js, Vuex for state management, TypeScript for type safety, and SCSS for styling. The backend is built with Express and uses SQLite as the database.

## Technologies

- **Front-end**:

  - Vue 3
  - Vuex
  - TypeScript
  - SCSS
  - Vite
  - Axios
  - Vue Router

- **Back-end**:
  - Node.js
  - Express
  - SQLite
  - CORS

## Requirements

Before running the project, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (version 22.3.0)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

## Getting Started

To get started with this project, you'll need to clone the repository.

```bash
  git clone https://github.com/your-username/top-online---vue-vuex-ts-scss.git
```

## Setup Instructions

1. Navigate to the frontend directory:

```bash
  cd path/to/your/top-online---vue-vuex-ts-scss
```

2. Install frontend dependencies:

```bash
  npm install
```

3. Navigate to the backend directory:

```bash
  cd path/to/your/top-online---vue-vuex-ts-scss/server
```

4. Install backend dependencies:

```bash
  npm install
```

5. Return to the main project folder:

```bash
  cd ..
```

6. Start the project (vue + express):

```bash
  npm run dev
```

The frontend will be available at `http://localhost:5000` (or the specified port by Vite).

## Usage

The application consists of a backend API that handles data operations and a frontend interface for users to interact with. You can make API requests to the server using Axios from the frontend.
