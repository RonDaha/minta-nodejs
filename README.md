# Minta node.js - Ron Dahan

## About the exercise:
- Since the 'Meteor landing' data not changing frequently, the application fetch the data on init and creating a dictionary with the 'year' as the key for easier access to the data each time.
In real word app i would have use redis (or any other cache system) instead of saving those record in memory.
- The test is testing only the Nasa domain and does not include the entry-points.
- I did not use ENV (like urls or api-token) to simplify review. 

##Routes
- GET /nasa/meteor (query param options - 'year': number, 'mass': number)


###In the project directory, run:

### `npm install`
### `npm start`
