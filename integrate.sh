#!/bin/bash

# Integrate frontend with backend script

npm run build
cd src/semantic
gulp build
cd ../..
gulp compress
cp -r dist/* ../backend/market/static
cp -r dist/* ../backend/market/assets
