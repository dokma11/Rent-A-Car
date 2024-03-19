Vue.component("homePage", { 
	data: function () {
	    return {
			rentACar: new Map(),
			rentACarSearch: [],
			users: [],
			notValid: null,
			sortOption: "",
			filterOption: "",
			link: 'http://localhost:8080/WebShopREST/#/login' 
	    }
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center;"> 
	    	<label><b>Dobrodošli na početnu stranicu</b></label>
	    	 <a style="position: absolute; top: 10px; right: 10px;" v-bind:href="link">Prijavite se na svoj nalog</a>
	    	 	<label>Pretražite po:</label>
		    	<div style="display: flex; align-items: center;">
				    <label style="margin-right: 10px;">Nazivu:</label>
				    <input type="text" name="searchName" v-model="rentACarSearch.name" style="margin-right: 10px;" />
				    <label style="margin-right: 10px;">Tipu vozila:</label>
				    <select v-model="rentACarSearch.vehicleType" style="margin-right: 10px;">
				      <option>CAR</option>
				      <option>VAN</option>
				      <option>MOTORHOME</option>
				      <option>RV</option>
				      <option>MINIBUS</option>
				    </select>
				    <label style="margin-right: 10px;">Lokaciji:</label>
				    <div id="map"></div>
				    <label style="margin-right: 10px;">Prosečnoj oceni:</label>
				    <input type="text" name="searchAverageGrade" v-model="rentACarSearch.grade" style="width: 50px; margin-right: 10px;" />
				    <button v-on:click="search" style="margin-right: 40px;">Pretraži</button>
				    <select v-model="sortOption" @change="sortRentACar" style="margin-right: 10px;">
				      <option value="">Sortriraj po:</option>
				      <option value="nameAscending">Nazivu: A-Z</option>
				      <option value="nameDescending">Nazivu: Z-A</option>
				      <option value="locationAscending">Lokaciji: A-Z</option>
				      <option value="locationDescending">Lokaciji: Z-A</option>
				      <option value="gradeAscending">Oceni: rastuće</option>
				      <option value="gradeDescending">Oceni: opadajuće</option>
				    </select>
				    <select v-model="filterOption" @change="filterRentACar" style="margin-right: 10px;">
				      <option value="">Filtriraj po:</option>
				      <option value="MANUAL">Vrsti menjača: manuelni</option>
				      <option value="AUTOMATIC">Vrsti menjača: automatik</option>
				      <option value="DIESEL">Tipu goriva: dizel</option>
				      <option value="GASOLINE">Tipu goriva: benzin</option>
				      <option value="HYBRID">Tipu goriva: hibrid</option>
				      <option value="ELECTRIC">Tipu goriva: električni</option>
				      <option value="WORKING">Samo otvoreni objekti</option>
				    </select>
				    <button v-on:click="resetClick">Resetuj prikaz</button>
				</div>
	    	 	<table border="1" class="tab">
	    			<tr>
	    				<th>Naziv</th>
	    				<th>Lokacija</th>
	    				<th>Logo</th>
	    				<th>Prosečna ocena</th>
	    				<th>Prikaz detalja</th>
	    			</tr>
	    			<tr v-for="(r,index) in rentACar">
	    				<td>{{r.name}}</td>
	    				<td>{{r.location.address}}</td>
	    				<td>
          					<img :src="r.logoPath" alt="Logo" /> <!-- Display the image from the URL -->
                       </td>
	    				<td>{{r.grade}}</td>
	    				<td><button v-on:click="displayDetails(r.id)">Prikazi detalje</button></td>
	    			</tr>
	    		</table>
				<br></br>
	    		<p v-if="notValid">Molimo Vas popunite bar neko polje za pretragu!</p>
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
			  this.convertToMyCoordinates(cor);
			  vec.getSource().clear();
			  
			  var mapMarker = new ol.Feature({
				  geometry: new ol.geom.Point(event.coordinate),
			  });
			  
			  vec.getSource().addFeature(mapMarker);
			  
			  this.moveMarker(event.coordinate);
		});
        
        axios.get('rest/rentACars/').then(response => {
			this.rentACar = response.data
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
				  
				  this.locationSearch = mesto
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
		
    	registration : function() {
			router.push(`/usersRegistration`);
    	},
    	
    	rentACarRegistration: function() {
			router.push(`/rentACarRegistration`);
		},
		
		search: function() {
			event.preventDefault();
			
			let temp = [];
			temp = this.rentACar;
			this.rentACar = [];	
  			let count = 0;
			for (const _ in temp) {
  				count++;
			}
  			let entered = true;
  			this.notValid = false;
  			
  			if (this.rentACarSearch.name || this.rentACarSearch.vehicleType || this.rentACarSearch.grade || this.locationSearch) {
			  for (let i = 0; i < count; i++) {
			    let item = temp[i];
			    let nameMatch = !this.rentACarSearch.name || item.name.toLowerCase().includes(this.rentACarSearch.name.toLowerCase());
			    let vehicleTypeMatch = true;
			    
			    if(!this.rentACarSearch.vehicleType){
					vehicleTypeMatch = true;	
				}
			    else{
				    axios.get('rest/vehicles/getVehiclesForTypeSearch/' + this.rentACarSearch.vehicleType).then(response => {
							this.vehiclesForSearch = response.data;
							
							const parts = this.vehiclesForSearch.split(",");
					
							for (let part of parts) {
							  for(let i=0; i < count; i++){
								  if(temp[i].id == part){
									  vehicleTypeMatch = true;
								  }
							  }
							}
					 });
			    }
			    
			    let gradeMatch = !this.rentACarSearch.grade || item.grade == this.rentACarSearch.grade;
			    let locationMatch = !this.locationSearch || item.location.address.toLowerCase().includes(this.locationSearch.toLowerCase());
			  
			    if (nameMatch && vehicleTypeMatch && gradeMatch && locationMatch) {
			      this.rentACar.push(item);
			      entered = true;
			    }
			   }
			  }
			
			if (!this.rentACarSearch.name && !this.rentACarSearch.vehicleType && !this.rentACarSearch.grade && !this.locationSearch){
				entered = false;
			}

			if(!entered){
				this.rentACar = temp;
				this.notValid = true;
			}
			
		},
		
		displayDetails: function(id){
			router.push(`/rentaCar/rentACarObjectDisplay/${id}`);
		},
		
		sortRentACar: function() {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.rentACar) {
  				count++;
			}	
			
      		if (this.sortOption === "gradeAscending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].grade > this.rentACar[j + 1].grade ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		} 
      		
      		else if (this.sortOption === "gradeDescending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].grade < this.rentACar[j + 1].grade ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}      		
			}
      		else if (this.sortOption === "nameAscending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].name > this.rentACar[j + 1].name ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		
      		else if (this.sortOption === "nameDescending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].name < this.rentACar[j + 1].name ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		
      		else if (this.sortOption === "locationAscending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].location.address > this.rentACar[j + 1].location.address ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		
      		else if(this.sortOption === "locationDescending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].location.address < this.rentACar[j + 1].location.address ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
    	},
    	
    	filterRentACar: function(){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.rentACar) {
  				count++;
			}
			let temp = [];
			temp = this.rentACar;
			this.rentACar = [];	
			
			if(this.filterOption === "MANUAL"){
				axios.get('rest/vehicles/getVehiclesForGearBoxTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});	
			}
			else if(this.filterOption === "AUTOMATIC"){
				axios.get('rest/vehicles/getVehiclesForGearBoxTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});
			}
			else if(this.filterOption === "DIESEL"){
				axios.get('rest/vehicles/getVehiclesForFuelTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});
			}
			else if(this.filterOption === "GASOLINE"){
				axios.get('rest/vehicles/getVehiclesForFuelTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});
			}
			else if(this.filterOption === "HYBRID"){
				axios.get('rest/vehicles/getVehiclesForFuelTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});
			}
			else if(this.filterOption === "ELECTRIC"){
				axios.get('rest/vehicles/getVehiclesForFuelTypeSearch/' + this.filterOption).then(response => {
					this.filterReturnString = response.data;
							
					const parts = this.filterReturnString.split(",");
					
					for (let part of parts) {
					  for(let i=0; i < count; i++){
						  if(temp[i].id == part){
							  this.rentACar.push(temp[i]);
						  }
					  }
					}
				});
			}
			else if(this.filterOption === "WORKING"){
				for (let i = 0; i < count - 1; i++) {
				    if(temp[i].status == "WORKING"){
						this.rentACar.push(temp[i]);
					}
				}
			}
		},
		
		resetClick: function(){
			event.preventDefault();
			
			location.reload();
		},
    }
});