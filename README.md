# 💰 MoneyFlow V2

A production-ready full-stack personal finance management application built with Spring Boot, React, and PostgreSQL.

MoneyFlow V2 helps users securely track income and expenses, manage financial transactions, analyze spending patterns, and monitor their financial activity through an interactive dashboard.

## 🚀 Live Demo

Frontend: https://moneyflow-v2-1.onrender.com

Backend API: https://moneyflow-v2.onrender.com

> Note: The backend is hosted on Render's free tier. The first request may take a short time while the service starts.
## 📸 Application Screenshots

### Dashboard

![MoneyFlow Dashboard](dashboard.png)

### Transactions

![MoneyFlow Transactions](transactions.png)

### Analytics

![MoneyFlow Analytics](analytics.png)
## ✨ Features

- Secure user registration and login
- JWT-based authentication and authorization
- User-specific financial data
- Add income and expense transactions
- Edit and delete transactions
- Transaction search and filtering
- Category-based transaction management
- Dashboard financial summary
- Income and expense analytics
- Interactive charts and visual insights
- Monthly financial analysis
- CSV transaction export
- Responsive user interface
- Dark and light mode
- Production PostgreSQL database
- Mobile-friendly web application

## 🛠️ Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

### Frontend

- React.js
- Vite
- Material UI
- Axios
- React Router
- Recharts

### Database

- PostgreSQL

### Deployment & Tools

- Render
- Docker
- Git
- GitHub
- Postman
- pgAdmin

## 🏗️ Architecture

MoneyFlow V2 follows a modern full-stack architecture:

React Frontend  
↓  
REST API  
↓  
Spring Boot Backend  
↓  
Spring Security + JWT  
↓  
Spring Data JPA / Hibernate  
↓  
PostgreSQL Database

The frontend communicates with the backend through REST APIs. JWT authentication protects secured endpoints and financial records are associated with individual users.

## 🔐 Authentication Flow

1. User registers with name, email, and password.
2. The password is securely hashed before database storage.
3. The user logs in using registered credentials.
4. The backend validates the credentials.
5. A JWT token is generated.
6. The frontend sends the JWT token with authenticated API requests.
7. Spring Security validates the token before allowing access to protected resources.

## 📊 Core Modules

### Authentication

- User registration
- User login
- JWT token generation
- Protected API endpoints

### Transaction Management

- Create transactions
- View transactions
- Update transactions
- Delete transactions
- Income and expense tracking

### Dashboard

- Total balance
- Total income
- Total expenses
- Financial overview

### Analytics

- Income vs expense visualization
- Expense category insights
- Monthly financial trends
- Interactive charts

## 🌐 Production Deployment

The application is deployed using Render.

- React frontend deployed as a Static Site
- Spring Boot backend deployed as a Web Service
- Backend containerized using Docker
- PostgreSQL production database hosted on Render
- Environment variables used for production database configuration
- SPA rewrite rules configured for React Router

## 📂 Project Structure

```text
moneyflow-v2
│
├── moneyflow-backend
│   ├── src
│   ├── pom.xml
│   └── Dockerfile
│
├── moneyflow-frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
