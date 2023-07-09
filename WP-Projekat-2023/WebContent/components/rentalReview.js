Vue.component("rentalReview", { 
	data: function () {
	    return {
			orders: [],
			searchOrder: {id: null, rentACarFacility: null, rentalDateStart: null, rentalDateEnd: null, price: null},
			startDate: null,
			endDate: null,
			startPrice: null,
			endPrice: null,
			notValid: null,
			sortOption: '',
			comment: {id: null, userId: null, rentACarId: null, text: null, grade: null, status: null},
			commentsRentACar: [],
			temp: [],
			leaveACommentClicked: false,
			commentNotValid: null,
			user: [],
			allRentACars: [],
			rentACarsForOrder: [],
			toEdit: [],
			rentACarsForComment: [],
			dateNotValid: false,
			ordersForSus: [],
			silverBuyerType: [],
			goldBuyerType: [],
			commentsForGrade: []
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
	    			<input type="text" name="startPrice" v-model="startPrice" placeholder="Početak opsega" style="margin-right: 5px;" />
	    			<input type="text" name="endPrice" v-model="endPrice" placeholder="Kraj opsega" style="margin-right: 10px;" />
	    			<label style="margin-right: 5px;">Datumu iznajmljivanja: </label>
	    			<input type="date" name="startDate" v-model="startDate" placeholder="Početak opsega" style="margin-right: 5px;" />
	    			<input type="date" name="endDate" v-model="endDate" placeholder="Kraj opsega" style="margin-right: 10px;" />
	    			<button v-on:click="search" style="margin-right: 10px;">Pretrazi</button>	
	    			<select v-model="sortOption" @change="sort">
	    				<option value="">Sortiraj po: </option>
						<option value="priceAscending">Cena rastuće</option>
						<option value="priceDescending">Cena opadajuće</option>
						<option value="earliest">Najskorije</option>
						<option value="oldest">Najstarije</option>
						<option value="nameAscending">Naziv objekta A-Z</option>
						<option value="nameDescending">Naziv objekta Z-A</option>
					</select>
					<button v-on:click="reset">Reset</button>	
	    		</div>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Datum iznajmljivanja</th>
	    				<th>Datum povratka</th>
	    				<th>Cena</th>
	    				<th>Status</th>
	    				<th>Otkaži porudžbinu</th>
	    				<th>Ostavi komentar</th>
	    			</tr>
	    			<tr v-for="(o,index) in orders">
	    				<td>{{o.rentalDateStart}}</td>
	    				<td>{{o.rentalDateEnd}}</td>
	    				<td>{{o.price}}</td>
	    				<td>{{o.status}}</td>
	    				<td>
	    					<button v-if="o.status == 'PROCESSING'" v-on:click="cancel(o.id)">Otkazi</button>
	    					<p v-if="o.status != 'PROCESSING'">Porudžbina mora biti u procesu obrade da biste je mogli otkazati</p>
	    				</td>
	    				<td>
	    					<button v-if="o.status == 'RETURNED'" v-on:click="leaveAComment(o.id)">Ostavi komentar</button>
	    					<p v-if="o.status != 'RETURNED'">Porudžbina mora biti vracena da biste mogli ostaviti komentar</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<br></br>
				<p v-if="notValid">Molimo Vas da popunite makar jedno polje za pretragu</p>	
				<br></br>
				<label v-if="leaveACommentClicked"><b>Ostavljanje komentara</b></label>
				<table v-if="leaveACommentClicked">
					<tr>
						<td>Izaberite objekat koji komentarišete:</td>
						<td>
							<select v-model="commentsRentACar" name="commentComboBox">
								<option v-for="rentACar in rentACarsForComment" :value="rentACar.id">{{rentACar.name}}</option>
							</select>
						</td>
					</tr>
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
						<td><button v-on:click="submit">Potvrdi</button> <button v-on:click="cancel">Otkazi</button></td>
					</tr>
				</table>
				<p v-if="commentNotValid">Molimo Vas da unesete validan komentar</p>
			</div>
	    `,
    mounted () {
        let p = this.$route.params.id
        axios.get('rest/users/' + p).then(response => {
			this.user = response.data;
			axios.get('rest/orders/user/' + p).then(response => {
				this.orders = response.data;
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
			    let rentACarFacilityMatch = true;
			    let endPriceMatch = true;
			    let startPriceMatch = true;
				let endDateMatch = true;
			    let startDateMatch = true;			  
			    
			    let rentACarEntered = false;
			    
			    if(this.searchOrder.rentACarFacility){
					let rcount = 0;
					for (const _ in this.allRentACars) {
			  			rcount++;
					}
						
					for(let j=0; j < rcount; j++){
						if((this.allRentACars[j].name.toLowerCase().includes(this.searchOrder.rentACarFacility.toLowerCase())) &&
						 item.idsOfRentACarFacilities.includes(this.allRentACars[j].id)){
							rentACarEntered = true;
						}
					}	
					
					if(!rentACarEntered){
						rentACarFacilityMatch = false;
					}
				}
			    	    
			    if(this.endDate && this.startDate){
					const startDate = new Date(this.startDate);
					const endDate = new Date(this.endDate);
					
					if(startDate < endDate){
						if((item.rentalDateStart > this.startDate) && (item.rentalDateEnd < this.endDate)){
							endDateMatch = true;
							startDateMatch = true;
						}
						else{
							endDateMatch = false;
							startDateMatch = false;
						}
					}
					else{
						this.dateNotValid = true;
					}
				}
			    else if(this.endDate){
					startDateMatch = true;
					if(item.rentalDateEnd < this.endDate){
						endDateMatch = true;
					}
					else{
						endDateMatch = false;
					}
				}
				else if(this.startDate){
					endDateMatch = true;
					if(item.rentalDateStart > this.startDate){
						startDateMatch = true;
					}
					else{
						startDateMatch = false;
					}
				}
			    
			    if(this.endPrice && this.startPrice){
					if(this.startPrice < this.endPrice){
						if((item.price > this.startPrice) && (item.price < this.endPrice)){
							endPriceMatch = true;
							startPriceMatch = true;
						}
						else{
							endPriceMatch = false;
							startPriceMatch = false;
						}
					}
					else{
						this.dateNotValid = true;
					}
				}
			    else if(this.endPrice){
					startPriceMatch = true;
					if(item.price < this.endPrice){
						endPriceMatch = true;
					}
					else{
						endPriceMatch = false;
					}
				}
				else if(this.startPrice){
					endPriceMatch = true;
					if(item.price > this.startPrice){
						startPriceMatch = true;
					}
					else{
						startPriceMatch = false;
					}
				}
			    
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
				      if (this.orders[j].rentalDateStart > this.orders[j + 1].rentalDateStart) {
				        
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
		},
		
		leaveAComment: function(id){
			event.preventDefault();
			
			this.leaveACommentClicked = true;
			
			let idString = this.orders[id].idsOfRentACarFacilities.join(",");
			axios.get('rest/rentACars/getFromOrder/' + idString).then(response => this.rentACarsForComment = response.data);
		},
		
		cancel: function(id){
			event.preventDefault();
			
			axios.get('rest/orders/' + id).then(response => {
				this.toEdit = response.data;
				
				this.user.collectedPointsNumber -= this.toEdit.price * 4 * 133 / 1000;
			
				const date = new Date();
				
				this.toEdit.status = 'CANCELED';
				this.toEdit.cancellationDate = date.toISOString().split('T')[0];
				
				axios.put('rest/orders/' + this.toEdit.id, this.toEdit).then(response => {
					  axios.get('rest/buyerTypes/getGold').then(response => {
						   this.goldBuyerType = response.data;
						   
						   axios.get('rest/buyerTypes/getSilver').then(response => {
							   this.silverBuyerType = response.data;
						   
						   	   if(this.user.collectedPointsNumber >= this.goldBuyerType){
								   this.user.buyerTypeId = this.goldBuyerType.id;
							   }
							   else if(this.user.collectedPointsNumber >= this.silverBuyerType){
								   this.user.buyerTypeId = this.silverBuyerType.id;
							   }
							   else{
								   this.user.buyerTypeId = "0";
							   }
							   
							   axios.put('rest/users/' + this.user.id, this.user).then(response => {
								  location.reload();
							   });
						   });
					  }); 
				});
			});
		},

		submit: function(){
			event.preventDefault();
			
			this.commentNotValid = false;
			
			if(!this.commentsRentACar){
				this.commentNotValid = true;
				document.getElementsByName("commentComboBox")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("commentComboBox")[0].style.border = "2px solid black";
			}
			
			if(!this.comment.text){
				this.commentNotValid = true;
				document.getElementsByName("commentText")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("commentText")[0].style.border = "2px solid black";
			}
			
			if(!this.comment.grade){
				this.commentNotValid = true;
				document.getElementsByName("commentGrade")[0].style.border = "2px solid red";
			}
			else{
				if((this.comment.grade < 1) || (this.comment.grade > 5)){
					this.commentNotValid = true;
					document.getElementsByName("commentGrade")[0].style.border = "2px solid red";
				}
				else{
					document.getElementsByName("commentGrade")[0].style.border = "2px solid black";
				}
			}
			
			if(!this.commentNotValid){
				this.comment.userId = this.user.id;
				this.comment.status = 'PENDING';

				axios.get('rest/rentACars/' + this.commentsRentACar).then(response => {
					this.temp = response.data;
					this.comment.rentACarId = this.temp.id;
					
					axios.post('rest/comments/', this.comment).then(response => location.reload());
				});
			}
		},
		
		reset : function(){
			event.preventDefault();
			
			location.reload();
		}
    }
});