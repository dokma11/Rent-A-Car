Vue.component("checkout", { 
	data: function () {
	    return {
			shoppingCart: [],
			vehiclesInCart: []
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
					        <input type="number" v-model="v.count">
					        <button v-on:click="incrementItem(v.id)">+</button>
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
			
			axios.post('rest/orders/' + this.shoppingCart).then(reponse => (router.push(`/`)));
    	},
    	
    	decrementItem : function(id) {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.vehiclesInCart) {
  				count++;
			}
			
			for(let i=0; i < count; i++){
				if(this.vehiclesInCart[i].id == id){
					this.vehiclesInCart[i].count--;
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
					this.vehiclesInCart[i].count++;
					break;
				}
			}
	        
	        this.shoppingCart.price += this.vehiclesInCart[i].price;
	        
	        location.reload();
	    }
    }
});