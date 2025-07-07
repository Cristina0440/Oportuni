# 1 - Uso de Arquitectura Hexagonal

* Status: accepted
* Deciders: Equipo de Arquitectura (Todos los desarrolladores del proyecto)
* Date: /06/2025, 4:04:53 p. m.
* Template used: [MADR 3.0.0](https://adr.github.io/madr/)

Technical Story: El sistema se compone de múltiples módulos funcionales distribuidos y altamente desacoplados, integrados con APIs externas y requerimientos de escalabilidad y mantenibilidad. Se requiere una arquitectura que permita abstraer la lógica de negocio del resto de tecnologías y detalles de infraestructura.

## Context and Problem Statement

Nuestro proyecto tiene múltiples drivers arquitectónicos relacionados a modularidad, desacoplamiento, mantenibilidad y posibilidad de evolucionar independientemente cada módulo. Además, muchos módulos deben integrarse con APIs externas o utilizar diferentes tecnologías de acceso a datos.

¿Cómo desacoplamos la lógica de negocio del resto de tecnologías para que sea más fácil testear, extender, integrar y mantener cada módulo del sistema, sin que los cambios tecnológicos afecten el núcleo funcional?

## Decision Drivers

* D01 - Autenticación con LinkedIn → Se requiere aislar lógica de autenticación del proveedor externo.
* D02 - Recomendación de candidatos compatibles → Permite encapsular la lógica de matching como servicio de dominio.
* D06 - Formulario dinámico con autocompletado de skills → Aísla la lógica semántica del formulario respecto a cómo se persistirá o consumirá.
* D07 - Módulo de gestión e historial de proyectos → Permite manejar lógica de edición, archivado y visualización sin acoplarse a Firebase o interfaz.

## Considered Options

* Usar arquitectura hexagonal (Ports & Adapters)
* Arquitectura por capas tradicional
* Arquitectura cebolla
* No usar una arquitectura formal

## Decision Outcome

Opción seleccionada: Arquitectura Hexagonal (Ports & Adapters)
Porque permite desacoplar el dominio de las interfaces tecnológicas (APIs externas, bases de datos, controladores web), ofreciendo una solución más mantenible y escalable a largo plazo.

### Positive Consequences

* Alineado con DDD y Clean Architecture
* Favorece el testing de dominio puro
* Flexibilidad para cambiar base de datos, API o motor de búsqueda
* Cada módulo puede evolucionar independientemente

### Negative Consequences

* Requiere curva de aprendizaje y disciplina
* Mayor complejidad inicial en la estructura del proyecto


## Pros and Cons of the Options

### [Hexagonal Architecture]

Pros:
* GDesacopla dominio de infraestructura
* Testeable, mantenible, escalable

Cons:
* Mayor esfuerzo inicial

### [Arquitectura por Capas]

Pros:
* Simple y conocida

Cons:
* Tendencia al acoplamiento tecnológico
* Testing más complejo

