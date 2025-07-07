# 3 - Uso de GraphQL Federation

* Status: accepted 
* Deciders: Equipo de Arquitectura 
* Date: 12/06/2025, 4:47:33 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: El sistema posee múltiples servicios desacoplados, cada uno con su propio modelo de datos. Se requiere una forma unificada y eficiente para que el frontend consuma datos de estos servicios, sin acoplarse directamente a cada uno. 

## Context and Problem Statement

Dado que el sistema se basa en microservicios y micro frontends, el frontend necesita consumir datos desde múltiples fuentes (usuarios, proyectos, recomendaciones, historial, etc.). La agregación de datos vía REST llevaría a múltiples round-trips, lógica de agregación en el cliente y duplicación de lógica. Se necesita una solución que permita federar los esquemas y ofrecer una única fuente de consulta flexible.

## Decision Drivers 

* D01 - Autenticación con LinkedIn y extracción de perfil → Requiere exponer datos de usuario de forma segura y desacoplada del módulo de autenticación.
* D02 - Recomendación de candidatos compatibles → Permite consultar usuarios y proyectos de forma cruzada sin acoplar módulos.
* D04 - Visualización estructurada de perfiles compatibles → Necesita datos enriquecidos de múltiples fuentes en una sola consulta eficiente.
* D07 - Gestión de proyectos e historial → Permite acceder a datos combinados de proyectos y usuarios en una única consulta.

## Considered Options

* GraphQL Federation (Apollo Gateway + Subgraphs)
* REST APIs por módulo + agregación manual en frontend
* GraphQL centralizado (sin federation)
* Backend for Frontend (BFF) por módulo

## Decision Outcome

Chosen option: GraphQL Federation (Apollo Gateway + Subgraphs)
Porque permite federar múltiples GraphQL APIs en un solo esquema compuesto, manteniendo autonomía por módulo, pero con una experiencia unificada para el consumidor (frontend).

### Positive Consequences 

* Los módulos siguen siendo autónomos y desacoplados
* Los frontends pueden consultar múltiples dominios en una sola petición
* Evita lógica de agregación en el frontend
* Escalable a futuro con nuevos módulos o servicios

### Negative Consequences 

* Requiere configuración y mantenimiento de gateway Apollo
* Es necesario definir resolvers de referencia entre módulos
* Mayor complejidad inicial de setup que REST

## Pros and Cons of the Options 

### [GraphQL Federation]

Pros:
* Consulta unificada desde múltiples módulos
* Excelente para microservicios o micro frontends
* Bajo acoplamiento, alta cohesión

Cons:
* Setup y debugging más complejos
* Curva de aprendizaje para federación y esquemas extendidos

### [REST + agregación en frontend]

Pros:
* REST + agregación en frontend

Cons:
* Lógica repetida en clientes
* Mayor número de requests y latencia

### [GraphQL centralizado]

Pros:
* Fácil de consumir

Cons:
* No respeta independencia de equipos/modularidad
* Aumenta acoplamiento e interdependencias

## Links 

* https://www.apollographql.com/docs/federation/
