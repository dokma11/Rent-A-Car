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
			sortOption: '',
			comment: [],
			leaveACommentClicked: false,
			commentNotValid: null,
			user: [],
			allRentACars: []
	    }
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	    		<label><b>Prikaz korisnikovih iznajmljivanja</b></label>
	    		<br></br>
	    		<div>
	    			<label style="margin-right: 1395px;">Pretrazi po: </label>
	    		</div>
	    		<div>
	    			<label style="margin-right: 5px;">Rent A Car objektu: </label>
	    			<input type="text" name="rentACarObject" v-model="searchOrder.rentACarFacility" style="margin-right: 10px;" />
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
						<option value="nameAscending">Naziv objekta A-Z</option>
						<option value="nameDescending">Naziv objekta Z-A</option>
					</select>
	    		</div>
	    		<table border="1" class="tab">
	    			<th>
	    				<td>Datum iznajmljivanja</td>
	    				<td>Trajanje najma</td>
	    				<td>Objekat iz kog je iznajmljeno</td>
	    				<td>Cena</td>
	    				<td>Status</td>
	    				<td>Ostavi komentar</td>
	    			</th>
	    			<tr v-for="(o,index) in orders">
	    				<td>{{o.rentalDate}}</td>
	    				<td>{{o.rentalDuration}}</td>
	    				<td>{{o.rentACarFacility}}</td>
	    				<td>{{o.price}}</td>
	    				<td>{{o.status}}</td>
	    				<td>
	    					<button v-if="o.status == 'RETURNED'" v=on:click="leaveAComment">Ostavi komentar</button>
	    					<p v-if="o.status != 'RETURNED'">Porudzbina mora biti vracena da biste mogli ostaviti komentar</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<br></br>
				<p v-if="notValid">Molimo Vas da popunite makar jedno polje za pretragu</p>	
				<br></br>
				<label v-if="leaveACommentClicked"><b>Ostavljanje komentara</b></label>
				<table v-if="leaveACommentClicked">
					<tr>
						<td>Unesite komentar: </td>
						<td><textarea v-model="comment.text" name="commentText" ></textarea></td>
					</tr>
					<tr>
						<td>Unesite ocenu: </td>
						<td><input type="number" min="1" max="5" v-model="comment.grade" name="commentGrade" /></td>
					</tr>
					<tr>
						<td></td>
						<td><button v-on:click="submit">Potvrdi</button></td>
					</tr>
				</table>
				<p v-if="commentNotValid">Molimo Vas da unesete validan komentar</p>
			</div>
	    `,
    mounted () {
        let p = this.$route.params.id
        axios.get('rest/users/' + p).then(response => {
			this.user = response.data
			axios.get('rest/orders/user/' + p).then(response => {
				this.orders = response.data
				axios.get('rest/rentACars/').then(response => this.allRentACars = response.data);		
				});
			});
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
		},
		
		leaveAComment: function(id){
			event.preventDefault();
			
			this.leaveACommentClicked = true;
			
			let count=0;
			for (const _ in this.allRentACars) {
  				count++;
			}
			
			let i=0;
			for(i; i < count; i++){
				if(this.allRentACars[i].id == id){
					this.comment.rentACar = this.allRentACars[i];
					break;
				}
			}
		},
		
		submit: function(){
			event.preventDefault();
			
			this.commentNotValid = false;
			
			if(!this.vehicle.brand){
				this.commentNotValid = true;
				document.getElementsByName("commentText")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("commentText")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.model){
				this.commentNotValid = true;
				document.getElementsByName("commentGrade")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("commentGrade")[0].style.border = "2px solid black";
			}
			
			if(!this.commentNotValid){
				this.comment.user = this.user;
				this.comment.status = 'PROCESSING'
				axios.post('rest/comments/', this.comment).then(response => location.reload());
			}
		}
    }
});