# 0 - Uso de Markdown Architectural Decision Record

* Status: accepted 
* Deciders: Equipo de Arquitectura (Todos los desarrolladores del proyecto) 
* Date: 10/06/2025, 3:39:12 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Dada la naturaleza modular, evolutiva y distribuida del sistema, el equipo necesita un mecanismo formal y claro para registrar y justificar las decisiones arquitectónicas a lo largo del ciclo de vida del desarrollo.

## Context and Problem Statement

El sistema está compuesto por varios módulos (historial, recomendación, gestión de perfiles, mensajería, etc.) que se desarrollarán por distintos integrantes del equipo de forma concurrente. Muchas decisiones técnicas se están tomando sobre el stack, patrones arquitectónicos (DDD, Event-Driven, Micro Frontends, GraphQL Federation, etc.), integración de tecnologías externas, y arquitecturas desacopladas.

¿Cómo registrar, justificar, y comunicar eficazmente las decisiones arquitectónicas tomadas para que el equipo tenga trazabilidad, claridad y coherencia técnica a lo largo del proyecto?


## Decision Drivers 

* D01 - Integración de múltiples tecnologías y APIs externas (LinkedIn, GitHub, Firebase, etc.)
* D02 - Uso de arquitecturas desacopladas (Microservicios, Hexagonal, GraphQL Federation)
* D03 - Cambios frecuentes en decisiones técnicas debido a exploración y aprendizaje incremental
* D04 - Modularidad extrema por micro frontends y contextos DDD separados
* D05 - Necesidad de justificar decisiones técnicas ante docentes o audiencias evaluadoras
* D06 - Facilitar onboarding de nuevos integrantes

## Considered Options

* Opción 1: Usar ADRs en formato Markdown (como MADR) versionados junto al repositorio del código.
* Opción 2: No documentar las decisiones, solo comentarlas en reuniones.
* Opción 3: Usar herramientas de gestión externa como Google Docs o Notion para almacenar decisiones.

## Decision Outcome

Chosen option: "Usar ADRs en formato Markdown (como MADR)", porque permite versionar las decisiones junto con el código, da trazabilidad completa a los cambios técnicos y facilita la revisión y colaboración entre integrantes.

### Positive Consequences 

* Registro claro de las decisiones con sus motivaciones, alternativas consideradas y consecuencias.
* Mejora de la comunicación interna y externa del equipo.
* Justificación sólida para exámenes, entregables, revisiones docentes.
* Evita decisiones arbitrarias o repetidas.
* Escalable: se pueden registrar tantas decisiones como sea necesario.
* Se puede automatizar o estructurar con plantillas uniformes.

### Negative Consequences 

* Requiere disciplina del equipo para mantenerlos actualizados.
* Puede generar carga adicional si no se distribuyen bien las responsabilidades.
* No todos los miembros estarán inicialmente familiarizados con el formato.

## Pros and Cons of the Options 

### [ADRs en Markdown] 

Pros:
* Versionados junto al código (Git)
* Formato estructurado y claro
* Fácil revisión y trazabilidad

Cons:
* Requiere esfuerzo inicial en comprender el formato

### [Sin documentación formal]
Pros:
* Rápido, sin overhead

Cons:
* Altamente riesgoso, propenso a olvido

* No apto para equipos o proyectos complejos

### [Herramientas externas (Docs, Notion)]

* Accesible y visual
* Desacoplado del código fuente
* Menor trazabilidad de cambios técnicos
