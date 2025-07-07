# 7 - Uso Firebase

* Status: accepted 
* Deciders: Equipo de Desarrollo Frontend 
* Date: 02/7/2025, 6:25:29 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Se requiere una plataforma de despliegue eficiente, escalable y fácil de integrar para los distintos micro frontends desarrollados en React (con Vite), con soporte para SPA, CDN global, y HTTPS automático. 

## Context and Problem Statement

El proyecto implementa una arquitectura de micro frontends basada en React, desplegados de forma separada e independiente. Se busca una solución de despliegue que:

Permita publicar fácilmente aplicaciones estáticas (SPA/MFE).

Sea simple de usar sin requerir DevOps complejo.

Ofrezca buena integración con herramientas CI/CD y control de versiones.

Ofrezca HTTPS, CDN y buen tiempo de carga sin configuración adicional.

La pregunta clave: ¿Qué plataforma permite desplegar de forma eficiente y sin complicaciones nuestros micro frontends y el host?

## Decision Drivers 

* D03 – Visualización estructurada de perfiles compatibles: requiere carga rápida desde el cliente.
* D06 – Gestión de historial y proyectos: maneja SPAs con múltiples rutas.
* RNF-07 – Escalabilidad y facilidad de despliegue: se desea un flujo CI/CD simple.
* RNF-10 – Modularidad y mantenibilidad: cada microfrontend debe poder desplegarse de forma autónoma.


## Considered Options

* Firebase Hosting
* Vercel
* Netlify
* GitHub Pages
* Render (static hosting)

## Decision Outcome

Firebase Hosting, porque ofrece una solución optimizada para aplicaciones SPA y micro frontends estáticos, con despliegue sencillo mediante CLI, integración directa con GitHub Actions y soporte para reglas de rutas personalizadas.

### Positive Consequences 

* Despliegue inmediato mediante firebase deploy.
* CDN global incluido por defecto.
* HTTPS automático, reglas de redirección y cacheo.
* Fácil integración con CI/CD y múltiples entornos (staging, producción).
* Costo bajo (generoso plan gratuito).

### Negative Consequences 

* No permite lógica de backend (solo frontend estático).
* Si se escalan múltiples micro frontends, puede requerir múltiples proyectos de Firebase o carpetas configuradas individualmente.

## Pros and Cons of the Options 

### [Vercel]
Pros: 
* Excelente para React/Next.js.

Cons:
* Optimizado para SSR (no se usará en este caso).
* Límite de uso más bajo en plan gratuito que Firebase.]


### [Firebase Hosting]
Pros:
* Soporte nativo para SPA.
* CDN global, rápido y confiable.
* CLI muy simple de usar.

Cons:
* Solo hospeda contenido estático (sin backend nativo).
