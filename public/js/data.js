	async function deadPeople(routePoints){
		var crash_data = [];
		var route_fatalities = 0;
		for (var i = 0; i < routePoints.length; i++){
			
			var coord = routePoints[i];
			const response_1 = await fetch(congestion_URL+'apikey='+Key+'&dataset='+dataSets[0]+'&geofilter.distance='+coord[0]+'%2C+'+coord[1]+'%2C+'+pointRad+'&rows='+setLen[0]);
            const data_1 = await response_1.json();	
			console.log(data_1.records.length);
		
			
			for (var j = 0; j < data_1.records.length; j++){
				crash_data.push([data_1.records[j].fields.geopoint, data_1.records[j].fields.injury_type]);
			}
			const response_2 = await fetch(congestion_URL+'apikey='+Key+'&dataset='+dataSets[1]+'&geofilter.distance='+coord[0]+'%2C+'+coord[1]+'%2C+'+pointRad+'&rows='+setLen[1]);

			const data_2 = await response_2.json();

			route_fatalities = route_fatalities + data_2.records.length;
			
		}
		//return(crash_data,route_fatalities);
        console.log(crash_data,route_fatalities)
        
     
	}
	

	congestion_URL = 'https://decode-congestion-vancouver.opendatasoft.com/api/records/1.0/search/?';
	dataSets = ['vgh-jan-2011-sept-2019-simplified','vpd-fatalities-2006-aug-22-2019'];
	setLen = ['10000','220'];
	pointRad = '9'; //radius in meters around each map route point
	Key = '4613264480e4fe8b0e66681fedf39600aa1a93e4f043f7230c6a7fc1';
	fuk = [['49.2619909', '-123.0681175' ], [ '49.2622451', '-123.0680987' ], [ '49.2622134', '-123.0659369' ], [ '49.262353', '-123.0666349' ],  [ '49.2661288', '-123.0769301' ], [ '49.2767892', '-123.0772592' ], [ '49.2768299', '-123.082613' ], [ '49.2767954', '-123.0968526' ], [ '49.2798502', '-123.1105849' ], [ '49.2823627', '-123.1144711' ], [ '49.2812323', '-123.1161695' ], [ '49.2829375', '-123.1188102' ]];
	//var collisionData, var DEAD = 
	deadPeople(fuk);
	//console.log(collisionData, DEAD);
	//for (var i = 0; i < CollisionStats; i++):
    //heatMapData.push({location: new google.maps.Weighted(CollisionStats[i].LNG, CollisionStats[i].LAT), weight = )


