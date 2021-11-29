# Frontend

## Aplicaciones que tenemos que tener pre instaladas

- GIT
- NODE (8.16) y NPM

## Como buildear la aplicacion

Crear una carpeta donde buildear la aplicacion con `mkdir` y nos movemos a esa carpeta.

Luego descargamos el repositorio de la aplicacion frontend. Tenemos que tener git instalado con SSH configurado. Hacemos:
```
git clone git@github.com:fiuba-tpprof2019-araya-vicario/react-frontend.git
```

Nos movemos a la carpeta del repositorio, luego hacemos:
```
cd react-frontend
npm ci
npm run build
cd build
```

Ahora en la carpeta build esta el transpilado de toda la aplicacion frontend para poder ejecutar la aplicacion o servirla con nginx o apache.

El archivo principal es `index.html`.


