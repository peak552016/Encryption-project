# Hybrid Encryption API Service (NestJS)

A RESTful API service built with **NestJS** that provides secure data encryption and decryption using a **Hybrid Encryption** approach (AES-256-CBC + RSA).

## Features
- **Hybrid Encryption**: AES-256-CBC for data and RSA for key exchange.
- **Validation**: Payload length validation (up to 2,000 characters).
- **Swagger Documentation**: Automated API docs at `/api-docs`.
- **Unit Testing**: 100% test coverage for encryption logic.

## Prerequisites
- **Node.js**: v18 or v20
- **npm**: v9 or above

## Getting Started

### 1. Installation
```bash
npm install
```
2. Setup Environment Variables
Create a .env file in the root directory
*** Note: For the convenience of the reviewer, the .env file containing the necessary RSA keys has been included in this repository. The file includes:
```bash
PORT: Set to 3000 by default.
RSA_PRIVATE_KEY: Private key for encrypting the AES key.
RSA_PUBLIC_KEY: Public key for decrypting the AES key.
```

3. Running the App
```bash
# Development mode
npm run start

# Access Swagger UI
# http://localhost:3000/api-docs
```

4. Running Tests

```bash
npm run test
```

5. Test API Endpoints
- POST /get-encrypt-data: Returns data1 (Encrypted AES Key) and data2 (Encrypted Payload).

- POST /get-decrypt-data: Restores original payload from data1 and data2.

