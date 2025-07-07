# 2 - Uso de Microfrontends

* Status: accepted
* Deciders: Equipo Frontend
* Date: 7/7/2025, 4:13:23 p. m.
* Template used: [MADR 3.0.0](https://adr.github.io/madr/)

Technical Story: El frontend del sistema incluye múltiples módulos funcionales (recomendaciones, mensajería, historial, formularios, perfiles, etc.) que serán desarrollados por distintos equipos. Se necesita una solución que permita desacoplamiento, despliegue independiente y escalabilidad.

## Context and Problem Statement

El sistema frontend está dividido en múltiples módulos funcionales que cambian con distinta frecuencia, son responsabilidad de equipos distintos y evolucionan de forma desacoplada. Es necesario que estos módulos puedan desarrollarse, desplegarse y mantenerse de forma independiente, sin comprometer la cohesión visual ni funcional del sistema.

## Decision Drivers

* D02 - Recomendación de candidatos compatibles → Permite actualizar o experimentar con el UI del motor de recomendaciones sin afectar otros módulos.
* D06 - Formulario dinámico → Evoluciona de forma constante, requiere despliegue y pruebas separadas del resto del sistema.
* D07 - Gestión e historial de proyectos → Tiene lógica de visualización compleja y específica, que no debe acoplarse a otros módulos como mensajería o autenticación.

## Considered Options

* Implementar Micro Frontends (con Module Federation o Web Components)
* Frontend monolítico con React SPA tradicional
* Monolito desacoplado con rutas por módulos

## Decision Outcome

Chosen option: Micro Frontends con Webpack Module Federation
Porque permite segmentar el sistema en apps independientes, manteniendo integración controlada en un "host". Esto permite a cada equipo trabajar con su propio stack, control de versiones y ciclo de vida.

### Positive Consequences

* Permite despliegue independiente de cada módulo frontend
* Favorece la autonomía de los equipos de desarrollo
* Escalabilidad futura sin necesidad de refactor global
* Alineado a la arquitectura desacoplada definida

### Negative Consequences

* Mayor complejidad en la configuración inicial (Webpack, rutas, host-remotes)
* Posibles problemas de compatibilidad entre versiones de librerías compartidas

## Pros and Cons of the Options

### [Micro Frontends]

Pros:
* Independencia total de desarrollo y despliegue
*  Encapsulamiento y desacoplamiento de código
* Facilita refactor progresivo o cambios tecnológicos

Cons:
*  Curva de aprendizaje
*  Necesidad de integración y testing cruzado

### [SPA Monolítica]

Pros: 
* Fácil de implementar y mantener inicialmente

Cons:
* Escalabilidad limitada
* Cambios pequeños pueden romper módulos no relacionados
