# Heredity MVP

**Heredity MVP** es una aplicación descentralizada (dApp) que utiliza contratos inteligentes escritos en Solidity y una interfaz web construida con Vite y Tailwind CSS. Este proyecto permite compilar, desplegar y probar contratos inteligentes localmente, así como interactuar con ellos a través de una interfaz de usuario intuitiva.

Demo:
![demo](media/heredity-demo.gif)

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
**No se debe cerrar la consola hasta finalizada la sesión**


### Desplegar los contratos localmente

Para desplegar los contratos en el nodo local ejecutar el comando en una consola nueva:

```bash
npm run deploy:local
```



### Iniciar la interfaz de usuario

Para iniciar la aplicación frontend:

```bash
npm run dev
```

## Paso a paso para lanzar la APP en local

1. Dar click en el botón de "Comenzar Ahora"
2. Ingresar en MetaMask(Se debe tener una cuenta creada)
3. En MetaMask, dar click en el boton de la esquina superior izquierda "Ethereum Mainnet"
4. Luego, hacer click en el botón "Add a custom network"
5. Ingresar los campos pedidos, y dar en guardar:
   - Nombre de la red: avalanchelocal
   - Default RCP URL: http://127.0.0.1:8545
   - Identificador de cadena: Id de la cadena
   - Simbolo de moneda: AVAX
7. Volver a ingresar a "Ethereum Mainnet" y seleccionar la red de prueba local "avalanchelocal"
8. En la página, dar click a "Conectar Wallet" ó "Conectar Wallet para Comenzar"
9. Agrega una cuenta de un nodo local de prueba con su clave privada

Ahora, estas habilitado para crear testamentos digitales en Heredity

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

## Autores
- [Juan Camilo Alzate Bedoya](https://github.com/11JuanK11)
- [Sara Castañeda Echeverri](https://github.com/Saraccee25)
- [Alejandro Londoño Gomez](https://github.com/slydragonn)
- [Sara Carolina Sánchez Arroyave](https://github.com/Caro-26S)
