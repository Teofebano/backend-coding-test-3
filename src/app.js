const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const { customLogger } = require("./helpers/logger");

module.exports = (db) => {
  app.get("/health", (req, res) => res.send("Healthy"));

  app.post("/rides", jsonParser, (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    const checkStartLat = startLatitude < -90 || startLatitude > 90;
    const checkStartLong = startLongitude < -180 || startLongitude > 180;
    if (checkStartLat || checkStartLong) {
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    const checkEndLat = endLatitude < -90 || endLatitude > 90;
    const checkEndLong = endLongitude < -180 || endLongitude > 180;
    if (checkEndLat || checkEndLong) {
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
      });
    }

    if (typeof riderName !== "string" || riderName.length < 1) {
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Rider name must be a non empty string",
      });
    }

    if (typeof driverName !== "string" || driverName.length < 1) {
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Driver name must be a non empty string",
      });
    }

    if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
      return res.status(400).send({
        error_code: "VALIDATION_ERROR",
        message: "Driver vehicle must be a non empty string",
      });
    }

    const values = [
      req.body.start_lat, req.body.start_long, req.body.end_lat,
      req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle,
    ];

    const postQuery = "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = db.run(postQuery, values, function handlePost(err) {
      if (err) {
        res.status(500).send({
          error_code: "SERVER_ERROR",
          message: "Unknown error",
        });
        return;
      }

      db.all("SELECT * FROM Rides WHERE rideID = ?", this.lastID, (errDataBase, rows) => {
        if (errDataBase) {
          return res.status(500).send({
            error_code: "SERVER_ERROR",
            message: "Unknown error",
          });
        }

        return res.status(201).send(rows);
      });
    });
    return result;
  });

  app.get("/rides", (req, res) => {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);

    const getRidesQuery = "SELECT * FROM Rides LIMIT ? OFFSET ?";
    db.all(getRidesQuery, [limit, offset], (err, rows) => {
      if (err) {
        const errMessage = {
          error_code: "SERVER_ERROR",
          message: "Unknown error",
        };
        customLogger("error", errMessage.message, req);
        return res.status(500).send(errMessage);
      }

      if (rows.length === 0) {
        const errMessage = {
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        };
        customLogger("error", errMessage.message, req);
        return res.status(404).send(errMessage);
      }
      customLogger("info", "Successfully fetching rides", req, rows);
      return res.status(200).send(rows);
    });
  });

  app.get("/rides/:id", (req, res) => {
    db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
      if (err) {
        const errMessage = {
          error_code: "SERVER_ERROR",
          message: "Unknown error",
        };
        customLogger("error", errMessage.message, req);
        return res.status(500).send(errMessage);
      }

      if (rows.length === 0) {
        const errMessage = {
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
        };
        customLogger("error", errMessage.message, req);
        return res.status(404).send(errMessage);
      }

      customLogger("info", "Successfully fetching ride by id", req, rows);
      return res.status(200).send(rows);
    });
  });

  return app;
};
