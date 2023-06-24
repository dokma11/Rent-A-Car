Vue.component("rentACarsDisplay", { 
	data: function () {
	    return {
			rentACar: new Map(),
			rentACarSearch: [],
			notValid: null,
			sortOption: "",
			filterOption: "" 
	    }
	},
	    template: `
	    	<div>
	    		<label><b>Prikaz svih Rent A Car objekata</b></label>
	    		<br></br>
	    		<label>Pretrazi po:</label>
		    	<div style="display: flex; align-items: center;">
				    <label style="margin-right: 10px;">Nazivu:</label>
				    <input type="text" name="searchName" v-model="rentACarSearch.name" style="margin-right: 10px;" />
				    <label style="margin-right: 10px;">Tipu vozila:</label>
				    <select v-model="rentACarSearch.vehicleType" style="margin-right: 10px;">
				      <option>CAR</option>
				      <option>VAN</option>
				      <option>MOTORHOME</option>
				      <option>RV</option>
				      <option>MINIBUS</option>
				    </select>
				    <label style="margin-right: 10px;">Lokaciji:</label>
				    <input type="text" name="searchLocation" v-model="rentACarSearch.location" style="margin-right: 10px;" />
				    <label style="margin-right: 10px;">Prosecnoj oceni:</label>
				    <input type="text" name="searchAverageGrade" v-model="rentACarSearch.grade" style="width: 50px; margin-right: 10px;" />
				    <button v-on:click="search" style="margin-right: 40px;">Pretrazi</button>
				    <select v-model="sortOption" @change="sortRentACar" style="margin-right: 10px;">
				      <option value="">Sortriraj po:</option>
				      <option value="nameAscending">Nazivu: A-Z</option>
				      <option value="nameDescending">Nazivu: Z-A</option>
				      <option value="locationAscending">Lokaciji: A-Z</option>
				      <option value="locationDescending">Lokaciji: Z-A</option>
				      <option value="gradeAscending">Oceni: rastuce</option>
				      <option value="gradeDescending">Oceni: opadajuce</option>
				    </select>
				    <select v-model="filterOption" @change="filterRentACar" style="margin-right: 10px;">
				      <option value="">Filtriraj po:</option>
				      <option value="manualGearBox">Vrsti menjaca: manuelni</option>
				      <option value="automaticGearBox">Vrsti menjaca: automatik</option>
				      <option value="dieselFuelType">Tipu goriva: dizel</option>
				      <option value="gasolineFuelType">Tipu goriva: benzin</option>
				      <option value="hybridFuelType">Tipu goriva: hibrid</option>
				      <option value="electricFuelType">Tipu goriva: elektricni</option>
				      <option value="openRentACars">Samo otvoreni objekti</option>
				    </select>
				    <button v-on:click="resetClick">Resetuj prikaz</button>
				</div>
				<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
		    		<table border="1" class="tab" >
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
	    		</div>
	    		<div style="display: flex; align-items: center;">
		    		<button v-on:click="registration">Registracija</button>
		    		<br></br>
		    		<button v-on:click="rentACarRegistration">Registracija Rent A Car objekta</button>
	    		</div>
	    		<p v-if="notValid">Molimo Vas popunite bar neko polje za pretragu!</p>
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
    	},
    	
    	resetClick: function(){
			event.preventDefault();
			location.reload();
		},
		
		filterRentACar: function(){
			event.preventDefault();
			let count = 0;
			for (const _ in this.rentACar) {
  				count++;
			}
			let temp = [];
			temp = this.rentACar;
			this.rentACar = [];	
			
			if(this.filterOption === "manualGearBox"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].gearBoxType = "manualGearBox"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "automaticGearBox"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].gearBoxType = "automaticGearBox"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "dieselFuelType"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].fuelType = "dieselFuelType"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "gasolineFuelType"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].fuelType = "gasolineFuelType"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "hybridFuelType"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].fuelType = "hybridFuelType"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "electricFuelType"){
				for (let i = 0; i < count - 1; i++) {
					
					let vehicleCount = 0;
					for (const _ in temp[i].avaliableVehicles) {
		  				vehicleCount++;
					}
				    
				    for(let j=0; j < vehicleCount; j++){
						if(temp[i].avaliableVehicles[j].fuelType = "electricFuelType"){
							this.rentACar.push(temp[i]);
							break;
						}
					}
				}
			}
			else if(this.filterOption === "openRentACars"){
				for (let i = 0; i < count - 1; i++) {
				    if(temp[i].status == "WORKING"){
						this.rentACar.push(temp[i]);
					}
				}
			}
		}
    }
});