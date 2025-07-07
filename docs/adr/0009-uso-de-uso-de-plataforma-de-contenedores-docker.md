# 9 - Uso de Uso de Plataforma de Contenedores Docker

* Status: accepted 
* Deciders: Equipo Backend 
* Date: 7/7/2025, 6:51:31 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Contenerización del backend y servicios auxiliares del sistema de bolsa de proyectos universitarios. 

## Context and Problem Statement

El sistema está compuesto por múltiples microservicios desarrollados en distintos lenguajes (Node.js, Python, Java), desplegados en entornos diversos (GCP, Firebase, Render), que necesitan garantizar consistencia en su entorno de ejecución, facilitar pruebas locales, integrarse en pipelines de CI/CD y simplificar la configuración de dependencias.

La pregunta es: ¿Cómo aseguramos una ejecución consistente, portable y escalable de los servicios del sistema?

## Decision Drivers 

* D01 — Integración de autenticación externa (OAuth 2.0, LinkedIn): requiere configuración uniforme de entornos
* D02 — Generación automática de candidatos para proyectos: se requiere despliegue distribuido y escalable
* D06 — Historial de proyectos: necesita persistencia segura y desacoplada
* D07 — Gestión modular del sistema (microservicios, microfrontends): requiere orquestación de múltiples procesos
* Escenarios de testing local y preproducción replicables
* Interoperabilidad entre módulos escritos en distintos lenguajes

## Considered Options

* Docker
* Máquinas virtuales (VMs) tradicionales
* Entornos de ejecución directos por lenguaje (node, pipenv, mvn, etc.)

## Decision Outcome

Chosen option: Chosen option: "Docker", porque es la solución más madura, multiplataforma y estandarizada para contenerizar microservicios heterogéneos, con fuerte adopción en entornos de nube como Google Cloud, Render o Heroku.

### Positive Consequences 

* Asegura entornos idénticos en desarrollo, testing y producción
* Simplifica el despliegue en GCP, Firebase y otros PaaS
* Compatible con herramientas modernas como Kubernetes o Docker Compose
* Mejora el versionado de dependencias y el debugging local
* Facilita la integración continua y el testing automatizado

### Negative Consequences 

* Curva de aprendizaje inicial para estudiantes sin experiencia en contenedores
* Tamaño del proyecto puede aumentar si no se optimizan imágenes
* Necesidad de diseñar una estrategia de persistencia externa a los contenedores
* Debe ser bien documentado para evitar entornos acoplados a máquinas locales

## Pros and Cons of the Options 

### [Docker]


* Bueno, porque proporciona aislamiento completo del entorno
* Bueno, porque se integra bien con cualquier servicio cloud moderno
* Bueno, porque es compatible con CI/CD y pipelines automáticos
* Malo, porque requiere aprender a escribir Dockerfiles óptimos
* Malo, porque puede volverse complejo en entornos multi-contenedor sin orquestador



### [Máquinas virtuales]

* Bueno, porque ofrece mayor control a bajo nivel
* Malo, porque consume más recursos
* Malo, porque no es portable entre entornos fácilmente
* Malo, porque dificulta el desarrollo colaborativo



### [Ejecución directa en entorno local]

* Bueno, porque es simple para desarrolladores novatos
* Malo, porque genera inconsistencias entre máquinas
* Malo, porque no escala ni permite automatización de despliegues
