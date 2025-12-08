# Tripleten web_project_around_express

1. Nombre del proyecto
   Alrededor de los EE. UU. - Backend Express

2. Descripción del proyecto y su funcionalidad
   Este proyecto es el backend de la aplicación "Alrededor de los EE. UU.". La funcionalidad principal incluye:

- Proveer una API REST para consultar la información de usuarios y tarjetas.
- Gestionar las rutas necesarias para obtener todos los usuarios, las tarjetas y un usuario por su ID.
- Responder con mensajes de error adecuados cuando no se encuentra un recurso solicitado.

3. Descripción de las tecnologías y técnicas utilizadas

- Node.js: Entorno de ejecución para JavaScript del lado del servidor.
- Express.js: Framework de servidor HTTP para crear la API de manera sencilla y modular.
- JavaScript (ES6+): Lenguaje principal para toda la lógica del backend.
- Módulo fs y path: Para la manipulación y acceso a archivos JSON con los datos simulados de usuarios y tarjetas.
- Modularización: Uso de rutas (routes/users.js y routes/cards.js) para mantener el código organizado y limpio.
- CORS: Implementado mediante el paquete npm cors para permitir solicitudes cruzadas desde aplicaciones frontend que corren en diferentes dominios o puertos.
- Linters y configuración de estilo: ESLint con la guía de estilos de Airbnb para asegurar un código consistente y libre de errores comunes.
- Hot reload: Uso de nodemon para facilitar el desarrollo y reiniciar el servidor automáticamente al detectar cambios en los archivos.

4. Imágenes del proyecto
   ![Users.js](<imagenes/Captura de pantalla 2025-10-16 a la(s) 5.46.10 p.m..png>)
   ![Respuesta positiva de users](<imagenes/Captura de pantalla 2025-10-16 a la(s) 5.46.00 p.m..png>)
   ![respuesta negativa](<imagenes/Captura de pantalla 2025-10-16 a la(s) 5.46.10 p.m..png>)

5. Video del proyecto: https://drive.google.com/file/d/1zMMpuUNWQvDJJtu5a6CoGxhMfBpFUDJU/view?usp=sharing
