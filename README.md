# Farm Management Web Application

This repository contains the frontend implementation of a simple farm management web application. It's a single-page application (SPA) designed for managing farm animals.

## Features

- **Simple Authentication:** Implemented basic authentication using `SIMPLE-JWT` to demonstrate the security aspect of the application.
- **Animal Data Management:** Apart from listing animals, features for adding, editing, and removing animals have been incorporated. Each animal has a unique “Name” property.
- **Tailwind CSS:** To showcase proficiency in CSS and Tailwind, no UI frameworks like Ant Design or Material-UI were used. This decision was made to demonstrate my skills in using Tailwind and custom CSS.
- **Deployment:** The frontend is deployed on Netlify, showcasing the application in a production-like environment.

## Local Development

Follow these instructions to set up the project for local development.

### Prerequisites

- Node.js
- npm or yarn
- Git (for cloning the repository)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/jalilbm/farm-task-app-fronted.git
   cd farm-task-app-fronted
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Start the Development Server**

   ```sh
   npm start
   ```

   or

   ```sh
   yarn install
   ```

4. **Environment Variables**

   `REACT_APP_BACKEND_BASE_URL` env var is set to the local Django backend url `http://127.0.0.1:8000`. If you don't wish to run the backend locally, change it to point to the public deployed url `https://farm-task-app-backend-39e877dfc20e.herokuapp.com`, but for reasons described in the README.md file of the backend project, we **HIGHLY RECOMMEND** running the tests in the local development (please refer to the backend readme file for more details)

## Notes

- The `.env` file is included in the repository intentionally as this is only a test project.
- Additional time was invested in enhancing the application with features not initially requested in the task, such as animal data updating (editing) and simple authentication, to provide a more comprehensive demonstration of my capabilities.
- If required, I am prepared to add tests to the project to further demonstrate my proficiency in modern web application development practices.

## Performance Note

When running the application locally with PostgreSQL (that is hosted in Heroku), you might experience slightly slower response times compared to the production environment. This variance is typical due to the network latency in local setups. However, the publicly available interface on Netlify ensures a more responsive user experience. Keep this in mind while testing and developing locally.
