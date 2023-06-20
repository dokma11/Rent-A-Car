Vue.component("rentalReview", { 
	data: function () {
	    return {
			orders: null,
			searchOrder: {id: null, rentACarFacility: null, rentalDate: null, price: null},
			startDate: null,
			endDate: null,
			startPrice: null,
			endPrice: null,
			notValid: null
	    }
	},
	    template: `
	    	<div>
	    		<table border="1">
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
				<button v-on:click="search()">Pretrazi</button>	    
				<br></br>
				<label>Sortiraj prema: </label>
				<select>
					<option>Cena rastuce</option>
					<option>Cena opadajuce</option>
					<option>Najskorije</option>
					<option>Najstarije</option>
					<option>Imenu</option>
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
			this.notValid = false;
			
			if(this.startDate != null || this.endDate != null || this.startPrice != null || this.endPrice != null || this.searchOrder.rentACarFacility != null){
				//ide pretraga
			}
			else{
				this.notValid = true;
			}
    	}
    }
});