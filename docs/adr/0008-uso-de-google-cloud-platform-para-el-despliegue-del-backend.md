# 8 - Uso de Google Cloud Platform para el despliegue del backend

* Status: accepted 
* Deciders: Equipo Backend 
* Date: 04/7/2025, 6:39:58 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Elección del entorno de despliegue para microservicios backend del sistema de bolsa de proyectos universitarios. 

## Context and Problem Statement

El proyecto requiere desplegar múltiples microservicios backend desarrollados en tecnologías como Node.js, Spring Boot y Flask, con distintas necesidades de escalabilidad, disponibilidad y conectividad externa. Se necesita una plataforma flexible, escalable y con buena integración a otras herramientas del ecosistema (bases de datos, colas de mensajes, almacenamiento, etc.).

La pregunta es: ¿Dónde y cómo desplegamos de manera confiable nuestro backend desacoplado?

## Decision Drivers 

* Driver D01: Autenticación con GitHub y extracción automática del perfil → Requiere conectividad segura y disponibilidad constante.
* Driver D02: Generación automática de candidatos compatibles para un proyecto → Carga computacional variable, requiere elasticidad.
* Necesidad de integrar bases de datos (MongoDB, PostgreSQL), Firebase.
* Compatibilidad con contenedores Docker.
* Escalabilidad y despliegue independiente por microservicio.

## Considered Options

* Google Cloud Platform (GCP) usando Cloud Run, App Engine y GKE
* AWS con ECS o Lambda
* Heroku

## Decision Outcome

Chosen option: "Google Cloud Platform (GCP)", porque ofrece una integración muy completa con herramientas modernas de despliegue y monitoreo, facilita el despliegue de contenedores Docker, soporta múltiples entornos (Cloud Run, App Engine, GKE) y se adapta bien a microservicios.

### Positive Consequences 

* Alta disponibilidad y escalabilidad automática con Cloud Run o GKE.
* Integración directa con bases de datos como Firestore, MongoDB Atlas o Cloud SQL.
* Despliegue rápido y eficiente usando pipelines CI/CD de GitHub Actions o Cloud Build.
* Buen soporte de seguridad (IAM, VPCs, OAuth 2.0).
* Es posible hacer pruebas gratis y pagar solo por consumo.

### Negative Consequences 

* Requiere configurar facturación con tarjeta incluso para cuenta gratuita
* Curva de aprendizaje inicial para servicios como IAM, redes y VPC
* Algunos servicios pueden generar cargos inesperados si no se monitoriza correctamente

## Pros and Cons of the Options 

### [Google Cloud Platform (GCP)]
 

* Bueno, porque soporta contenedores y despliegue sin servidor (serverless)
* Bueno, porque se integra con herramientas que ya usamos (Firebase, Firestore)
* Bueno, porque permite crear pipelines de CI/CD fácilmente
* Malo, porque puede ser complejo al inicio
* Malo, porque algunos servicios tienen costos poco intuitivos si se escalan

### [Amazon Web Services (AWS)]

* Bueno, porque es muy robusto y ampliamente adoptado
* Bueno, porque tiene servicios como Lambda y Fargate para desacoplar tareas
* Malo, porque es más complejo que GCP para principiantes
* Malo, porque su sistema de permisos (IAM) es más difícil de configurar correctamente



### [Heroku]

* Bueno, porque es muy fácil de configurar
* Bueno, porque permite despliegues desde Git en segundos
* Malo, porque ya no tiene plan gratuito
* Malo, porque no escala bien en arquitecturas con microservicios

