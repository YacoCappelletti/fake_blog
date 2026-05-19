# Fake Blog Platform

Full-stack blogging platform with React, Spring Boot and MySQL.

## 🛠️ Stack

- **Backend:** Spring Boot (Java) + JPA + Security
- **Frontend:** React.js + CSS3
- **Database:** H2 (dev) / MySQL (prod)
- **Build:** Maven

## 📁 Structure

### Backend (`fake_blog_backend/`)
```
├── src/main/java/com/fake_blog/
│   ├── config/          # Spring config & security
│   ├── controller/      # REST endpoints
│   ├── model/           # JPA entities
│   └── service/         # Business logic
└── pom.xml
```

### Frontend (`fake_blog_frontend/`)
```
├── public/assets/       # Static assets
├── src/components/      # Reusable React components
└── App.js               # Root + routing
```

## 🚀 Features

- ✅ User authentication (register, login)
- ✅ Full CRUD for posts
- ✅ Comment and reaction system
- ✅ Search and filtering
- ✅ Responsive design

## ▶️ Run Locally

```bash
# Backend
cd fake_blog_backend && ./mvnw spring-boot:run

# Frontend
cd fake_blog_frontend && npm install && npm start
```

---

> Fullstack project by Yaco Cappelletti
