import { Request, Response, NextFunction } from "express";
import movieModel from "../models/movieModel";

export const moviesController = {
  getById: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    movieModel.findById(req.params.movieId, (err, movieInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Movies found!",
          data: { movies: movieInfo }
        });
      }
    });
  },

  getAll: (req: Request, res: Response, next: NextFunction) => {
    let moviesList = [];
    movieModel.find({}, (err, movies) => {
      if (err) {
        next(err);
      } else {
        movies.map((movie: any) =>
          moviesList.push({
            id: movie._id,
            name: movie.name,
            released_on: movie.released_on
          })
        );
        res.json({
          status: "success",
          message: "Movies list found!",
          data: { movies: moviesList }
        });
      }
    });
  },

  updateById: (req: Request, res: Response, next: NextFunction) => {
    movieModel.findOneAndUpdate(req.params.movieId, (err: any, _moviesInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Movie updated successfully!!!",
          data: null
        });
      }
    });
  },

  deleteById: (req: Request, res: Response, next: NextFunction) => {
    movieModel.findByIdAndRemove(req.params.movieId, (err, moviesInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Movies deleted succesfully!",
          data: null
        });
      }
    });
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    movieModel.create(
      { name: req.body.name, released_on: req.body.released_on },
      (err: any, _result) => {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "Movie added successfully!!!",
            data: null
          });
        }
      }
    );
  }
};
