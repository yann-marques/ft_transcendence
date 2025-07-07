#!/bin/bash

echo "Lancement de l'app..."

#rm -rf node_modules
npm rebuild --save -g sqlite3
npm install --save -g typescript
npm install --save -g tailwindcss @tailwindcss/postcss @tailwindcss/cli
npm install --save -g concurrently
npm install --save @fastify/cookie

npm install --save babylonjs babylonjs-materials
#RUN npm install --save babylonjs babylonjs/core babylonjs/materials

npm install
exec npm run start