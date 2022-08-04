# roulette-api


## Introduction

This repository contains a RESTful API for a very simple implementation of the game `Roulette` built using NodeJS and Express. 

## Technology Choices

**ExpressJS** - As it is most popular HTTP server libraries for NodeJs, easy to setup and configure. 

**Body-Parser** - Helps to parse the data in body for a POST request

**Supertest** - HTTP assertions library that allows to programmatically send HTTP requests, therefore helping in testing endpoints.  
  

## Getting Started

To try out the API on your local machine, follow these steps:


### **Installation**

Check you have Node.js installed:

```
npm --v
```

Check you have git installed:

```
git --v
```


###  **Dependencies**

You will also need:
- express
- mocha
- chai
- body-parser
- supertest
- sinon  


## Steps

1. Clone this repository:

```
git clone https://github.com/RajinderBhinder/roulette-api
``` 

2. Navigate into the cloned repository and install all the above mentioned dependencies:

```
 npm i
```

3. Run the server on your local machine:

```
npm start
```

This will allow the API to be accessed through port **9090**.  



## EndPoints

GET /api/roulette
Get all the data for the roulette wheel

GET /api/spin?betType={betType}&&betValue={value}
To mimic a roulette wheel spin and return the game result and winning number  


## Testing

Use the following command to run all the tests:

```JavaScript
npm test
```  

## Deployment and Feature Toggles

- Configuration files should be used for all environments (like dev, qa, staging, etc) for deploying the project to the different environments. 
- The config files will also help to introduce toggles, which could be turned on/off for certain environments. For example, if a feature is being developed it could be turned on in the lower enviroments, until it is ready to be released in production. In my design, having separate controller and router files will help to easily direct to different routers/controllers depending on the toggle state. 
- Automating the deployment process will help to save time by enabling quick and frequent releases without human intervention. The automated build pipelines used to run tests ensures feature quality helping in CI/CD.


## Monitoring

- For API improvements it'll be helpful to monitor on various metrics like RPM, errors, response delays, etc
- For business it might be helpful to understand the game results, and improve the randomness. (Note: this implementation simply uses Math.random which could be predictable.) 
