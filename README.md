# Breinify Code Challenge

### Introduction:

You will be creating a full stack web application using Node with Express as the backend and React with React-Bootstrap as the frontend to manage a store's mechandise.

### Requirements:

#### Backend Requirements

1. Create an Express server that:
    - GET: Reads and returns the content from redis.
    - POST: Creates a new product and writes it to redis, and returns the newly created product content.
    - PUT: Updates a product and writes it to redis, and returns the updated product content.
    - DELETE: Deletes the product from redis, and returns the delete product content.

#### Frontend Requirements

1. A dashboard to show the following in a Product card:
    - Product Image ( should be a random image ) `productImg`
    - Product Name `productName`
    - Description `description`
    - Creation Time `creationTime`
2. A filter feature to filter the cards by the product name.
3. A sorting feature to sort the cards by their `creationTime` in either acsending or desending order.
4. Add a button to create a new card.
5. Add a button to delete an existing card.
6. Add an edit feature to change the card's name (`productName`) and image (`productImg`)
    > NOTE: Create, edit and delete should fire an AJAX call that will save the data into redis on the Node server.

#### Environment Requirements
1. NPM version: `8.1.2`
2. Node version: `v16.13.1`

### Pre-Requirements

1. Please be sure to download [redis](https://download.redis.io/releases/redis-5.0.14.tar.gz). We will be using `redis` to store our cards in the backend.
    - Start up the `redis-server` on the default port: `6379`

### How to run
1. `cd` into the `breinify-frontend-challenge` folder
2. Run `npm run fresh` 
    - We will be using this command to start your project!
    - This downloads the necessary dependencies and starts the server (backend) and client (frontend)

### Technologies Available:

-   AJAX calls: `axios` or `fetch`
-   Helper components: `react-bootstrap`
-   Styling: `styled-components` or `sass`
-   You can add other libraries on top of these as well.

### Time Limit:

You will have 1 week to finish this challenge. Once you finish, please push your challenge to Github and share the repository link with us.

### Nice to have:

You may write some unit test for your challenge.

### Additional Information:

We added a `"proxy": "http://localhost:5001"` into package.json to help clean up endpoint calls.
