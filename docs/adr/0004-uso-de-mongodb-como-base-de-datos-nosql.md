# 4 - Uso de MongoDB como base de datos NoSQL

* Status: accepted 
* Deciders: Equipo de Backend 
* Date: 18/06/2025, 5:04:52 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Algunos módulos del sistema requieren almacenamiento flexible de documentos con estructuras que pueden variar según el contexto, como los perfiles de usuario o las descripciones personalizadas de proyectos. Se necesita una solución de persistencia orientada a documentos. 

## Context and Problem Statement

El sistema maneja información semiestructurada, como perfiles con listas de habilidades, trayectorias académicas y experiencias laborales, que pueden variar en formato según el usuario. Además, los proyectos creados tienen requisitos y tecnologías diversas, lo que requiere una estructura flexible para modelar estos datos.

¿Cómo podemos persistir este tipo de información compleja y variable de manera eficiente, sin las restricciones rígidas de un modelo relacional?

## Decision Drivers 

* D01 – Autenticación con LinkedIn y extracción automática del perfil → Información anidada como educación, skills y experiencia profesional requieren estructura flexible.
* D04 – Visualización estructurada de perfiles compatibles con indicadores de compatibilidad → Requiere acceso eficiente a documentos enriquecidos y búsquedas por atributos.
* D06 – Formulario dinámico y autocompletar skills del formulario del proyecto → Necesidad de modelar campos variables según el tipo de proyecto y requerimientos particulares.

## Considered Options

* MongoDB (NoSQL orientado a documentos)
* PostgreSQL (relacional con soporte para JSONB)

## Decision Outcome

Chosen option: MongoDB, porque permite almacenar documentos con esquemas dinámicos, modelar listas complejas y anidamientos, y realizar consultas eficientes mediante índices. Es especialmente útil para los módulos que gestionan perfiles enriquecidos y requisitos flexibles de proyectos.

### Positive Consequences 

* Alta flexibilidad para representar datos que no siguen una estructura rígida.
* Excelente integración con backend en Node.js y Python.
* Escalabilidad horizontal para crecimiento del sistema.
* Soporte nativo para operaciones de agregación y búsqueda compleja.



### Negative Consequences 

* No soporta relaciones complejas entre entidades como un sistema relacional.
* Mayor esfuerzo inicial para definir buenas prácticas de modelado documental.
* Requiere diseño cuidadoso de índices para mantener el rendimiento.


## Pros and Cons of the Options 

### [MongoDB]

Pros:
* Muy flexible para estructuras cambiantes (documentos, listas anidadas).
* Alta compatibilidad con ecosistemas modernos (MERN, Python, Docker).
* Operaciones de lectura/escritura optimizadas.

Cons:
* No ideal para relaciones complejas entre entidades.
* Necesidad de controlar bien la estructura del documento para evitar inconsistencias.

### [PostgreSQL (JSONB)]

Pros:
* Conserva ventajas relacionales y permite campos semiestructurados.

Cons:
* Más rigidez, no está pensado para almacenar documentos complejos de forma principal.
* Agregaciones sobre JSONB más pesadas que en MongoDB.



## Links 

* https://www.mongodb.com/docs/