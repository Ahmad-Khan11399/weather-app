const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.listen(3000, function() {
  console.log("Hello , Server is running on port 3000");
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "562b162669b2aba431abbc3801f4b295";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon

      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The Temperature is " + temp + " degree celsius in " + query + "</h1>")
      res.write("<h2>The weather description is " + desc + " </h2>")
      res.write("<img src=" + imgUrl + " >")

      res.send()
    })
  })
})
