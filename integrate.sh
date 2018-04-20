#!/bin/bash

# Integrate frontend with backend script

npm run build
cd src/semantic
gulp build
cd ../..
gulp compress
rm -r dist/css/components
cp -r dist/* ../backend/market/static
cp -r dist/* ../backend/market/assets
