const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.render('pages/index')});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.get('/home', (req,res) => { res.render('pages/home')});

app.get('/maps', (req,res) => { res.render('pages/maps')});
app.get('/test', (req,res) => { res.render('pages/test')});

app.get('/heatmap',(req,res) => { res.render('pages/heatmap')});

//MATTS DATA STUFF! gets data points from 
const fetch = require("node-fetch");
var fs = require("fs");
app.get('/getdata', (req,res) => {
  //my function to get points
  async function deadPeople(routePoints){

    var crash_data = [];
    var route_fatalities = 0;
    for (var i = 0; i < routePoints.length; i++){
      
      var coord = routePoints[i];
      const response_1 = await fetch(congestion_URL+'apikey='+Key+'&dataset='+dataSets[0]+'&geofilter.distance='+coord[0]+'%2C+'+coord[1]+'%2C+'+pointRad+'&rows='+setLen[0]);
      const data_1 = await response_1.json();	
      console.log(data_1.records.length);
  
      for (var j = 0; j < data_1.records.length; j++){
        crash_data.push([data_1.records[j].fields.geopoint]);
      }
      const response_2 = await fetch(congestion_URL+'apikey='+Key+'&dataset='+dataSets[1]+'&geofilter.distance='+coord[0]+'%2C+'+coord[1]+'%2C+'+pointRad+'&rows='+setLen[1]);
      const data_2 = await response_2.json();
    
      if(data_2.records.length>0){
        route_fatalities = route_fatalities + data_2.records.length;
      }
    }
    //return(crash_data,route_fatalities);
    console.log(crash_data,route_fatalities)
  }
  
  congestion_URL = 'https://decode-congestion-vancouver.opendatasoft.com/api/records/1.0/search/?';
  dataSets = ['vgh-jan-2011-sept-2019-simplified','vpd-fatalities-2006-aug-22-2019'];
  setLen = ['10000','220'];
  pointRad = '9'; //radius in meters around each map route point
  Key = '4613264480e4fe8b0e66681fedf39600aa1a93e4f043f7230c6a7fc1';
  var contents = fs.readFileSync("data.json");
  // Define to JSON type
   var jsonContent = JSON.parse(contents);
  // Get Value from JSON
   var len = jsonContent.points.length;
   // for (i = 0; i < len ; i++) 
   // {
    //  console.log("Lats = ", jsonContent.points[i].lat);
    //  console.log("Longs = ", jsonContent.points[i].lng);
   // }
  arr = [];
   for (i = 0; i < len; i++ )
  {
    Slat = JSON.stringify(jsonContent.points[i].lat);
    Slng = JSON.stringify(jsonContent.points[i].lng);
    arr[i] = [Slat,Slng];
  }
  
  console.log(arr[0][0])
  //aray = [];	
  // for (var z = 0; z < (fuk.length/2); z++){
  //   aray.push([fuk[2*z],fuk[2*z+1]]); 
  // }

  // deadPeople(arr);
  //for (var i = 0; i < CollisionStats; i++):
    //heatMapData.push({location: new google.maps.Weighted(CollisionStats[i].LNG, CollisionStats[i].LAT), weight = )
});
