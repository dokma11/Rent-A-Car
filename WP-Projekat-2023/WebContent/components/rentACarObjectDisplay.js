Vue.component("rentACarObjectDisplay", { 
	data: function () {
	    return {
			rentACar: [],
			comments: [],
			user: [],
			vehicles: []
	    }
	},
	    template: `
	      <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
		  <label><b>Prikaz Rent A Car objekta</b></label>
		  <br></br>
		  <table border="1" class="tab">
		    <tr>
		      <th>Naziv</th>
		      <th>Radno vreme</th>
		      <th>Status</th>
		      <th>Lokacija</th>
		      <th>Logo</th>
		      <th>Ocena objekta</th>
		    </tr>
		    <tr>
		      <td>{{rentACar.name}}</td>
		      <td>{{rentACar.workingHours}}</td>
		      <td>{{rentACar.status}}</td>
		      <td>{{rentACar.location.address}}</td>
		      <td>
		        <img :src="rentACar.logoPath" alt="Logo" />
		      </td>
		      <td>{{rentACar.grade}}</td>
		    </tr>
		  </table>
		  <br></br>
		  
		  <!-- Table if a buyer is logged in -->
		  
		  <label v-if="user.role == 'BUYER'"><b>Prikaz komentara Rent A Car objekta</b></label>
		  <table border="1" class="tab" v-if="user.role == 'BUYER'">
		    <tr>
		      <th>Korisnicko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td v-if="c.status == 'ACCEPTED'">{{c.user.username}}</td>
		      <td v-if="c.status == 'ACCEPTED'">{{c.text}}</td>
		      <td v-if="c.status == 'ACCEPTED'">{{c.grade}}</td>
		    </tr>
		  </table>
		  <br></br>
		  
		  <!-- Table if a manager/admin is logged in -->
		  
		  <label v-if="user.role != 'BUYER'"><b>Prikaz komentara Rent A Car objekta</b></label>
		  <table border="1" class="tab" v-if="user.role != 'BUYER'">
		    <tr>
		      <th>Korisnicko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td v-if="c.status != 'PENDING'">{{c.user.username}}</td>
		      <td v-if="c.status != 'PENDING'">{{c.text}}</td>
		      <td v-if="c.status != 'PENDING'">{{c.grade}}</td>
		    </tr>
		  </table>
		  <br></br>
		  <label v-if="user.role == 'MANAGER' && user.rentACarObjectId == v.id"><b>Prikaz komentara koji jos nisu prihvaceni/odbijeni</b></label>
		  <table border="1" class="tab" v-if="user.role == 'MANAGER' && user.rentACarObjectId == v.id">
		    <tr>
		      <th>Korisnicko ime</th>
		      <th>Tekst</th>
		      <th>Ocena</th>
		      <th>Dodeli status</th>
		    </tr>
		    <tr v-for="(c, index) in comments">
		      <td>{{c.user.username}}</td>
		      <td>{{c.text}}</td>
		      <td>{{c.grade}}</td>
		      <td><button v-on:click="acceptComment(c.id)">Potvrdi</button> <button v-on:click="declineComment(c.id)">Odbij</button></td>
		    </tr>
		  </table>
		  <br></br>
		  <label><b>Prikaz svih vozila Rent A Car objekta</b></label>
		  <table border="1" class="tab">
		    <tr>
		      <th>Marka</th>
		      <th>Model</th>
		      <th>Cena</th>
		      <th>Tip menjaca</th>
		      <th>Tip vozila</th>
		      <th>Tip goriva</th>
		      <th>Potrosnja</th>
		      <th>Broj vrata</th>
		      <th>Broj putnika</th>
		      <th>Opis</th>
		      <th>Slika</th>
		      <th>Status</th>
		      <th>Izmeni vozilo</th>
		      <th>Obrisi vozilo</th>
		    </tr>
		    <tr v-for="(veh, index) in vehicles">
		      <td>{{veh.brand}}</td>
		      <td>{{veh.model}}</td>
		      <td>{{veh.price}}</td>
		      <td>{{veh.gearBoxType}}</td>
		      <td>{{veh.vehicleType}}</td>
		      <td>{{veh.fuelType}}</td>
		      <td>{{veh.consumption}}</td>
		      <td>{{veh.doorsNumber}}</td>
		      <td>{{veh.passengerCapacity}}</td>
		      <td>{{veh.description}}</td>
		      <td>
	          	  <img :src="veh.picturePath" alt="Picture" />
	          </td>
		      <td>{{veh.status}}</td>
		      <td>
		        <button v-if="user.role == 'MANAGER' && user.rentACarObjectId == veh.id" v-on:click="edit(veh.id)">Izmeni</button>
		        <p v-if="user.role != 'MANAGER'">Opcija izmene je dostupna samo menadžerima ovog objekta</p>
		      </td>
		      <td>
		        <button v-if="user.role == 'MANAGER' && user.rentACarObjectId == veh.id" v-on:click="del(veh.id)">Obrisi</button>
		        <p v-if="user.role != 'MANAGER'">Opcija brisanja je dostupna samo menadžerima ovog objekta</p>
		      </td>
		    </tr>
		  </table>
		  <br></br>
		  <button v-if="user.role == 'MANAGER'" v-on:click="addNewVehicle">Dodaj novo vozilo</button>
		</div>

	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/rentACars/' + p).then(response => (this.rentACar = response.data));
        
		axios.get('rest/users/currentUser').then(response => (this.user = response.data));
        
        axios.get('rest/vehicles/getAvailableVehicles/' + p).then(response => (this.vehicles = response.data));
        
        axios.get('rest/comments/').then(response => (this.comments = response.data));
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
			
			let count = 0;
			for (const _ in this.vehicles) {
  				count++;
			}
			
			let i=0;
			for(i; i < count; i++){
				this.vehicles[i].ownerId = -1	
			}
			
			location.reload();
    	},
    	
    	acceptComment: function(id){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.comments) {
  				count++;
			}
			
			let i=0;
			for(i; i < count; i++){
				if(this.comments[i].id == id){
					this.comments[i].status = "ACCEPTED";
					break;
				}
			}
			
			axios.put('rest/comments/' + id, this.comments[i]).then(response => location.reload()).catch(error => console.log(error));
		},
		
		declineComment: function(id){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.comments) {
  				count++;
			}
			
			let i=0;
			for(i; i < count; i++){
				if(this.comments[i].id == id){
					this.comments[i].status = "DECLINED";
					break;
				}
			}
			
			axios.put('rest/comments/' + id, this.comments[i]).then(response => location.reload()).catch(error => console.log(error));
		}
    }
});