Vue.component("checkout", { 
	data: function () {
	    return {
			shoppingCart: [],
			vehiclesInCart: [],
			vehicle: [],
			newOrder: []
	    }
	},
	    template: `
	    	<div>
	    		<label><b>Pregled korpe</b></label>
	    		<br></br>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Marka</th>
	    				<th>Model</th>
	    				<th>Cena</th>
	    				<th>Slika</th>
	    				<th>Kolicina</th>
	    				<th>Izbaci vozilo iz korpe</th>
	    			</tr>
	    			<tr v-for="(v, index) in vehiclesInCart">
	    				<td>{{v.brand}}</td>
	    				<td>{{v.model}}</td>
	    				<td>{{v.price}}</td>
	    				<td>
	    					<img :src="v.picturePath" alt="Logo" />
	    				</td>
	    				<td>
					        <button v-on:click="decrementItem(v.id)">-</button>
					        <label>{{v.amount}}</label>
					        <button v-on:click="incrementItem(v.id)">+</button>
					    </td>	
					    <td>
					    	<button v-on:click="removeFromCart(v.id)">Izbaci</button>
					    </td>
	    			</tr>
	    		</table>
	    		<label>Ukupna cena korpe je {{shoppingCart.price}}</label>
	    		<br></br>
	    		<button v-on:click="rent">Iznajmi</button>
	    	</div>
	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/shoppingCarts/' + p).then(response => {
			this.shoppingCart = response.data;
			let idString = this.shoppingCart.idsOfVehiclesInCart.join(",");
			axios.get('rest/vehicles/getVehiclesInCart/' + idString).then(response => {
				this.vehiclesInCart = response.data;
			});
		});
    },
    methods: {
    	rent : function() {
			event.preventDefault();
			
			this.newOrder.idsOfRentedVehicles = this.shoppingCart.idsOfVehiclesInCart;
			this.newOrder.rentACarFacilityId = this.shoppingCart.idsOfVehiclesInCart;
			this.newOrder.rentalDate
			
			axios.post('rest/orders/', this.newOrder).then(reponse => (router.push(`/`)));
    	},
    	
    	decrementItem : function(id) {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.vehiclesInCart) {
  				count++;
			}
			
			for(let i=0; i < count; i++){
				if(this.vehiclesInCart[i].id == id){
					this.vehiclesInCart[i].amount--;
					break;
				}
			}
	        
	        this.shoppingCart.price -= this.vehiclesInCart[i].price;
	        
	        location.reload();
	    },
	    
	    incrementItem : function(id) {
	        event.preventDefault();

	        let count = 0;
			for (const _ in this.vehiclesInCart) {
  				count++;
			}
			
			for(let i=0; i < count; i++){
				if(this.vehiclesInCart[i].id == id){
					this.vehiclesInCart[i].amount++;
					break;
				}
			}
	        
	        this.shoppingCart.price += this.vehiclesInCart[i].price;
	        
	        location.reload();
	    },
	    
	    removeFromCart : function(id){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.shoppingCart.idsOfVehiclesInCart) {
  				count++;
			}

			let i=0;
			for(i; i < count; i++){	
				if(this.shoppingCart.idsOfVehiclesInCart[i] == id){
					//axios.get('rest/vehicles/' + id).then(response => this.vehicle = response.data);
					
				/*	for(let j=0; j < count; j++){
						if(this.vehiclesInCart[j].id == id){
							this.shoppingCart.price -= this.vehiclesInCart[j].price;
							this.shoppingCart.idsOfVehiclesInCart.splice(i, 1);
						}
					}*/
					/*
					for (const element of this.vehiclesInCart) {
						if(element.id == id){
							this.shoppingCart.price -= elemet.price;
							this.shoppingCart.idsOfVehiclesInCart.splice(i, 1);
						}
					}
					*/
				}
			}
		
			axios.put('rest/shoppingCarts/' + this.shoppingCart.id, this.shoppingCart).then(response => location.reload());
		}
    }
});