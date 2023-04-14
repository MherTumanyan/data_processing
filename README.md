# Data Processing Application

This repository contains a Node.js application for data processing.

## Prerequisites

Before you can run the code, you need to install the following:

- Node.js: This application requires Node.js version 14 or higher.
- PostgreSQL: This application requires a PostgreSQL database to store the data.
- PM2: This application uses PM2 to manage the Node.js processes.

## Installation

To install the dependencies, run the following command:
- yarn (or npm install)

## Configuration

Before you can run the code, you need to configure the application. To do this, create a `.env` file in the root of the project by copying the `.env.example` file and setting the required values.
- cp .env.example .env

Then open the `.env` file and set the required values for the environment variables.

## Running the Application

To run the application with a single instance, run the following command:

- yarn start(or npm start)

To run the application with two instances using PM2, simply run the following command:
- pm2 start pm2.yaml && pm2 log






