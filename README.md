# Task Manager App

Documentation for setting up, running, building, and containerizing application.

## 🧪 Environment Setup

Copy `env.example` as `.env.local` file in the root directory:

## 🚀 Development

Install dependencies and start the dev server:

```
npm run install
npm run dev
```

Visit `http://localhost:3000`

## 🏗️ Production Build

Build and start the app for production:

```
npm build
npm start
```

## 🐳 Docker Build

```
docker build -t <tag> .
```