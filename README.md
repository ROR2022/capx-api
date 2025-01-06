# Portfolio Tracker Application API - CapX Challenge

The Portfolio Tracker application is designed to help users manage their stock holdings effectively. It allows users to add, view, edit, and delete stocks, track their portfolio value based on real-time stock prices, and view key portfolio metrics on a dashboard.

- [Try it](https://capx-front.vercel.app/)
- [Links](https://docs.google.com/document/d/1WsfyQxGrkp2mK2MZg-u3Lgr36M446Y3kmOGsHnsBdYY/edit?usp=sharing)

## Technologies Used

- Nest.js: The main framework used for backend development.
- TypeScript: Programming language with strong typing for better code quality.
- MongoDB: NoSQL database for data storage.
- Mongoose: ODM (Object Data Modeling) library for MongoDB in Node.js applications.
- MongoDB Atlas: Cloud service for managing MongoDB instance.
- RESTful APIs: Design and implementation of endpoints for client-server communication.
- Axios Module: To fetch data from external APIs, such as real-time stock prices.
- Configuration Module: For managing environment variables and global configuration.
- Class-Validator and Class-Transformer: For data validation and transformation using DTOs.
- RxJS: For reactive programming within the Nest.js framework.
- Railway: Platform for backend deployment.

## How to Use

### Clone the project

Run the following command:

```bash
git clone https://github.com/ROR2022/capx-api.git
```

### Install dependencies

Using `npm`:

```bash
npm install
```

### ENVIROMENT VARIABLES

Create .env file like this:

- URI_MONGODB=
- PORT=
- JWT_SECRET=
- JWT_EXPIRES_IN=
- AWS_USERNAME=
- AWS_USERPASS=
- AWS_ACCESSKEYID=
- AWS_SECRETACCESSKEY=
- AWS_BUCKETNAME=
- AWS_REGION=
- FINNHUB_APIKEY=

### Run the development server

```bash
npm run dev
```
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
