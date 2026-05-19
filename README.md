# Fake Blog Platform

Plataforma completa de blogging con React, Spring Boot y MySQL.

## 🛠️ Stack Tecnológico

- **Backend:** Spring Boot (Java) + Spring JPA + Spring Security
- **Frontend:** React.js + CSS3
- **Base de datos:** H2 (dev) / MySQL (prod)
- **Build:** Maven

## 📁 Estructura del Proyecto

### Backend (`fake_blog_backend/`)
```
├── src/main/java/com/fake_blog/
│   ├── config/          # Configuración Spring + seguridad
│   ├── controller/      # REST endpoints
│   ├── model/           # Entidades JPA
│   ├── repository/      # Repositories Spring Data
│   └── service/         # Lógica de negocio
├── db_data/             # Scripts y exportaciones SQL
└── pom.xml
```

### Frontend (`fake_blog_frontend/`)
```
├── public/assets/       # Imágenes y assets estáticos
├── src/
│   ├── components/      # Componentes React reutilizables
│   └── App.js           # Componente raíz + routing
└── package.json
```

## 🚀 Funcionalidades

- ✅ Autenticación de usuarios (registro, login)
- ✅ CRUD completo de publicaciones
- ✅ Sistema de comentarios y reacciones
- ✅ Búsqueda y filtrado
- ✅ Diseño responsive

## ▶️ Cómo Ejecutar

```bash
# Backend
cd fake_blog_backend && ./mvnw spring-boot:run

# Frontend  
cd fake_blog_frontend && npm install && npm start
```

---

> Proyecto Fullstack Java + React | **Yaco Cappelletti** 🇦🇷→🇪🇸
