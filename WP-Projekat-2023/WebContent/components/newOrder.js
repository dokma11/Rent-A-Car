Vue.component("newOrder", { 
	data: function () {
	    return {
			vehicles:[], /*{id: null, brand: null, model: null, price: null, gearBoxType: null, owner: null, vehicleType: null, fuelType: null, 
						consumption: null, passengerCapacity: null, doorsNumber: null, description: null, picturePath: null, status: null},*/
			startDate: null,		
			endDate: null,
			shoppingCart: {id: null, responsibleUser: null, vehiclesInCart: null, price: 0}
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
	    		<table border="1" class="tab">
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
	    				<td><button v-on:click="addToCart(v.id)">Dodaj u korpu</button></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="proceedToCheckout">Pregled korpe</button>
	    	</div>
	    `,
    mounted () {
        axios.get('rest/vehicles/').then(response => (this.vehicles = response.data))
    },
    methods: {
    	addToCart : function(id) {
			event.preventDefault();
			
			for(let v of vehicles){
				if(v.id === id){
					this.shoppingCart.vehiclesInCart.add(v);
					this.shoppingCart.price += v.price;
					//this.shoppingCart.responsibleUser = this.loggedInUser
				}
			}
    	},
    	
    	proceedToCheckout: function(){
			axios.post('rest/shoppingCarts/' + this.shoppingCart).then(reponse => (router.push(`/checkout/${this.shoppingCart.id}`)));
		}
    }
});