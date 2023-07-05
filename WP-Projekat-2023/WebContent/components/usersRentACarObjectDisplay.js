Vue.component("usersRentACarObjectDisplay", { 
	data: function () {
	    return {
			manager: [],
			rentACar: [],
			orders: [],
			buyers: [],
			toEdit: [],
			rejectedOrder: false,
			pickUpInvalid: false,
			vehiclesToEdit: [],
			searchOrder: {id: null, rentACarFacility: null, rentalDateStart: null, rentalDateEnd: null, price: null},
			startDate: null, 
			endDate: null, 
			startPrice: null, 
			endPrice: null,
			sortOption: ''
	    }
	},
	    template: `
	    <div>
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
	    		<label><b>Prikaz porudzbina koje su vezane za objekat</b></label
				<div>
	    			<label style="margin-right: 5px;">Ceni: </label>
	    			<input type="text" name="startPrice" v-model="startPrice" placeholder="Pocetak opsega" style="margin-right: 5px;" />
	    			<input type="text" name="endPrice" v-model="endPrice" placeholder="Kraj opsega" style="margin-right: 10px;" />
	    			<label style="margin-right: 5px;">Datumu iznajmljivanja: </label>
	    			<input type="text" name="startDate" v-model="startDate" placeholder="Pocetak opsega" style="margin-right: 5px;" />
	    			<input type="text" name="endDate" v-model="endDate" placeholder="Kraj opsega" style="margin-right: 10px;" />
	    			<button v-on:click="search" style="margin-right: 10px;">Pretrazi</button>	
	    			<select v-model="sortOption" @change="sort">
	    				<option value="">Sortiraj po: </option>
						<option value="priceAscending">Cena rastuce</option>
						<option value="priceDescending">Cena opadajuce</option>
						<option value="earliest">Najskorije</option>
						<option value="oldest">Najstarije</option>
					</select>
				</div>
	    		<table border="1" class="tab"> 
	    			<tr>
	    				<th>Kupac</th>
	    				<th>Datum iznajmljivanja</th>
	    				<th>Datum povratka</th>
	    				<th>Cena</th>
	    				<th>Status</th>
	    				<th>Promeni status</th>
	    			</tr>
	    			<tr v-for="(o,index) in orders">
	    				<td>{{o.userId}}</td>
	    				<td>{{o.rentalDateStart}}</td>
	    				<td>{{o.rentalDateEnd}}</td>
	    				<td>{{o.price}}</td>
	    				<td>{{o.status}}</td>
	    				<td>
	    					<button v-if="o.status == 'PROCESSING'" v-on:click="acceptOrder(o.id)">Odobri</button><button v-if="o.status == 'PROCESSING'" v-on:click="declineOrder(o.id)">Odbij</button>
	    					<button v-else-if="o.status == 'APPROVED'" v-on:click="pickUpOrder(o.id)">Oznaci kao preuzeto</button>
	    					<button v-else-if="o.status == 'PICKED_UP'" v-on:click="returnOrder(o.id)">Oznaci kao vraceno</button>
	    					<p v-else-if="o.status == 'RETURNED'">Porudzbina je vracena</p>
	    					<p v-else-if="o.status == 'REJECTED'">Porudzbina je odbijena</p>
	    					<p v-else-if="o.status == 'CANCELED'">Porudzbina je otkazana</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<table v-if="rejectedOrder">
	    			<tr>
	    				<td>Razlog odbijanja proudzbine</td>
	    				<td><textarea /></td>
	    			</tr>
	    			<tr>
	    				<td></td>
	    				<td><button v-on:click="submitRejection">Potvrdi</button></td>
	    			</tr>
	    		</table>
	    		<p v-if="pickUpInvalid">Ne mozete oznaciti porudzbinu kao preuzetu pre datuma iznjamljivanja</p>
	    	</div>
	    </div>
	    `,
    mounted () {
        let p = this.$route.params.id;
        axios.get('rest/users/' + p).then(response => {
			this.manager = response.data;
			axios.get('rest/rentACars/' + this.manager.rentACarObjectId).then(response => {
				this.rentACar = response.data;
				axios.get('rest/orders/rentACar/' + this.manager.rentACarObjectId).then(response => {
					this.orders = response.data;
				});
			});
		});
    },
    methods: {
    	acceptOrder : function(id) {
			event.preventDefault();
			
			axios.get('rest/orders/' + id).then(response => {
				this.toEdit = response.data;
				this.toEdit.status = "APPROVED";				
				
				axios.put('rest/orders/' + this.toEdit.id, this.toEdit).then(response => {
					location.reload();
				});
			});
    	},
    	
    	declineOrder : function(id) {
			event.preventDefault();
			
			axios.get('rest/orders/' + id).then(response => {
				this.toEdit = response.data;
				this.toEdit.status = "REJECTED";				
				
				axios.put('rest/orders/' + this.toEdit.id, this.toEdit).then(response => {
					this.rejectedOrder = true;
				});
			});
    	},
    	
    	pickUpOrder : function(id) {
			event.preventDefault();
			
			axios.get('rest/orders/' + id).then(response => {
				this.toEdit = response.data;
				
				var rentalDateStart = new Date(this.toEdit.rentalDateStart);
			
			    var currentDate = new Date();
			    rentalDateStart.setHours(0, 0, 0, 0);
			    currentDate.setHours(0, 0, 0, 0);
				
				if(rentalDateStart.getTime() === currentDate.getTime()){
					this.toEdit.status = "PICKED_UP";				
				
					axios.put('rest/orders/' + this.toEdit.id, this.toEdit).then(response => {
						let idList = this.toEdit.idsOfRentedVehicles.join(",");
						axios.put('rest/vehicles/editStatusByOrder/' + idList).then(response => {
							
						  	location.reload();
						});
					});
				}else{
					this.pickUpInvalid = true;
				}
			});
    	},
    	
    	returnOrder : function(id) {
			event.preventDefault();
			
			axios.get('rest/orders/' + id).then(response => {
				this.toEdit = response.data;
				this.toEdit.status = "RETURNED";				
				
				axios.put('rest/orders/' + this.toEdit.id, this.toEdit).then(response => {
						let idList = this.toEdit.idsOfRentedVehicles.join(",");
						axios.put('rest/vehicles/editStatusByOrder/' + idList).then(response => {
							
						  	location.reload();
						});
				});
			});
    	},
    	
    	submitRejection : function(){
			event.preventDefault();
			
			//vrv treba razlog negde da se sacuva jos cu videti
			
			location.reload();
		},
		
		search : function(){
			event.preventDefault();
			
			let temp = [];
			temp = this.orders;
			this.orders = [];	
  			let count = 0;
			for (const _ in temp) {
  				count++;
			}
  			let entered = false;
  			this.notValid = false;
  			
  			if (thisthis.startDate|| this.endDate || this.startPrice || this.endPrice) {
			  for (let i = 0; i < count; i++) {
			    let item = temp[i];
			    let endPriceMatch = !this.endPrice || item.price < endPrice;
			    let startPriceMatch = !this.startPrice || item.price > startPrice;
				let endDateMatch = !this.endDate || (item.rentalDateStart < endDate && item.rentalDateEnd < endDate);
			    let startDateMatch = !this.startDate || (item.rentalDateStart > startDate && item.rentalDateEnd < startDate);			  
			    if (rentACarFacilityMatch && endPriceMatch && startPriceMatch && endDateMatch && startDateMatch) {
			      this.orders.push(item);
			      entered = true;
			    }
			  }
			}

			if(!entered){
				this.orders = temp;
			}
		},
		
		sort : function(){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.orders) {
  				count++;
			}
			
			if (this.sortOption === "priceAscending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].price > this.orders[j + 1].price ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		} 
      		else if (this.sortOption === "priceDescending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].price < this.orders[j + 1].price ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}     		
			}
      		else if (this.sortOption === "earliest") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentalDateStart > this.orders[j + 1].rentalDateStart ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
      		else if(this.sortOption === "oldest") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentalDateStart < this.orders[j + 1].rentalDateStart ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
		}
    }
});