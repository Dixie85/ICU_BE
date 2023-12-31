# ICU-BE

A small backend project providing geolocation by finding the IP of the visiting user and then finding the geospatial location from the user's IP and storing the data in a database.

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Teck Used](#teck-used)

## Getting Started

Start with cloning the repository locally to your machine and instal all required dependencies. If everything goes smoothly run the next command to run the the application.

```bash
# Install dependencies
npm install

# Run the project
npm run dev
```

## Endpoints

This are all the endpoints this application/server provides.

> Those endpoints provide real live data, meaning real users real places.

```node
GET /users/add

curl http://localhost:8080/users/add
```

Calling this endpoint will find the IP of the visitor, and accordingly get the geolocation from the provided IP address, which will be stored in a database.

```node
GET /users/get

curl http://localhost:8080/users/get
```

Calling this endpoint will retrieve and send back all the visitors up to that point.

```node
POST users/sort_by_country

curl -X POST -H "Content-Type: application/json" -d '{"country": "Sweden"}' http://localhost:8080/users/sort_by_country
```

Calling this endpoint and providing json data with a specific country, will retrieve all the visitors sorted by the provided country.

```node
POST users/sort_by_date

curl -X POST -H "Content-Type: application/json" -d '{"date": "2023-12-29"}' http://localhost:8080/users/sort_by_date
```

Calling this endpoint and providing json data with a specific date, will retrieve all the visitors sorted by the provided date.

> Those endpoints provide fake, made up data.

```node
GETusers/getfake

curl http://localhost:8080/users/getfake
```

```node
POST users/sort_fake_by_country

curl -X POST -H "Content-Type: application/json" -d '{"country": "Sweden"}' http://localhost:8080/users/sort_fake_by_country
```

```node
POST users/sort_fake_by_date

curl -X POST -H "Content-Type: application/json" -d '{"date": "2023-12-29"}' http://localhost:8080/users/sort_fake_by_date
```

## Teck Used

### APIs

In this project were included couple of external APIs

#### For finding the IP of a user request

> https://api.ipify.org.

#### Finding the geospatial location of an IP

> https://ip-api.com

### Database

> SQLite is the database used to store all the data.

### Running environment

> Running environment for this project is NODE.js with Express.js

## Enjoy!
