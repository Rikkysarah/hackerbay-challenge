# HACKERBAy BACKEND Task

___  

## Requirements  
My task is to build a simple stateless microservice in Nodejs, with three major functionalities -
1. Authentication
2. JSON patching
3. Image Thumbnail Generation
___

### Endpoints
The API features the following endpoint functionalities  

**Public Endpoints**  
1. */login*
    * Request body should contain an arbitrary username/password pair
    * Treat it as a mock authentication service and accept any username/password.
    * Return a signed [Json Web Token](https://jwt.io/) which can be used to validate future requests.

**Protected Endpoints**  

The following two endpoints should be protected. The JWT obtained in the _/login_ endpoint must be attached to each request.  If the JWT is missing or invalid, these endpoints should reject the request.
1. */api/apply_json_patch*
    * Request body should contain a JSON object and a [JSON patch object](http://jsonpatch.com/).
    * Apply the json patch to the json object, and return the resulting json object.
2. */api/create_thumbnail*
    * Request should contain a public image URL.
    * Download the image, resize to 50x50 pixels, and return the resulting thumbnail.
___

### Fulfilled Requirements  
1. Code Requirements
    * Included [Mocha](https://mochajs.org/) as a test suite for the microservice.
    * Used modern javascript ES6 syntax.
2. Other Requirements
    * Used git for version control, and hosted the project in a Github repository.
    * Project contains documentation with setup and usage instructions.
    * Project installs all dependencies with `npm install`, starts the server with `npm start`, and runs the test suite with `npm test`.
3. Bonus Points
    * 100% code coverage in test suite by [Istanbul](https://github.com/gotwarlost/istanbul).
    * Included Swagger specifications. Copy paste the contents of swagger.yaml to [Swagger](http://editor.swagger.io).
    * Integrated a centralized app logging/monitoring system using `morgan`.
    * Used [esLint](https://eslint.org) for Javascript Style and Linting.
    * ~~Include a working Dockerfile with the app directory.~~
___

## INSTRUCTIONS
1. Clone the repository
  ```
  $> git clone https://github.com/Rikkysarah/hackerbay-challenge.git
  ```
2. Install all the dependencies. Make sure you are inside the `app` folder.
  ```
  $> npm install
  ```

3. Start the API server.
  ```
  $> npm start
  ```
6. Use your favourite REST client to test HTTP tools. **Make sure you are runnig the API server before moving forward. See step (5).** 
    * You could use [POSTman](https://www.getpostman.com).
7. You can test the endpoints.
    * The protected endpoints **should include JWT in the header as `token`** for them to respond successfully.
