Vue.component("newOrder", { 
	data: function () {
	    return {
			vehicles:[],
			startDate: null,		
			endDate: null,
			shoppingCart: {id: null, userId: null, idsOfVehiclesInCart: [], price: 0},
			orders: [],
			loggedInUser: [],
			allShoppingCarts: []
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
	    		<button v-on:click="search">Pretrazi</button>
	    		<br></br>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Marka</th>
	    				<th>Model</th>
	    				<th>Cena</th>
	    				<th>Tip menjaca</th>
	    				<th>Vrsta</th>
	    				<th>Tip goriva</th>
	    				<th>Potrosnja</th>
	    				<th>Broj vrata</th>
	    				<th>Putnicki kapacitet</th>
	    				<th>Opis</th>
	    				<th>Slika</th>
	    				<th></th>
	    			</tr>
	    			<tr v-for="(v, index) in vehicles">
	    				<td v-if="v.isDeleted == false">{{v.brand}}</td>
	    				<td v-if="v.isDeleted == false">{{v.model}}</td>
	    				<td v-if="v.isDeleted == false">{{v.price}}</td>
	    				<td v-if="v.isDeleted == false">{{v.gearBoxType}}</td>
	    				<td v-if="v.isDeleted == false">{{v.vehicleType}}</td>
	    				<td v-if="v.isDeleted == false">{{v.fuelType}}</td>
	    				<td v-if="v.isDeleted == false">{{v.consumption}}</td>
	    				<td v-if="v.isDeleted == false">{{v.passengerCapacity}}</td>
	    				<td v-if="v.isDeleted == false">{{v.doorsNumber}}</td>
	    				<td v-if="v.isDeleted == false">{{v.description}}</td>
	    				<td v-if="v.isDeleted == false">
	    					<img :src="v.picturePath" alt="Logo" />
	    				</td>
	    				<td v-if="v.isDeleted == false">{{v.status}}</td>
	    				<td v-if="v.isDeleted == false"><button v-on:click="addToCart(v.id)">Dodaj u korpu</button></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="proceedToCheckout">Pregled korpe</button>
	    	</div>
	    `,
    mounted () {
        axios.get('rest/vehicles/').then(response => {
			this.vehicles = response.data;
        	axios.get('rest/orders/').then(response => {
				this.orders = response.data;
				axios.get('rest/users/currentUser').then(response => {
					this.loggedInUser = response.data;
					axios.get('rest/shoppingCarts/').then(response => {
						this.allShoppingCarts = response.data;
					})
				});
			});
        });
    },
    methods: {
		search : function() {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.orders) {
  				count++;
			}
			
			//should implement...
		},
		
    	addToCart : function(id) {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.vehicles) {
  				count++;
			}
			
			let i =0;
			for(i; i < count; i++){
				if(this.vehicles[i].id === id){
					this.shoppingCart.idsOfVehiclesInCart.push(this.vehicles[i].id);
					this.shoppingCart.price += this.vehicles[i].price;
					this.shoppingCart.userId = this.loggedInUser.id
				}
			}
    	},
    	
    	proceedToCheckout: function(){
			event.preventDefault();
			
			let cartCount = 0;
			for (const _ in this.allShoppingCarts) {
  				cartCount++;
			}
			
			axios.post('rest/shoppingCarts/', this.shoppingCart).then(response => (router.push(`/checkout/${cartCount}`)));
		}
    }
});