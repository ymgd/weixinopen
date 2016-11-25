# template - vue2

> just easy start

## Usage

```
npm i -g vue-cli

vue init dingyiming/template#vue2 projectname
```

## directory structure

```
+ client/   // spa source code directory
  + build/ // webpack config
    - base.js // webpack base config
    - dev.js  // development config
    - prod.js // production config
    - osx.js  // mac osx  with webpack-dashboard developentment
  + src/   // spa source code
    + assets/  // source directory .e.g. css/ img/ js/ ...
    + components/ // .vue components
      - CompA.vue
    + views/      // app pages
      - Home.vue
    - App.vue   // vue spa root component
    - main.js   // spa entry
    - router.js  // spa routing 
  - index.html   // spa template
  - package.json  // spa npm dependencies
+ public/   // static source directory for productionment
+ server/     // server source code directory
  + router/   // server routing
    - index.js  // default server routing
- .gitignore  // git ignore file
- app.js  // app entry for productionment
- Dockerfile // app deploy by docker
- README.MD  // just me
```