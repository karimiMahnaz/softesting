///const http = require("http");

///const debug = require("debug")("log-Project");
const express = require("express");
let cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);  //Class
const path =require("path");
const flash = require("connect-flash");
const process = require('process');
const morgan = require('morgan');
const logger = require('pino')();
const winston = require('./middlewares/winston');
const { errorHandler } = require('./middlewares/errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();
require("express-async-errors");


require("./db");

////debug("Connected To DataBase")

logger.info('step=0');

const app = express();
app.use(express.json());
app.use(morgan("combined", { stream: winston.stream }));


require("./startup/secure")(app);

require("./middlewares/passport");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  //cookie:{maxAge:600*60*1000},
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(flash());

logger.info('step=1');
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());

require("./routes/cookie.route")(app);

require("./startup/routes")(app);
logger.info('step=2');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/public/blog", express.static(path.join(__dirname, "blog")));
app.use("/uploaded-files", express.static(path.join(__dirname, "uploaded-files")));
console.log(path.join(__dirname, "uploaded-files"));


app.use(
  "/SoftestingApi-documents",
  swaggerUI.serve,
  swaggerUI.setup(
    swaggerJsDoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "SofTesting",
          version: "1.0.0",
          description:
            'Software design, development & testing',
          contact: {
            name: "Mahnaz Karimi",
            url: "https://softestingca.com",
            email: "karimimahnaz122@gmail.com",
          },
        },
        servers: [
          {
            url: "https://api.softestingca.com",
          },
          {
            url: "http://localhost:8000",
          },
        ],
        components : {
          securitySchemes : {
            BearerAuth : {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
              
            }
          }
        },
        security : [{BearerAuth : [] }]
      },
      apis: ["./routes/**/*.js" , "./startup/*.js"],
    }),
    {explorer: true},
  )
);




const port = process.env.PORT || 2858;  //8000

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

require("./middlewares/onLineChat")(server);


process.on('warning', (warning) => {
  console.log(warning.stack);
});



logger.info('step=3');

app.use(errorHandler);


////const onLineChatPort = process.env.ONLINECHATPORT || 500;

////const server = http.createServer(app);
////const io = new Server(server);

// server.listen(onLineChatPort,() => {
//        console.log(`Server is running on port ${onLineChatPort}`);
//     });

