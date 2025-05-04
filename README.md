# Heredity MVP

**Heredity MVP** es una aplicación descentralizada (dApp) que utiliza contratos inteligentes escritos en Solidity y una interfaz web construida con Vite y Tailwind CSS. Este proyecto permite compilar, desplegar y probar contratos inteligentes localmente, así como interactuar con ellos a través de una interfaz de usuario intuitiva.

## Características

* Contratos inteligentes desarrollados en Solidity.
* Entorno de desarrollo y despliegue local utilizando Hardhat.
* Interfaz de usuario construida con Vite y estilizada con Tailwind CSS.
* Scripts automatizados para compilar, desplegar y ejecutar la aplicación.

## Requisitos

* [Node.js](https://nodejs.org/) (versión recomendada: 16.x o superior)
* [npm](https://www.npmjs.com/) (gestor de paquetes)
* [Hardhat](https://hardhat.org/) (para el entorno de desarrollo de contratos inteligentes)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/slydragonn/heredity-mvp.git
   cd heredity-mvp
   ```



2. Instala las dependencias:

   ```bash
   npm install
   ```



## Uso

### Compilar los contratos

Para compilar los contratos inteligentes:

```bash
npm run compile
```



### Iniciar el nodo local

Para iniciar un nodo local de Hardhat:

```bash
npm run node
```



### Desplegar los contratos localmente

Para desplegar los contratos en el nodo local:

```bash
npm run deploy:local
```



### Iniciar la interfaz de usuario

Para iniciar la aplicación frontend:

```bash
npm run dev
```



## Estructura del proyecto

* `contracts/`: Contiene los contratos inteligentes en Solidity.
* `scripts/`: Scripts para desplegar y gestionar los contratos.
* `src/`: Código fuente del frontend de la aplicación.
* `index.html`: Archivo HTML principal de la aplicación.
* `hardhat.config.js`: Configuración de Hardhat para el entorno de desarrollo.
* `vite.config.js`: Configuración de Vite para el frontend.
* `tailwind.config.js`: Configuración de Tailwind CSS.

## Licencia

Este proyecto no especifica una licencia. Por favor, consulta con los autores antes de utilizarlo en producción.
