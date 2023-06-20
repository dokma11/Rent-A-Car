Vue.component("newOrder", { 
	data: function () {
	    return {
			vehicles:[], /*{id: null, brand: null, model: null, price: null, gearBoxType: null, owner: null, vehicleType: null, fuelType: null, 
						consumption: null, passengerCapacity: null, doorsNumber: null, description: null, picturePath: null, status: null},*/
			startDate: null,		
			endDate: null
	    }
	},
	    template: `
	    	<div>	
	    		<label>Iznajmljivanje vozila</label>
	    		<br></br>
	    		<label>Unesite opseg datuma</label>
	    		<table>
	    			<tr>
	    				<td>Pocetak opsega</td>
	    				<td>Kraj opsega</td>
	    			</tr>
	    			<tr>
	    				<td><input type="date" name="startDate" v-model="startDate" /></td>
	    				<td><input type="date" name="endDate" v-model="endDate" /></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<table border="1">
	    			<th>
	    				<td>Marka</td>
	    				<td>Model</td>
	    				<td>Cena</td>
	    				<td>Tip</td>
	    				<td>Vrsta</td>
	    				<td>Tip goriva</td>
	    				<td>Potrosnja</td>
	    				<td>Broj vrata</td>
	    				<td>Putnicki kapacitet</td>
	    				<td>Opis</td>
	    				<td>Slika</td>
	    				<td></td>
	    			</th>
	    			<tr v-for="(v, index) in vehicles">
	    				<td>{{v.brand}}</td>
	    				<td>{{v.model}}</td>
	    				<td>{{v.price}}</td>
	    				<td>{{v.gearBoxType}}</td>
	    				<td>{{v.owner}}</td>
	    				<td>{{v.vehicleType}}</td>
	    				<td>{{v.fuelType}}</td>
	    				<td>{{v.consumption}}</td>
	    				<td>{{v.passengerCapacity}}</td>
	    				<td>{{v.doorsNumber}}</td>
	    				<td>{{v.description}}</td>
	    				<td>{{v.picturePath}}</td>
	    				<td>{{v.status}}</td>
	    				<td><button v-on:click="addToCart">Dodaj u korpu</button></td>
	    			</tr>
	    		</table>
	    	</div>
	    `,
    mounted () {
        axios.get('rest/vehicles/').then(response => (this.vehicles = response.data))
    },
    methods: {
    	addToCart : function() {
			
    	}
    }
});