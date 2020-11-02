const express = require("express");
const app = express();

const html_routes = require("./routes/html_routes.js");
const api_routes = require("./routes/api_routes.js");

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(html_routes);
app.use(api_routes);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});
  