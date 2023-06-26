Vue.component("homePage", { 
	data: function () {
	    return {
			rentACar: new Map(),
			rentACarSearch: [],
			notValid: null,
			sortOption: "",
			link: 'http://localhost:8080/WebShopREST/#/login' 
	    }
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center;"> 
	    	 <a style="position: absolute; top: 10px; right: 10px;" v-bind:href="link">Prijavite se na svoj nalog</a>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Name</th>
	    				<th>Location</th>
	    				<th>Logo</th>
	    				<th>Grade</th>
	    				<th>Prikaz detalja</th>
	    			</tr>
	    			<tr v-for="(r,index) in rentACar">
	    				<td>{{r.name}}</td>
	    				<td>{{r.location.address}}</td>
	    				<td>
          					<img :src="r.logoPath" alt="Logo" /> <!-- Display the image from the URL -->
                       </td>
	    				<td>{{r.grade}}</td>
	    				<td><button v-on:click="displayDetails(r.id)">Prikazi detalje</button></td>
	    			</tr>
	    		</table>
				<br></br>
	    		<label>Pretrazi po: </label>
	    		<table>
	    			<tr>
	    				<td><label>Nazivu: </label></td>
	    				<td><input type="text" name="searchName" v-model="rentACarSearch.name" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Tipu : </label></td>
	    				<td><input type="text" name="searchVehicleType" v-model="rentACarSearch.vehicleType" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Lokaciji: </label></td>
	    				<td><input type="text" name="searchLocation" v-model="rentACarSearch.location" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Prosecnoj oceni: </label></td>
	    				<td><input type="text" name="searchAverageGrade" v-model="rentACarSearch.grade" /></td>
	    			</tr>
	    		</table>
	    		<button v-on:click="search">Pretrazi</button>
	    		<label>Sortiraj po: </label>
	    		<select v-model="sortOption" @change="sortRentACar">
	    			<option value="nameAscending">Nazivu A-Z</option>
	    			<option value="nameDescending">Nazivu Z-A</option>
	    			<option value="locationAscending">Lokaciji A-Z</option>
	    			<option value="locationDescending">Lokaciji Z-A</option>
	    			<option value="gradeAscending">Oceni rastuce</option>
	    			<option value="gradeDescending">Oceni opadajuce</option>
	    		</select>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas popunite bar neko polje za pretragu!</p>
	    		<br></br>
	    	</div>
	    `,
	mounted () {
        axios.get('rest/rentACars/').then(response => (this.rentACar = response.data))
    },   
    methods: {
    	registration : function() {
			router.push(`/usersRegistration`);
    	},
    	
    	rentACarRegistration: function() {
			router.push(`/rentACarRegistration`);
		},
		
		search: function() {
			event.preventDefault();
			let temp = [];
			temp = this.rentACar;
			this.rentACar = [];	
  			let count = 0;
			for (const _ in temp) {
  				count++;
			}
  			let entered = false;
  			this.notValid = false;
  			
  			if (this.rentACarSearch.name || this.rentACarSearch.vehicleType || this.rentACarSearch.grade || this.rentACarSearch.location) {
			  for (let i = 0; i < count; i++) {
			    let item = temp[i];
			    let nameMatch = !this.rentACarSearch.name || item.name.toLowerCase().includes(this.rentACarSearch.name.toLowerCase());
			    let vehicleTypeMatch = !this.rentACarSearch.vehicleType || item.vehicleType.toLowerCase().includes(this.rentACarSearch.vehicleType.toLowerCase());
			    let gradeMatch = !this.rentACarSearch.grade || item.grade == this.rentACarSearch.grade;
			    let locationMatch = !this.rentACarSearch.location || item.location.toLowerCase().includes(this.rentACarSearch.location.toLowerCase());
			  
			    if (nameMatch && vehicleTypeMatch && gradeMatch && locationMatch) {
			      this.rentACar.push(item);
			      entered = true;
			    }
			  }
			}
			
			if(!entered){
				this.rentACar = temp;
				this.notValid = true;
			}
			
		},
		
		displayDetails: function(id){
			router.push(`/rentaCar/rentACarObjectDisplay/${id}`);
		},
		
		sortRentACar: function() {
			event.preventDefault();
			let count = 0;
			for (const _ in this.rentACar) {
  				count++;
			}	
			
      		if (this.sortOption === "gradeAscending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].grade > this.rentACar[j + 1].grade ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		} 
      		
      		else if (this.sortOption === "gradeDescending") {
				for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].grade < this.rentACar[j + 1].grade ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}      		
			}
      		else if (this.sortOption === "nameAscending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].name > this.rentACar[j + 1].name ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		
      		else if (this.sortOption === "nameDescending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].name < this.rentACar[j + 1].name ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		//probably should change for location later
      		else if (this.sortOption === "locationAscending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].location < this.rentACar[j + 1].location ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
      		
      		else if(this.sortOption === "locationDescending") {
        		for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.rentACar[j].location > this.rentACar[j + 1].location ) {
				        
				        [this.rentACar[j], this.rentACar[j + 1]] = [this.rentACar[j + 1], this.rentACar[j]];
				      
				      }
				    }
				}
      		}
    	}
    }
});