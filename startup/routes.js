const express = require("express");

const fileManager = require("../routes/file-manager.route");
const sendEmail = require("../routes/send-email.route");
const user = require("../routes/user.route");
const dashboard = require("../routes/dashboard.route");
const post = require("../routes/cookie.route");
const google = require("../routes/google.route")
const linkedin = require("../routes/linkedin.route");
const sofTask = require("../routes/task.route");

module.exports = (app) => {

  app.use("/api/file", fileManager);
  app.use("/api/email",  sendEmail);
  app.use("/api/user",  user);
  app.use("/api/dashboard", dashboard);
  app.use("/api/post",  post);
  app.use("/auth/google",  google);
  app.use("/auth/linkedin",  linkedin);
  app.use("/api/task", sofTask);
//   app.use((req, res) => {
//     res.render("404", { pageTitle: "صفحه پیدا نشد | 404", path: "/404" });
// });

  app.get("/", (req, res) => {
    console.log('SESSION', req.session);
    console.log('SessionId', req.sessionID);
    console.log('USER', req.user);

      /// res.render("App", {pageTitle:"SofTesting"});
      console.log(`Session:${req.session.page_views}`);
       if(req.session.page_views) {
         req.session.page_views++;
         res.send(`Session:${req.session.page_views}`);
       }else{
         req.session.page_views=1;
         res.send('Welcome to this page!');
       }
        
    });



  const dir = "./uploaded-files";
  const picturesDir = `${dir}/photos`;
  const documentsDir = `${dir}/documents`;

  app.use("/uploaded-files", express.static(dir));
  app.use("/pictures", express.static(picturesDir));
  app.use("/docs", express.static(documentsDir));

 
  
};
