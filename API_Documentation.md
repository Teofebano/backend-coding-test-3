# Endpoint List

- `GET /rides`
- `GET /rides/:id`
- `POST /rides`



* **postman-api-documentation-url :** 
[https://documenter.getpostman.com/view/10889953/SzzkbGpN]

* **instructions to run postman-api-documentation from web**
1. Open postman-api-documentation-url
2. Press Run in postman (button on the top-right of the web page)




**Get Rides**
-------------

* **URL**

  /rides

* **Method:**

  `GET`
  
* **URL Params**
  `NONE`

* **Success Response:**

  * **Code:** 200 
    **Content:**
    `[{
        "rideID": 1,
        "startLat": 3,
        "startLong": 3,
        "endLat": 3,
        "endLong": 3,
        "riderName": "ujang",
        "driverName": "ceceu",
        "driverVehicle": "toyota",
        "created": "2020-06-17 10:18:19"
    },
    {
        "rideID": 2,
        "startLat": 4,
        "startLong": 4,
        "endLat": 4,
        "endLong": 4,
        "riderName": "micha",
        "driverName": "amelia",
        "driverVehicle": "BMW",
        "created": "2020-06-17 10:18:20"
    }]`
    

* **Error Responses:**

  * **Code:**404<br />
    **Content:**<br>
    `{
      error_code: "RIDES_NOT_FOUND_ERROR",
      message: "Could not find any rides",
    }`

  OR

  * **Code:** 500<br />
    **Content:**<br>
    `{
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    }`



**Get Ride By Id**
------------------

* **URL**

  /rides/:id

* **Method:**

  `GET`
  
* **URL Params**
  
  **Required:**
  `id=[integer]`

* **Success Response:**

  * **Code:** 200 
    **Content:**
    `[{
        "rideID": 1,
        "startLat": 3,
        "startLong": 3,
        "endLat": 3,
        "endLong": 3,
        "riderName": "ujang",
        "driverName": "ceceu",
        "driverVehicle": "toyota",
        "created": "2020-06-17 10:18:19"
    }]`
    

* **Error Responses:**

  * **Code:**404<br />
    **Content:**<br>
    `{
      error_code: "RIDES_NOT_FOUND_ERROR",
      message: "Could not find any rides",
    }`

  OR

  * **Code:** 500<br />
    **Content:**<br>
    `{
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    }`


**Post Ride**
------------

* **URL**

  /rides

* **Method:**
  
  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  `{
    "start_lat": 3,
    "start_long": 3,
    "end_lat": 3,
    "end_long": 3,
    "rider_name": "ujang",
    "driver_name": "ceceu",
    "driver_vehicle": "toyota"
  }`
  **Required**
  - `start_lat`: Number,
  - `start_long`: Number,
  - `end_lat`: Number,
  - `end_long`: Number,
  - `rider_name`: String,
  - `driver_name`: String,
  - `driver_vehicle`: String


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `[{
        "rideID": 1,
        "startLat": 3,
        "startLong": 3,
        "endLat": 3,
        "endLong": 3,
        "riderName": "ujang",
        "driverName": "ceceu",
        "driverVehicle": "toyota",
        "created": "2020-06-17 10:18:19"
    }]`
     

* **Error Responses:**

  * **Code:**400<br />
    **Content:**<br>
    `{
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string'
    }`

  OR

  * **Code:** 500<br />
    **Content:**<br>
    `{
      error_code: 'SERVER_ERROR',
      message: 'Unknown error'
    }`
