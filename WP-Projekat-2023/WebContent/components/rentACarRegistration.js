Vue.component("rentACarRegistration", { 
	data: function () {
	    return {
			rentACar: {id:null, name: null, availableVehicles: [], workingHours: null, status: null, location: null, logoPath: null, grade: null },
			managers: []/*{id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role:null, rentACarObjectId: null}*/,
			address: null,
			notValid: null,
			allLocations: [],
			allRentACars: [],
			allUsers: [],
			alreadyAdded: false,
			notAdded: true,
			location: {id: null, address: null, geographicalLength: null, geographicalWidth: null}
	    }
	},
	    template: `
	    	<div>
	    		<label>Registracija Rent A Car objekta</label>
	    		<table>
	    			<tr>
	    				<td><label>Unesite naziv: </label></td>
	    				<td><input type="text" name="name" v-model="rentACar.name" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite radno vreme (format: 00:00-24:00): </label></td>
	    				<td><input type="text" name="workingHours" v-model="rentACar.workingHours" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite putanju za logo: </label></td>
	    				<td><input type="text" name="logoPath" v-model="rentACar.logoPath" /></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<label>Odaberite lokaciju: </label>
	    		<div id="map" ref="map"></div>
	    		<br></br>
	    		<label>Slobodni menadžeri</label>
	    		<table border="1" class="tab">
	    			<tr>
		    			<th>Korisničko ime</th>
		    			<th>Ime</th>
		    			<th>Prezime</th>
		    			<th>Dodeli mu objekat</th>
	    			</tr>
	    			<tr v-for="(m,index) in managers">
	    				<td>{{m.username}}</td>
	    				<td>{{m.name}}</td>
	    				<td>{{m.surname}}</td>
	    				<td>
	    					<button v-if="notAdded" v-on:click="addObjectToManager(index)">Dodeli</button>
	    					<p v-if="alreadyAdded">Već ste dodali menadžera za objekat</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="createManager">Kreiraj novog menadžera</button>
	    		<br></br>
	    		<button v-on:click="registerRentACar">Registruj objekat</button>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas popunite sva polja</p>
	    	</div>
	    `,
    mounted () {
	  const map = new ol.Map({
		  target: 'map',
		  layers: [
		    new ol.layer.Tile({
		      source: new ol.source.OSM(),
		    })
		  ],
		  view: new ol.View({
		    center: ol.proj.fromLonLat([0, 0]),
		    zoom: 2,
		  })
		});
		
		const marker = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(
							ol.proj.fromLonLat([0, 0])
						)
					})
				]
			}),
			style: new ol.style.Style({
				image: new ol.style.Icon({
					src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
					anchor: [0.5,1]
				})
			})
		})
		
		map.addLayer(marker);
  		
  		this.mapObject = map;
  		this.markerObject = marker;
  		
  		const vec = new ol.layer.Vector({
		  source: new ol.source.Vector(),
		});
		  		
  		map.on('click', (event) => {
			  var cor = ol.proj.toLonLat(event.coordinate);
			  
			  this.location.longitude = cor[0];
			  this.location.latitude = cor[1];
			  
			  this.convertToMyCoordinates(cor);
			  vec.getSource().clear();
			  
			  var mapMarker = new ol.Feature({
				  geometry: new ol.geom.Point(event.coordinate),
			  });
			  
			  vec.getSource().addFeature(mapMarker);
			  
			  this.moveMarker(event.coordinate);
		  });
  		
	  	axios.get('rest/locations/').then(response => {
		  this.allLocations = response.data
		  axios.get('rest/users/getAvailableManagers').then(response => {
			  this.managers = response.data
			  axios.get('rest/rentACars/').then(response => {
				  this.allRentACars = response.data
			  	  axios.get('rest/users/').then(response => this.allUsers = response.data);
			  });
		  });
	  });
    },
    methods: {
		convertToMyCoordinates : function(lonLatCoordinates){
			fetch(
				"http://nominatim.openstreetmap.org/reverse?format=json&lon=" + lonLatCoordinates[0] + "&lat=" + lonLatCoordinates[1]
	      		).then(response => { return response.json(); }).then(json => 
			  	{
				  let adresa = json.address;
				  let mesto = adresa.village || adresa.town || adresa.city;
				  let postanskiBroj = adresa.postcode;
				  let broj = adresa.house_number;
				  let ulica = adresa.road;
				  
				  this.location.address = String(ulica + " " + broj + " " + mesto + " " + postanskiBroj);
				  
				  let boundingbox = json.boundingbox;
				  let length = Math.abs(parseFloat(boundingbox[3]) - parseFloat(boundingbox[1]));
			   	  let width = Math.abs(parseFloat(boundingbox[2]) - parseFloat(boundingbox[0]));
					
				  this.location.geographicalWidth = width;
				  this.location.geographicalLength = length;
			  	})
		},
		
		moveMarker: function (lonLatCoordinates) {
		    const markerSource = this.markerObject.getSource();
		    markerSource.clear();
		
		    const mapMarker = new ol.Feature({
		      geometry: new ol.geom.Point(lonLatCoordinates)
		    });
		
		    markerSource.addFeature(mapMarker);
		  },
		
    	addObjectToManager : function(id) {
			event.preventDefault();
						
			let userCount = 0;
			for (const _ in this.allUsers)  {
  				userCount++;
			}
			
			let i = 0;
			for(i; i < userCount; i++){
				if(this.allUsers[i].id == id){
					break;
				}
			}
			
			let count = 0;
			for (const _ in this.allRentACars) {
  				count++;
			}
			
			let entered = false;
			let j = 0;
			for(j; j < userCount; j++){
				if(this.allUsers[j].rentACarObjectId == count){
					entered = true;
					this.alreadyAdded = true;
					this.notAdded = false;
				}
			}
			
			if(!entered){
				this.allUsers[i].rentACarObjectId = count;
				axios.put('rest/users/' + this.allUsers[i].id, this.allUsers[i])//.then(response => location.reload());
				this.alreadyAdded = true;
				this.notAdded = false;
			}
    	},
    	
    	createManager: function(){
			event.preventDefault();

			router.push(`/managerRegistration`);
		},
		
		registerRentACar: function(){
			event.preventDefault();
			
			this.notValid = false;
			let valid = true;
			
			if(!this.rentACar.name){
                valid = false;
                this.notValid = true;
                document.getElementsByName("name")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("name")[0].style.border = "2px solid black";
            }
			
			if(!this.location){
                valid = false;
                this.notValid = true;
            }
            else{                
                this.rentACar.location = this.location;
            }
			
			const workingHoursRegex = /^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/;
			if(!this.rentACar.workingHours || !workingHoursRegex.test(this.rentACar.workingHours)){
                valid = false;
                this.notValid = true;
                document.getElementsByName("workingHours")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("workingHours")[0].style.border = "2px solid black";
            }
            
            if(!this.rentACar.logoPath){
                valid = false;
                this.notValid = true;
                document.getElementsByName("logoPath")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("logoPath")[0].style.border = "2px solid black";
            }
			
			if(valid){
				this.rentACar.status = 'WORKING';
				this.rentACar.grade = 0;
								  
				axios.post('rest/locations/', this.location).then(response => {
					this.rentACar.location = this.location;
					axios.post('rest/rentACars/', this.rentACar).then(response => router.push(`/rentACar`)).catch(error => console.log(error));
				});
			}
		}
    }
});