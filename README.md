# Tanam Dashboard Service

API is documented at Swagger [app.swaggerhub.com/apis-docs/isfanr/Tanam](https://app.swaggerhub.com/apis-docs/isfanr/Tanam/1.0.0).<br />

API is accessible on [api-dashboard-tanam.herokuapp.com](https://api-dashboard-tanam.herokuapp.com).<br />

This project was bootstrapped with [Express Generator](https://expressjs.com/en/starter/generator.html).

## Endpoints List

``` bash
[GET] '/' = Check if API is live
[GET] '/real-time/:landId/:timeStart?/:timeEnd?' = Get data for real-time monitoring
[GET] '/prediction/:landId/:time' = Get data for prediction of land conditions
[GET] '/recommendation/:landId' = Get recommendation for certain land
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install required dependencies.

### `npm start`

Runs the app in the development mode.<br />
API will run on [http://localhost:4000](http://localhost:4000).

### `npm run dev`

Runs the app in the development mode with hot reload.<br />
API will run on [http://localhost:4000](http://localhost:4000).

### `npm run lint`

Checks if there is any warning or wrong in codes lint.

### `npm run lint-fix`

Checks if there is any warning or wrong in codes lint.<br />
And automatically fixes what can be fixed.

## Learn More

You can learn more in the [Express documentation](https://expressjs.com/).