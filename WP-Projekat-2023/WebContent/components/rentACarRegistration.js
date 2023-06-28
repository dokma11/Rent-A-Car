/*import { Map, View } from '.../assets/ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
*/

Vue.component("rentACarRegistration", { 
	data: function () {
	    return {
			rentACar: {id:null, name: null, availableVehicles: [], workingHours: null, status: null, location: null, logoPath: null, grade: null },
			managers: {id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role:null, rentACarObjectId: null},
			address: null,
			notValid: null,
			allLocations: [],
			allRentACars: [],
			allUsers: [],
			alreadyAdded: false,
			notAdded: true
	    }
	},
	    template: `
	    	<div id="map-container">
	    		<label>Registracija Rent A Car objekta</label>
	    		<table>
	    			<tr>
	    				<td><label>Unesite naziv: </label></td>
	    				<td><input type="text" name="name" v-model="rentACar.name" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite lokaciju: </label></td>
	    				<td><input type="text" name="locationAddress" v-model="address" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite radno vreme (format: 00:00-24:00): </label></td>
	    				<td><input type="text" name="workingHours" v-model="rentACar.workingHours" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Postavite logo: </label></td>
	    				<td><input type="text" name="logoPath" v-model="rentACar.logoPath" /></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<label>Slobodni menadzeri</label>
	    		<table border="1" class="tab">
	    			<tr>
		    			<th>Korisnicko ime</th>
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
	    					<p v-if="alreadyAdded">Vec ste dodali menadzera za objekat</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="createManager">Kreiraj novog menadzera</button>
	    		<br></br>
	    		<button v-on:click="registerRentACar">Registruj objekat</button>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas popunite sva polja</p>
	    	</div>
	    `,
    mounted () {
        /*const map = new Map({
	    target: 'map-container', // Provide the ID or class of the DOM element where the map should be displayed
	    layers: [
	      new TileLayer({
	        source: new OSM(),
	      }),
	    ],
	    view: new View({
	      center: [0, 0], // Set the initial center coordinates of the map
	      zoom: 2, // Set the initial zoom level of the map
	    }),
	  });*/
	  axios.get('rest/locations/').then(response => this.allLocations = response.data);
	  
	  axios.get('rest/users/getAvailableManagers').then(response => this.managers = response.data);
	  
	  axios.get('rest/rentACars/').then(response => this.allRentACars = response.data);
	  
	  axios.get('rest/users/').then(response => this.allUsers = response.data);
    },
    methods: {
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
			
			if(!this.address){
                valid = false;
                this.notValid = true;
                document.getElementsByName("locationAddress")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("locationAddress")[0].style.border = "2px solid black";
                
                let count = 0;
				for (const _ in this.allLocations) {
	  				count++;
				}
				
				for(let i=0; i < count; i++){
					if(this.allLocations[i].address == this.address){
						this.rentACar.location = this.allLocations[i];
					}
				}
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
				this.rentACar.status = 'CLOSED';
				this.rentACar.grade = 0;
				axios.post('rest/rentACars/', this.rentACar).then(response => router.push(`/rentACar`)).catch(error => console.log(error));
			}
		}
    }
});