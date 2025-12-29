Hybrid Encryption API Service (NestJS)
This project is a RESTful API service built with NestJS that provides secure data encryption and decryption using a Hybrid Encryption approach (combining AES-256-CBC and RSA).

🛠 Features
Hybrid Encryption: Encrypts data with a randomly generated AES key, then secures that key with an RSA private key.

Hybrid Decryption: Retrieves the AES key using an RSA public key and then restores the original payload.

Swagger Documentation: Automated API documentation accessible via /api-docs.

Unit Testing: Fully tested service logic ensuring encryption/decryption integrity.

Prerequisites
Node.js (Recommended version: 18.x or 20.x)

npm or yarn

Getting Started
1. Installation
Install the project dependencies:

Bash

npm install
2. Environment Configuration
Create a .env file in the root directory and add your RSA keys generated from cryptotools.net/rsagen:

ข้อมูลโค้ด

PORT=3000
RSA_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nYourKeyHere\n-----END RSA PRIVATE KEY-----"
RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nYourKeyHere\n-----END PUBLIC KEY-----"
Note: Ensure the keys are wrapped in quotes and use \n for new lines to be parsed correctly.

3. Running the Service
Start the NestJS application:

Bash

npm run start
The server will be running at http://localhost:3000.

4. API Documentation
Access the Swagger UI to view and test the API endpoints:

URL: http://localhost:3000/api-docs

Running Tests
Execute the unit tests to verify the encryption service logic:

Bash

npm run test
Project Structure
src/: Contains the main application code (Controller, Service, DTO, Module).

test/: Contains the unit test files (encryption.spec.ts).

.env: Environment variables and RSA keys.
