#!/bin/bash

# Integrate frontend with backend script

npm run build
cd src/semantic
gulp build
cd ../..
cp -r dist/css ../backend/market/assets