# Interactive Screen

Prueba de concepto sencilla para cambiar en tiempo real el color y el texto de una pantalla desde otro dispositivo. El proyecto usa Node.js, Express, Socket.IO y JavaScript vanilla.

El servidor conserva el último color y texto seleccionados en memoria. Por eso, si se recarga o se abre una nueva pantalla mientras el servidor sigue encendido, recibirá automáticamente ambos valores. Al reiniciar el servidor, el color vuelve a blanco y el texto queda vacío.

## Requisitos

Necesitas Node.js 18 o una versión posterior. Si todavía no lo tienes:

1. Visita [nodejs.org](https://nodejs.org/).
2. Descarga la versión LTS recomendada para tu sistema operativo.
3. Ejecuta el instalador y acepta las opciones predeterminadas.
4. Abre una terminal nueva y comprueba la instalación:

   ```bash
   node --version
   npm --version
   ```

## Instalación

Desde la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

## Arrancar el proyecto

```bash
npm start
```

El servidor quedará escuchando en el puerto `3000` y aceptará conexiones desde otros dispositivos de la red local.

## Abrir las interfaces

En el ordenador que ejecuta el servidor:

- Pantalla: [http://localhost:3000/screen](http://localhost:3000/screen)
- Controlador: [http://localhost:3000/control](http://localhost:3000/control)

Puedes abrir ambas direcciones en dos pestañas para hacer una prueba rápida.

## Probar desde otro dispositivo en la misma Wi-Fi

Primero averigua la IP local del ordenador que ejecuta el servidor.

### macOS

En Ajustes del Sistema, abre **Wi-Fi**, entra en los detalles de la red conectada y busca **Dirección IP**. También puedes ejecutar:

```bash
ipconfig getifaddr en0
```

### Windows

Abre Símbolo del sistema y ejecuta:

```powershell
ipconfig
```

Busca la dirección **IPv4** del adaptador Wi-Fi.

### Linux

Abre una terminal y ejecuta:

```bash
hostname -I
```

Con ambos dispositivos conectados a la misma red Wi-Fi, sustituye `192.168.X.X` por esa IP:

```text
http://192.168.X.X:3000/screen
http://192.168.X.X:3000/control
```

Por ejemplo, puedes dejar `/screen` abierto en el ordenador conectado al proyector y abrir `/control` en el móvil.

Si el móvil no consigue conectarse, comprueba que el firewall del ordenador permite conexiones entrantes para Node.js y que la red Wi-Fi no tiene activado el aislamiento entre dispositivos.

## Estructura

```text
interactive-screen/
├── package.json
├── server.js
├── README.md
└── public/
    ├── screen.html
    ├── control.html
    ├── css/
    │   ├── screen.css
    │   └── control.css
    └── js/
        ├── screen.js
        └── control.js
```
