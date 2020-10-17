const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "ae4b9580fb08fb1f19597d1e67356e90";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const wDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            console.log("Temperature in " + city + " is " + temp);
            res.write("<p>The weather is currently " + wDesc + "</p>");
            res.write("<h1>Temperature in " + city + " is " + temp + " degress Celcius</h1>");
            res.write("<img src=" + imageUrl +">");
            res.send();
        });
    });
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
