Vue.component("checkout", { 
	data: function () {
	    return {
			shoppingCart: [],
			vehiclesInCart: [],
			vehicle: [],
			newOrder: {id: null, idsOfRentedVehicles: [], idsOfRentACarFacilities: [], rentalDateStart: null, rentalDateEnd: null, price: null, userId: null, status: null, cancellationDate: null},
			loggedInUser: []
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
			
				const dataValues = Object.values(response.data);
			    if (Array.isArray(dataValues)) {
			        this.vehiclesInCart = dataValues;
			
			        this.vehiclesInCart.forEach(vehicle => {
			            vehicle.amount = 1;
			        });
			    } else {
			        console.error('Response data is not an array:', dataValues);
			    }
			});
		});
    },
    methods: {
    	rent : function() {
			event.preventDefault();
			
			this.newOrder.status = 'PROCESSING';
			this.newOrder.userId = this.shoppingCart.userId
			this.newOrder.rentalDateStart = this.shoppingCart.rentalDateStart;
			this.newOrder.rentalDateEnd = this.shoppingCart.rentalDateEnd;
			this.newOrder.cancellationDate = "0001-01-01";
			
			let ccount = 0;
			for (const _ in this.shoppingCart.idsOfVehiclesInCart) {
  				ccount++;
			}
			
			this.newOrder.idsOfRentedVehicles = [];
			let j = 0;
			for(j; j < ccount; j++){
				this.newOrder.idsOfRentedVehicles.push(this.shoppingCart.idsOfVehiclesInCart[j]);
			}
			
			let count = 0;
			for (const _ in this.vehiclesInCart) {
  				count++;
			}
			
			this.newOrder.idsOfRentACarFacilities = [];
			let i = 0;
			for(i; i < count; i++){
				if(!this.newOrder.idsOfRentACarFacilities.includes(this.vehiclesInCart[i].ownerId)){
					this.newOrder.idsOfRentACarFacilities.push(this.vehiclesInCart[i].ownerId)
				}
			}
			
			axios.get('rest/users/' + this.newOrder.userId).then(response => {
				this.loggedInUser = response.data;
				
				axios.get('rest/buyerTypes/getGold').then(response => {
					   this.goldBuyerType = response.data;
					   
					   axios.get('rest/buyerTypes/getSilver').then(response => {
						   this.silverBuyerType = response.data;
					   
					   	   if(this.loggedInUser.buyerTypeId == this.goldBuyerType.id){
							   var discount = this.shoppingCart.price * 0.08;
							   var discountedPrice = this.shoppingCart.price - discount;

							   this.loggedInUser.collectedPointsNumber += discountedPrice * 133 / 1000;
							   							   
							   this.newOrder.price = discountedPrice;
						   }
						   else if(this.loggedInUser.buyerTypeId == this.silverBuyerType.id){
							   var discount = this.shoppingCart.price * 0.05;
							   var discountedPrice = this.shoppingCart.price - discount;

							   this.loggedInUser.collectedPointsNumber += discountedPrice * 133 / 1000;
							   							   
							   this.newOrder.price = discountedPrice;
						   }
						   else{
							   this.loggedInUser.collectedPointsNumber += this.shoppingCart.price * 133 / 1000;
							   this.newOrder.price = this.shoppingCart.price;
						   }
						   
						   
						   
						   if(this.loggedInUser.collectedPointsNumber >= this.goldBuyerType.collectedPointsRequired){
							   this.loggedInUser.buyerTypeId = this.goldBuyerType.id;
						   }
						   else if(this.loggedInUser.collectedPointsNumber >= this.silverBuyerType.collectedPointsRequired){
							   this.loggedInUser.buyerTypeId = this.silverBuyerType.id;
						   }
						   else{
							   this.loggedInUser.buyerTypeId = "0";
						   }
						   
						   axios.put('rest/users/' + this.loggedInUser.id, this.loggedInUser).then(response => {
								axios.post('rest/orders/', this.newOrder).then(response => (router.push(`/usersProfile/${this.loggedInUser.id}`)));
							});
					   });
				  });
			});
    	},
    	
    	decrementItem : function(id) {
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.vehiclesInCart) {
  				count++;
			}
			
			for(let i=0; i < count; i++){
				if(this.vehiclesInCart[i].id == id && this.vehiclesInCart[i].amount > 1){
					this.vehiclesInCart[i].amount--;
					this.shoppingCart.price -= this.vehiclesInCart[i].price;
					break;
				}
			}
	        
	        axios.put('rest/shoppingCarts/' + this.shoppingCart.id, this.shoppingCart).then(response => {
				axios.put('rest/vehicles/' + this.vehiclesInCart[i].id, this.vehiclesInCart[i]).then(response => {
					location.reload();	
				});	
			});
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
					this.shoppingCart.price += this.vehiclesInCart[i].price;
					break;
				}
			}
	        
	        axios.put('rest/shoppingCarts/' + this.shoppingCart.id, this.shoppingCart).then(response => {
				axios.put('rest/vehicles/' + this.vehiclesInCart[i].id, this.vehiclesInCart[i]).then(response => {
					location.reload();	
				});	
			});
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
					for(let j=0; j < count; j++){
						if(this.vehiclesInCart[j].id == id){
							for(let k=0; k < this.vehiclesInCart[j].amount; k++){
								this.shoppingCart.price -= this.vehiclesInCart[j].price;
							}
							this.shoppingCart.idsOfVehiclesInCart.splice(i, 1);
						}
					}
					
				}
			}
		
			axios.put('rest/shoppingCarts/' + this.shoppingCart.id, this.shoppingCart).then(response => location.reload());
		}
    }
});