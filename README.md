# TravelApp
TravelConnect-Backend: The Express.js backend for TravelConnect, the social travel companion app. Powers destination details, attraction recommendations, user reviews, and more. Join us in shaping the future of travel exploration!

# Description
This repository contains the backend code for TravelConnect, a social travel companion app. The backend is developed in Node.js using the Express server framework.

## Routes

### Authentication Routes

#### `/auth/test`

- **Description:** Test route to ensure the server is running.
- **Method:** GET

#### `/auth/signup`

- **Description:** User registration route.
- **Method:** POST

#### `/auth/login`

- **Description:** User login route.
- **Method:** POST

#### `/auth/profile`

- **Description:** Fetch user profile route (requires authentication).
- **Method:** POST

#### `/auth/updateProfile`

- **Description:** Update user profile route (requires authentication).
- **Method:** POST

### Dashboard Routes

#### `/dashboard/test`

- **Description:** Test route to ensure the dashboard server is running.
- **Method:** GET

#### `/dashboard/insert/nearyou`

- **Description:** Insert a new location.
- **Method:** POST

#### `/dashboard/trending`

- **Description:** Get trending locations.
- **Method:** POST

#### `/dashboard/insert/activities`

- **Description:** Insert a new activity.
- **Method:** POST

#### `/dashboard/activities`

- **Description:** Get random activities.
- **Method:** POST

#### `/dashboard/insert/resturant`

- **Description:** Insert a new restaurant.
- **Method:** POST

#### `/dashboard/restaurants`

- **Description:** Get random restaurant details.
- **Method:** POST

#### `/dashboard/:name`

- **Description:** Get details of a specific activity or restaurant.
- **Method:** POST

### Location Routes

#### `/location/test`

- **Description:** Test route to ensure the location server is running.
- **Method:** GET

#### `/location/:id`

- **Description:** Get details of a specific location with associated restaurants and activities.
- **Method:** POST

### Search Routes

#### `/search/test`

- **Description:** Test route to ensure the search server is running.
- **Method:** GET

#### `/search/allImagesShuffled`

- **Description:** Get all images shuffled for search.
- **Method:** POST

### Trip Routes

#### `/trip/test`

- **Description:** Test route to ensure the trip server is running.
- **Method:** GET

#### `/trip/addtrip`

- **Description:** Add a new trip for the user.
- **Method:** POST

#### `/trip/gettrips`

- **Description:** Get all trips for the user.
- **Method:** POST

#### `/trip/updatetrip`

- **Description:** Update an existing trip for the user.
- **Method:** POST

