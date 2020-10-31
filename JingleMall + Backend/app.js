const express = require("express");
const path = require("path");
const app = express();

PORT = process.env.PORT || 3000;

const routes = require("./routes/routes.js")


app.use(express.static(path.join(__dirname,"public")));

app.use(routes);






app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});
  