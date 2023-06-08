// jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/f90b5ad078";

  const options = {
    method: "POST",
    auth: "shashwat007:3014392dbb528b775ba0c3a8441e0794-us9",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      // res.send("Successfully Subscribed !");
      res.sendFile(__dirname + "/success.html");
    } else {
      // res.send("There was an error in signing up, please try again later !");
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server rumming on port 3000");
});

// api key
// d7b1fe85314924e773ae85666788040d-us9

// audience id
//  f90b5ad078
