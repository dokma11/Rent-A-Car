Vue.component("rentACarObjectDisplay", { 
	data: function () {
	    return {
			rentACar: [],
			comments: []
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
	    		<label><b>Prikaz komentara Rent A Car objekta</b></label>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Korisnicko ime</th>
	    				<th>Tekst</th>
	    				<th>Ocena</th>
	    			</tr>
	    			<tr v-for="(c, index) in comments">
	    				<td>{{c.user.username}}</td>
	    				<td>{{c.text}}</td>
	    				<td>{{c.grade}}</td>
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
	    			<tr v-for="(v, index) in rentACar.availableVehicles">
	    				<td>{{v.brand}}</td>
	    				<td>{{v.model}}</td>
	    				<td>{{v.price}}</td>
	    				<td>{{v.gearBoxType}}</td>
	    				<td>{{v.vehicleType}}</td>
	    				<td>{{v.fuelType}}</td>
	    				<td>{{v.consumption}}</td>
	    				<td>{{v.numberOfDoors}}</td>
	    				<td>{{v.passengerCapacity}}</td>
	    				<td>{{v.description}}</td>
	    				<td>{{v.picturePath}}</td>
	    				<td>{{v.status}}</td>
	    				<td><button v-on:click="edit(v.id)">Izmeni</button></td>
	    				<td><button v-on:click="delete(v.id)">Obrisi</button></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="addNewVehicle">Dodaj novo vozilo</button>
	    	</div>
	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/rentACars/' + p).then(response => (this.rentACar = response.data));
    },
    methods: {
    	addNewVehicle : function() {
			router.push(`/newVehicle/${this.rentACar.id}`);
    	},
    	
    	edit : function(id) {

    	},
    	
    	delete : function(id) {

    	}
    }
});