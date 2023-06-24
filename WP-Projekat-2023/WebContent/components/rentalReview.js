Vue.component("rentalReview", { 
	data: function () {
	    return {
			orders: null,
			searchOrder: {id: null, rentACarFacility: null, rentalDate: null, price: null},
			startDate: null,
			endDate: null,
			startPrice: null,
			endPrice: null,
			notValid: null,
			sortOption: ''
	    }
	},
	    template: `
	    	<div>
	    		<table border="1" class="tab">
	    			<th>
	    				<td>Datum iznajmljivanja</td>
	    				<td>Trajanje najma</td>
	    				<td>Cena</td>
	    				<td>Status</td>
	    			</th>
	    			<tr v-for="(o,index) in orders">
	    				<td>{{o.rentalDate}}</td>
	    				<td>{{o.rentalDuration}}</td>
	    				<td>{{o.price}}</td>
	    				<td>{{o.status}}</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<label>Pretrazi</label>
	    		<table>
	    			<tr>
	    				<td><label>Objekat iz kog je iznajmljen</label></td>
	    			</tr>
	    			<tr>
	    				<td><input type="text" name="rentACarObject" v-model="searchOrder.rentACarFacility" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Cena</label></td>
	    			</tr>
	    			<tr>
	    				<td>Pocetak opsega</td>
	    				<td>Kraj opsega</td>
	    			</tr>
	    			<tr>
	    				<td><input type="text" name="startPrice" v-model="startPrice" /></td>
	    				<td><input type="text" name="endPrice" v-model="endPrice" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Datum iznajmljivanja</label></td>
	    			</tr>
	    			<tr>
	    				<td>Pocetak opsega</td>
	    				<td>Kraj opsega</td>
	    			</tr>
	    			<tr>
						<td><input type="text" name="startDate" v-model="startDate" /></td>
	    				<td><input type="text" name="endDate" v-model="endDate" /></td>	    			
	    			</tr>
	    		</table>
				<button v-on:click="search">Pretrazi</button>	    
				<br></br>
				<label>Sortiraj prema: </label>
				<select v-model="sortOption" @change="sort">
					<option value="priceAscending">Cena rastuce</option>
					<option value="priceDescending">Cena opadajuce</option>
					<option value="earliest">Najskorije</option>
					<option value="oldest">Najstarije</option>
					<option value="nameAscending">Naziv objekta A-Z</option>
					<option value="nameDescending">Naziv objekta Z-A</option>
				</select>
				<p v-if="notValid">Molimo Vas da popunite makar jedno polje za pretragu</p>	
			</div>
	    `,
    mounted () {
        axios.get('rest/orders/').then(response => (this.orders = response.data))
    },
    methods: {
    	search : function() {
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
  			
  			if (this.searchOrder.rentACarFacility || this.startDate|| this.endDate || this.startPrice || this.endPrice) {
			  for (let i = 0; i < count; i++) {
			    let item = temp[i];
			    let rentACarFacilityMatch = !this.searchOrder.rentACarFacility || item.rentACarFacility.toLowerCase().includes(this.searchOrder.rentACarFacility.toLowerCase());
			    let endPriceMatch = !this.endPrice || item.price < endPrice;
			    let startPriceMatch = !this.startPrice || item.price > startPrice;
				let endDateMatch = !this.endDate || item.rentalDate < endDate;
			    let startDateMatch = !this.startDate || item.rentalDate > startDate ;			  
			    if (rentACarFacilityMatch && endPriceMatch && startPriceMatch && endDateMatch && startDateMatch) {
			      this.orders.push(item);
			      entered = true;
			    }
			  }
			}

			if(!entered){
				this.orders = temp;
				this.notValid = true;
			}
    	},
    	
    	sort: function(){
			event.preventDefault();
			let count = 0;
			for (const _ in this.rentACar) {
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
      		else if (this.sortOption === "nameAscending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentACarFacility > this.orders[j + 1].rentACarFacility ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
      		else if (this.sortOption === "nameDescending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentACarFacility < this.orders[j + 1].rentACarFacility ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
      		else if (this.sortOption === "earliest") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentalDate > this.orders[j + 1].rentalDate ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
      		else if(this.sortOption === "oldest") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.orders[j].rentalDate < this.orders[j + 1].rentalDate ) {
				        
				        [this.orders[j], this.orders[j + 1]] = [this.orders[j + 1], this.orders[j]];
				      
				      }
				    }
				}
      		}
		}
    }
});