#!/bin/bash

# Configurar backend
cd backend
npm install
node app.js &

# Configurar frontend
cd ../frontend
npm install
npm start