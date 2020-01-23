import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

import usersRoute from "./app/routes/usersRoute";
import moviesRoute from "./app/routes/moviesRoute";

import { mongoDB } from "./utils/databaseConfig";

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.dir("Database is connected");
    },
    err => {
      console.dir("Cannot connet to DB cause: " + err);
    }
  );

const app = express();

app.set("secretKey", "sjicniwun1uo3nfuin");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ tutorial: "Build API" });
});

// public route
app.use("/users", usersRoute);
// private route

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  let tokens: any = req.headers["x-access-token"];
  jwt.verify(tokens, req.app.get("secretKey"), (err: any, decoded: any) => {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
};

app.use("/movies", validateUser, moviesRoute);

app.get("/favicon.ico", (_req, res: Response) => {
  res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use((_req, _res, next: NextFunction) => {
  let err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  if (err.status === 404) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(500).json({ message: "Something looks wrong :( !!!" });
  }
});

app.listen(5000, () => console.log("Node server is listening in port 5000"));
