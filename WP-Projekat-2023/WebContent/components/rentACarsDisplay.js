Vue.component("rentACarsDisplay", { 
	data: function () {
	    return {
			rentACar: new Map(),
			rentACarSearch: [],
			notValid: null,
			sortOption: "" 
	    }
	},
	    template: `
	    	<div>
	    		<table border="1">
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
	    		<button v-on:click="registration">Registracija</button>
	    		<br></br>
	    		<button v-on:click="rentACarRegistration">Registracija Rent A Car objekta</button>
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
			
			    if ((!this.rentACarSearch.name || item.name.toLowerCase() === this.rentACarSearch.name.toLowerCase()) &&
				    (!this.rentACarSearch.vehicleType || item.vehicleType.toLowerCase() === this.rentACarSearch.vehicleType.toLowerCase()) &&
				    (!this.rentACarSearch.grade || item.grade.toLowerCase() === this.rentACarSearch.grade.toLowerCase()) && 
				    (!this.rentACarSearch.location || item.location.toLowerCase() === this.rentACarSearch.location.toLowerCase())) {
			      
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
			//let temp = new Map();
			//temp = this.rentACar;
			//let temp = Array.from(this.rentACar);
			/*if(Array.isArray(this.rentACar)){
				let temp = [...this.rentACar]; // Create a new array using the spread operator
			}*/
			//let temp = this.rentACar.slice(); // Create a shallow copy of rentACar
			if (this.rentACar.size > 0) {
				let temp = new Map(this.rentACar);
			}
			this.rentACar = new Map();	
			
      		if (this.sortOption === "gradeAscending") {
        		//this.rentACar = Array.from(temp).sort((a, b) => a.grade - b.grade);
        		temp.sort(function (x, y){
					return x[1].grade - y[1].grade;
				}); 
				//const temp2 = new Map([...temp].sort((a, b) => a[1].grade - b[1].grade));
				//const sortedArray = Array.from(temp).sort((a, b) => a[1].grade - b[1].grade);
				//const temp2 = new Map(sortedArray);
  				//this.rentACar = temp2;
      		} 
      		
      		else if (this.sortOption === "gradeDescending") {
        		this.rentACar = Array.from(temp).sort((a, b) => b.grade - a.grade);
      		}
      		
      		else if (this.sortOption === "nameAscending") {
        		this.rentACar = Array.from(temp).sort((a, b) => a.name - b.name);
      		}
      		
      		else if (this.sortOption === "nameDescending") {
        		this.rentACar = Array.from(temp).sort((a, b) => b.name - a.name);
      		}
      		
      		else if (this.sortOption === "locationAscending") {
        		this.rentACar = Array.from(temp).sort((a, b) => a.location - b.location);
      		}
      		
      		else if(this.sortOption === "locationDescending") {
        		this.rentACar = Array.from(temp).sort((a, b) => b.location - a.location);
      		}
    	}
    }
});