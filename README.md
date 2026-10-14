# API de Esports - Roster & Jugadores 

API REST desarrollada en **Node.js** utilizando **Express** y **Sequelize (MySQL)**, con documentación interactiva integrada mediante **Swagger (OpenAPI 3.0)**. Permite la gestión completa de jugadores, equipos (rosters) y sus asignaciones correspondientes.

---
## Requisitos 
Asegúrate de tener instalado en tu equipo:
* **Node.js** (Versión 18 o superior recomendada)
* **pnpm** (Gestor de paquetes rápido, recomendado) o npm
* **MySQL** (Servidor de base de datos local o remoto)

---

##  Instrucciones de Instalación

1. **Clonar o abrir el repositorio** en tu entorno de desarrollo.

2. **Instalar las dependencias** ejecutando el siguiente comando en el proyecto:
   ```bash
   pnpm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto y define las credenciales de tu base de datos MySQL:
   ```env
   PORT=3000
   DB_NAME=nombre_de_tu_base_de_datos
   DB_USER=tu_usuario_mysql
   DB_PASSWORD=tu_contraseña_mysql
   DB_HOST=localhost
   DB_DIALECT=mysql
   ```

---

## 🚀 Uso y Ejecución

### 1. Iniciar el servidor en modo desarrollo
Para poner en marcha la API, ejecuta:
```bash
node app.js
```
Verás un mensaje en la consola indicando que el servidor está activo:
```text
Servidor corriendo en el puerto 3000
 Documentación disponible en http://localhost:3000/docs
```

### 2. Acceder a la Documentación Interactiva (Swagger)
Abre tu navegador web preferido y dirígete a:
 **`http://localhost:3000/docs`**

Desde ahí podrás visualizar todos los endpoints agrupados por categorías (`Auxiliares`, `Jugadores`, `Rosters` y `Asignaciones`), consultar sus esquemas y realizar peticiones en tiempo real.

---

##  Endpoints Principales Disponibles

* **Auxiliares:** `GET /api/v1/roles`, `GET /api/v1/estados`, `GET /api/v1/tipos-roster`, `GET /api/v1/health`
* **Jugadores:** `GET /api/v1/jugadores`, `POST /api/v1/jugadores`, `GET /api/v1/jugadores/buscar`, `GET/PUT/DELETE /api/v1/jugadores/:id`
* **Rosters y Asignaciones:** `GET/POST /api/v1/rosters`, `GET/PUT/DELETE /api/v1/rosters/:id`, gestión de jugadores en rosters a través de `/api/v1/rosters/:id/jugadores`.