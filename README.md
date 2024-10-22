# Iberic X E-commerce API

This API is deployed online using Heroku and utilizes MongoDB Atlas. It stores the products sold on the fictitious e-commerce website for the **Iberic X** brand, a fictional sub-brand of **Nike** in collaboration with **FC Barcelona**.

## Project Context

This project was developed as part of my **Learning Experience Program (LXP)** in Barcelona. It is a fictitious exercise aimed at creating an API to manage the products for an e-commerce site for **Iberic X**, a brand offering exclusive merchandise.

## Technologies Used

- **Heroku**: for deploying the API online.
- **MongoDB Atlas**: for storing products in a NoSQL database.
- **Node.js** and **Express**: for managing the backend server.
- **Mongoose**: for interacting with MongoDB.

## API Features

- Product storage: name, price, description, image, category, available sizes, colors, etc.
- Tracking product sales using the `sold` field.
- Ability to sort products by date added (using the `date_added` key).
- Management of categories and filters to sort and display products according to user needs.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-profile/your-repository.git

    Install dependencies:

    bash

npm install

Create a .env file for your environment variables (e.g., MongoDB Atlas information).
Run the server locally:

bash

    npm start

Deployment

The API is deployed on Heroku and can be accessed via the provided link.
Authors

    Sonia - API development and database management.
    Project developed as part of the LXP in Barcelona.

Acknowledgements

Thanks to the WebTech Institute team and all the mentors for their support throughout this project.
