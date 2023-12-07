import express from 'express';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import cors from "cors";
import mongoose from "mongoose";
// mongoose.connect("mongodb://localhost:27017/kanbas");
import UserRoutes from './users/routes.js';
import ModuleRoutes from './modules/routes.js';
import "dotenv/config";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
 ));
 const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }  
  app.use(
    session(sessionOptions)
  );  
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);