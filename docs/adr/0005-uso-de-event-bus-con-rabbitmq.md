# 5 - Uso de Event Bus con RabbitMQ

* Status: deprecated 
* Deciders: Equipo de Arquitectura (Todo el equipo de Desarrollo) 
* Date: 20/06/2025, 5:36:39 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story: Se requiere una solución de comunicación asincrónica entre los distintos módulos distribuidos del sistema para desacoplarlos y permitir la propagación eficiente de eventos de dominio. 

## Context and Problem Statement

La plataforma está construida con una arquitectura de microservicios y micro frontends, lo que implica que distintos módulos (como gestión de proyectos, notificaciones, recomendador, historial) necesitan comunicarse entre sí.
¿Cómo podemos permitir esta comunicación sin acoplar directamente los servicios, manteniendo flexibilidad, resiliencia y escalabilidad ante cambios futuros?

## Decision Drivers 

* D03 – Recomendación de proyectos y perfiles según compatibilidad → Necesita reaccionar a eventos como la creación o edición de un proyecto.
* D06 – Gestión de historial de proyectos creados y participaciones → Debe registrar eventos como cambios de estado, cierres de proyectos o aceptación de convocatorias.
* D07 – Gestión de proyectos con lógica de aceptación de perfiles → Debe emitir eventos para enviar notificaciones o actualizar vistas en otros módulos.

## Considered Options

* RabbitMQ como Event Bus (Broker de mensajes AMQP)
* Apache Kafka
* Firebase Cloud Messaging (FCM)
* Comunicación síncrona vía REST / GraphQL


## Decision Outcome

RabbitMQ como Event Bus, porque permite comunicación asincrónica y desacoplada mediante publicación y suscripción de eventos, lo que habilita una arquitectura event-driven. Es robusto, soporta patrones complejos de routing, y tiene un ecosistema maduro.


### Positive Consequences 

* Desacoplamiento entre servicios emisores y consumidores de eventos.
* Permite escalar componentes de forma independiente.
* Simplifica la lógica de propagación de notificaciones y actualizaciones.
* Mejora la trazabilidad de eventos mediante colas durables.


### Negative Consequences 

* Mayor complejidad en el despliegue (requiere infraestructura para el broker).
* Necesidad de gestión de errores y reintentos ante fallos.
* Requiere monitoreo activo y testing especializado en eventos.

## Pros and Cons of the Options 

### [RabbitMQ]
Pros:
* Soporte robusto para colas, routing, confirmaciones, reintentos.
* Fácil integración con lenguajes usados en el proyecto (Node.js, Python, Spring Boot).
* Orientado a eventos de dominio (sin necesidad de transmisión en tiempo real como Kafka).

Cons:
* Infraestructura adicional.
* Mayor complejidad inicial en la configuración de consumidores/producers.

### [Apache Kafka]

Pros:
* Ideal para grandes volúmenes de eventos y persistencia histórica.

Cons:
* Sobredimensionado para este caso de uso; más difícil de operar.

### [Firebase Cloud Messaging]

Pros:
* Ideal para notificaciones móviles en tiempo real.

Cons:
* No es un Event Bus, no permite persistencia ni enrutamiento complejo.

## Links 

* https://www.rabbitmq.com/documentation.html