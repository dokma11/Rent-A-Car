Vue.component("rentACarObjectDisplay", { 
	data: function () {
	    return {
			rentACar: {location: {address: null}},
			comments: {rentACarName: null},
			user: [],
			vehicles: [],
			rightManager: null,
			notRightManager: null,
			rightAdmin: null,
			toDelete: [],
			toEdit: [],
			commentsForGrade: null,
			temp: [],
			link: 'http://localhost:8080/WebShopREST/#/rentACar' 
	    }
	},
	    template: `
	      <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	      <a style="position: absolute; top: 10px; right: 10px;" v-bind:href="link">Vratite se na početnu stranicu</a>
		  <label><b>Prikaz Rent A Car objekta</b></label>
		  <br></br>
		  <table border="1" class="tab">
		    <tr>
		      <th>Naziv</th>
		      <th>Radno vreme</th>
		      <th>Status</th>
		      <th>Logo</th>
		      <th>Ocena objekta</th>
		    </tr>
		    <tr v-if="rentACar">
		      <td>{{rentACar.name}}</td>
		      <td>{{rentACar.workingHours}}</td>
		      <td>{{rentACar.status}}</td>
		      <td>
		        <img :src="rentACar.logoPath" alt="Logo" />
		      </td>
		      <td>{{rentACar.grade}}</td>
		    </tr>
		  </table>
		  <div>
		  	<label>Lokacija odabranog Rent A Car objekta: {{rentACar.location.address}}</label>
		  	<div id="map"></div>
		  </div>
		  <br></br>
		  
		  <!-- Table if a buyer is logged in -->
		  
		  <label v-if="notRightManager"><b>Prikaz komentara Rent A Car objekta</b></label>
		  <table border="1" class="tab" v-if="notRightManager">
		    <tr>
		      <th>Korisničko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td v-if="c.status == 'ACCEPTED'">{{c.userId}}</td>
		      <td v-if="c.status == 'ACCEPTED'">{{c.text}}</td>
		      <td v-if="c.status == 'ACCEPTED'">{{c.grade}}</td>
		    </tr>
		  </table>
		  <br></br>
		  
		  <!-- Table if a manager/admin is logged in -->
		  
		  <label v-if="rightAdmin"><b>Prikaz komentara Rent A Car objekta</b></label>
		  <table border="1" class="tab" v-if="rightAdmin">
		    <tr>
		      <th>Korisničko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		      <th>Status</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td v-if="c.status != 'PENDING'">{{c.userId}}</td>
		      <td v-if="c.status != 'PENDING'">{{c.text}}</td>
		      <td v-if="c.status != 'PENDING'">{{c.grade}}</td>
		      <td v-if="c.status != 'PENDING'">{{c.status}}</td>
		    </tr>
		  </table>
		  <br></br>
		  <label v-if="rightManager"><b>Prikaz komentara koji jos nisu prihvaceni/odbijeni</b></label>
		  <table border="1" class="tab" v-if="rightManager">
		    <tr>
		      <th>Korisničko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		      <th>Dodeli status</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td v-if="c.status == 'PENDING'">{{c.userId}}</td>
		      <td v-if="c.status == 'PENDING'">{{c.text}}</td>
		      <td v-if="c.status == 'PENDING'">{{c.grade}}</td>
		      <td v-if="c.status == 'PENDING'"><button v-on:click="acceptComment(c.id)">Potvrdi</button> <button v-on:click="declineComment(c.id)">Odbij</button></td>
		    </tr>
		  </table>
		  <br></br>
		  <label><b>Prikaz svih vozila Rent A Car objekta</b></label>
		  <table border="1" class="tab">
		    <tr>
		      <th>Marka</th>
		      <th>Model</th>
		      <th>Cena</th>
		      <th>Tip menjača</th>
		      <th>Tip vozila</th>
		      <th>Tip goriva</th>
		      <th>Potrošnja</th>
		      <th>Broj vrata</th>
		      <th>Broj putnika</th>
		      <th>Opis</th>
		      <th>Slika</th>
		      <th>Status</th>
		      <th>Izmeni vozilo</th>
		      <th>Obrisi vozilo</th>
		    </tr>
		    <tr v-for="(veh, index) in vehicles">
		      <td v-if="veh.isDeleted == false">{{veh.brand}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.model}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.price}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.gearBoxType}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.vehicleType}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.fuelType}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.consumption}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.doorsNumber}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.passengerCapacity}}</td>
		      <td v-if="veh.isDeleted == false">{{veh.description}}</td>
		      <td v-if="veh.isDeleted == false">
	          	  <img :src="veh.picturePath" alt="Picture" />
	          </td>
		      <td v-if="veh.isDeleted == false">{{veh.status}}</td>
		      <td v-if="veh.isDeleted == false">
		        <button v-if="rightManager" v-on:click="edit(veh.id)">Izmeni</button>
		        <p v-if="notRightManager">Opcija izmene je dostupna samo menadžerima ovog objekta</p>
		      </td>
		      <td v-if="veh.isDeleted == false">
		        <button v-if="rightManager" v-on:click="del(veh.id)">Obrisi</button>
		        <p v-if="notRightManager">Opcija brisanja je dostupna samo menadžerima ovog objekta</p>
		      </td>
		    </tr>
		  </table>
		  <br></br>
		  <button v-if="rightManager" v-on:click="addNewVehicle">Dodaj novo vozilo</button>
		</div>

	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/rentACars/' + p).then(response => {
			this.rentACar = response.data;
			
			const map = new ol.Map({
			  target: 'map',
			  layers: [
			    new ol.layer.Tile({
			      source: new ol.source.OSM(),
			    })
			  ],
			  view: new ol.View({
			    center: ol.proj.fromLonLat([this.rentACar.location.longitude, this.rentACar.location.latitude]),
			    zoom: 16,
			  })
			});
			
			const marker = new ol.layer.Vector({
		          source: new ol.source.Vector({
		            features: [
		              new ol.Feature({
		                geometry: new ol.geom.Point(
		                  ol.proj.fromLonLat([this.rentACar.location.longitude, this.rentACar.location.latitude])
		                )
		              })
		            ]
		          }),
		          style: new ol.style.Style({
		            image: new ol.style.Icon({
		              src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
		              anchor: [0.5, 1]
		            })
		          })
		        });
		        
		        map.addLayer(marker);

			axios.get('rest/users/currentUser').then(response => {
				if(response.status == 200 && response.data.role == "MANAGER" && response.data.rentACarObjectId == this.rentACar.id){
					this.rightManager = true;
					this.rightAdmin = true;
					this.notRightManager = false;
				}
				else if(response.status == 200 && response.data.role == "ADMINISTRATOR"){
					this.rightManager = false;
					this.rightAdmin = true;
					this.notRightManager = false;
				}
				else{
					this.rightManager = false;
					this.rightAdmin = false;
					this.notRightManager = true;
				}
				axios.get('rest/vehicles/getAvailableVehicles/' + p).then(response => {
					this.vehicles = response.data;
					axios.get('rest/comments/getByRentACar/' + this.rentACar.id).then(response => {
						this.comments = response.data;
						
						let count = 0;
						for (const _ in this.comments) {
			  				count++;
						}
						
						let i=0;
						for(i; i < count; i++){
							axios.get('rest/rentACars/' + this.comments[i].rentACarId).then(response => {
								
							});
						}
					});
				});
			});
		});
    },
    methods: {
    	addNewVehicle : function() {
			event.preventDefault();
			
			router.push(`/newVehicle/${this.rentACar.id}`);
    	},
    	
    	edit : function(id) {
			event.preventDefault();
			
			router.push(`/editVehicle/${id}`);
    	},
    	
    	del : function(id) {
			event.preventDefault();

			axios.get('rest/vehicles/' + id).then(response => {
				this.toDelete = response.data;
				this.toDelete.isDeleted = true;
				axios.put('rest/vehicles/' + this.toDelete.id, this.toDelete).then(response => location.reload());
			});
    	},
    	
    	acceptComment: function(id){
			event.preventDefault();

			axios.get('rest/comments/' + id).then(response => {
				this.toEdit = response.data;
				this.toEdit.status = "ACCEPTED";
				
				axios.get('rest/comments/getForGrade/' + this.toEdit.rentACarId).then(response => {
						this.commentsForGrade = response.data;
						
						const parts = this.commentsForGrade.split(",");
						
						parts.splice(0,1);
						 
						let sum=0;
						let count=0;   
						for (let part of parts) {
							count ++;
							sum += parseInt(part.trim(), 10); 
						}
						
						sum += this.toEdit.grade;
						count++;
						
						let average = sum/count;
						const roundedGrade = average.toFixed(2);

						axios.get('rest/rentACars/' + this.toEdit.rentACarId).then(response => {
							this.temp = response.data;
							
							this.temp.grade = roundedGrade;
							axios.put('rest/rentACars/' + this.temp.id, this.temp).then(response => {
								axios.put('rest/comments/' + id, this.toEdit).then(response => location.reload()).catch(error => console.log(error));
							});	
						});
				});
			});
		},
		
		declineComment: function(id){
			event.preventDefault();
			
			axios.get('rest/comments/' + id).then(response => {
				this.toEdit = response.data;
				this.toEdit.status = "DECLINED";
				
				axios.put('rest/comments/' + id, this.toEdit).then(response => location.reload()).catch(error => console.log(error));
			});
		}
    }
});