# 6 - Uso de React + Vite

* Status: accepted 
* Deciders: Equipo de Desarrollo Frontend  
* Date: 24/06/2025, 5:59:26 p. m. 
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) 

Technical Story:  Selección del stack de desarrollo frontend base sobre el cual se implementarán los micro frontends del sistema de bolsa de proyectos, que requieren alta modularidad, velocidad de desarrollo y soporte para arquitectura desacoplada. 

## Context and Problem Statement

Dado que el sistema será dividido en múltiples micro frontends, necesitamos un framework y herramienta de construcción frontend moderna que ofrezca buen rendimiento de desarrollo, sea compatible con GraphQL (Apollo)y sea fácilmente integrable con Module Federation.

## Decision Drivers 

* D01 – Autenticación e integración con LinkedIn: Requiere una interfaz amigable y responsiva para login e interacción con formularios.
* D03 – Visualización estructurada de perfiles compatibles: Necesita renderizado dinámico, visualizaciones con gráficos y experiencia fluida.
* D06 – Gestión e historial de proyectos: Interfaz compleja, necesita formularios, tablas y vistas interactivas.
* RNF-10 – Modularidad y mantenibilidad: Cada módulo frontend debe poder evolucionar de forma independiente.

## Considered Options

* React + Vite
* React + CRA (Create React App)
* Angular

## Decision Outcome

React + Vite, porque combina la potencia del ecosistema React con la velocidad y simplicidad de Vite como bundler moderno. Facilita la creación de interfaces desacopladas, modulares y escalables, además de integrarse sin fricción con Webpack 5 Module Federation.

### Positive Consequences 

* Tiempo de carga en desarrollo extremadamente bajo gracias a Vite.
* Integración directa con GraphQL (Apollo Client), React Router, y Tailwind.
* Permite separación por micro frontends.
* Comunidad madura, muchos recursos disponibles y soporte amplio.

### Negative Consequences 

* Vite aún requiere ajustes específicos para integrarse con Module Federation (aunque hay soluciones).
* Requiere configuración extra si se quieren integrar otros frameworks (Angular, Vue) dentro del mismo host.

## Pros and Cons of the Options 

### [React + Vite]

Pros:
* Ecosistema maduro (React) + herramientas modernas (Vite).
* Velocidad de desarrollo superior.
* Compatible con HMR, TypeScript, GraphQL y Webpack.

Cons:
* Requiere plugins/community tools para federation avanzada.


### [React + CRA]

Pros:
* Fácil de iniciar, soporte oficial.

Cons:
*  Muy lento en builds grandes, no recomendado para micro frontends.

### [Angular]

Pros:
* Buen soporte empresarial.

Cons:
*  Curva de aprendizaje alta, estructura pesada, menos flexible en MFEs.

## Links 

* https://vitejs.dev/
* https://react.dev/
* [ADR relacionado – Uso de Micro Frontends con Vite Module Feredation]
* [ADR relacionado – GraphQL Federation con Apollo Client]