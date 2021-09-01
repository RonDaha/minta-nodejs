# Minta node.js - Ron Dahan

## About the exercise:
- Since the 'Meteor landing' data not changing frequently, the application fetch the data on init and creating a dictionary with the 'year' as the key for easier access to the data each time.
In real word app I would have use redis (or any other cache system) instead of saving those records in memory.
- The test is testing only the Nasa domain and does not include the entry-points.
- I did not use ENV (like urls or api-token) to simplify the review.
- The 'InSight: Mars Weather Service API' docs - https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf) documented that sometimes there are missing properties (such as HWS). So the data the application response might have HWS with null value 
 

## Routes
- GET /nasa/meteor 
- Query param options - { 'year': number, 'mass': number }


### In the project directory, run:

### `npm install`
### `npm start`
