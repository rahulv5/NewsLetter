const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const { firstName, lastName, eMail } = req.body;

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/<audienceId>";

  const options = {
    method: "POST",
    auth: "rahul:<api-key>",
  };

  const request = https.request(url, options, (response) => {});
  response.on("data", (data) => {
    console.log(JSON.parse(data));
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
