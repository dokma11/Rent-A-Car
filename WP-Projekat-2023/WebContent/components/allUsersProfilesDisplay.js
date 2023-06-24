Vue.component("allUsersProfilesDisplay", { 
	data: function () {
	    return {
			users: [],
			userSearch: [],
			sortOption: '',
			filterOption: '',
			notValid: null
	    };
	},
	    template: `
	    	<div>
	    		<label><b>Prikaz svih registrovanih korisnika</b></label>
	    		<br></br>
	    		<label>Pretrazi korisnike po: </label>
	    		<br></br>
	    		<label>Imenu</label>
	    		<label>Prezimenu</label>
	    		<label>Korisnickom imenu</label>
	    		<br></br>
	    		<input type="text" name="name" v-model="userSearch.name" />
	    		<input type="text" name="surname" v-model="userSearch.surname" />
	    		<input type="text" name="username" v-model="userSearch.username" />
	    		<select v-model="sortOption" @change="sort">
				  <option value="">Sortiraj po:</option>
				  <option value="nameAsc">Imenu A-Z</option>
				  <option value="nameDesc">Imenu Z-A</option>
				  <option value="surnameAsc">Prezimenu A-Z</option>
				  <option value="surnameDesc">Prezimenu Z-A</option>
				  <option value="usernameAsc">Korisnickom imenu A-Z</option>
				  <option value="usernameDesc">Korisnickom imenu Z-A</option>
				  <option value="pointsAsc">Broju sakupljenih bodova rastuce</option>
				  <option value="pointsDesc">Broju sakupljenih bodova opadajuce</option>
				</select>
				<select v-model="filterOption" @change="filter">
				  <option value="">Filtriraj po:</option>
				  <option value="managerRole">Ulozi: Menadzer</option>
				  <option value="administratorRole">Ulozi: Administrator</option>
				  <option value="buyerRole">Ulozi: Kupac</option>
				  <option value="goldUserType">Tipu kupca: Zlatni</option>
				  <option value="silverUserType">Tipu kupca: Srebrni</option>
				  <option value="bronzeUserType">Tipu kupca: Bronzani</option>
				</select>
	    		<button v-on:click="search">Pretrazi</button>
	    		<button v-on:click="reset">Resetuj</button>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Username</th>
	    				<th>Name</th>
	    				<th>Surname</th>
	    				<th>Gender</th>
	    				<th>Date of birth</th>
	    				<th>Uloga</th>
	    				<th>Broj sakupljenih bodova</th>
	    			</tr>
	    			<tr v-for="(u, index) in users">
	    				<td>{{u.username}}</td>
	    				<td>{{u.name}}</td>
	    				<td>{{u.surname}}</td>
	    				<td>{{u.gender}}</td>
	    				<td>{{u.dateOfBirth}}</td>
	    				<td>{{u.role}}</td>
	    				<td>{{u.collectedPointsNumber}}</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas da popunite polja prilikom pretrage</p>
	    	</div>
	    `,
    mounted () {
        axios.get('rest/users/').then(response => (this.users = response.data))
    },
    methods: {
    	search: function() {
			event.preventDefault();
			let temp = [];
			temp = this.users;
			this.users = [];	
  			let count = 0;
			for (const _ in temp) {
  				count++;
			}
  			this.notValid = false;
  			let entered = false;
  			
			if (this.userSearch.name || this.userSearch.surname || this.userSearch.username) {
			  for (let i = 0; i < count; i++) {
			    let item = temp[i];
			    let nameMatch = !this.userSearch.name || item.name.toLowerCase().includes(this.userSearch.name.toLowerCase());
			    let surnameMatch = !this.userSearch.surname || item.surname.toLowerCase().includes(this.userSearch.surname.toLowerCase());
			    let usernameMatch = !this.userSearch.username || item.username.toLowerCase().includes(this.userSearch.username.toLowerCase());
			  
			    if (nameMatch && surnameMatch && usernameMatch) {
			      this.users.push(item);
			      entered = true;
			    }
			  }
			}
			
			if(!entered){
				this.users = temp;
				this.notValid = true;
			}
		},
		
		sort: function(){
			event.preventDefault();
			let count = 0;
			for (const _ in this.users) {
  				count++;
			}
			
			if (this.sortOption === 'nameAsc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].name > this.users[j + 1].name ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			}
			else if (this.sortOption === 'nameDesc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].name < this.users[j + 1].name ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			} 
			else if (this.sortOption === 'surnameAsc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].surname > this.users[j + 1].surname ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			} 
			else if (this.sortOption === 'surnameDesc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].surname < this.users[j + 1].surname ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			} 
			else if (this.sortOption === 'usernameAsc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].username > this.users[j + 1].username ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			} 
			else if (this.sortOption === 'usernameDesc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].username < this.users[j + 1].username ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			} 
			//will have to change alter on probably
			else if (this.sortOption === 'pointsAsc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].points > this.users[j + 1].points ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			}
			else if (this.sortOption === 'pointsDesc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].points < this.users[j + 1].points ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			}
		},
		
		reset: function(){
			event.preventDefault();
			location.reload();
		},
		
		filter: function(){
			event.preventDefault();
			let count = 0;
			for (const _ in this.users) {
  				count++;
			}
			let temp = [];
			temp = this.users;
			this.users = [];
			
			if(this.filterOption === "managerRole"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "MANAGER"){
						this.users.push(temp[i]);
					}
				}
			}
			else if(this.filterOption === "administratorRole"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "ADMINISTRATOR"){
						this.users.push(temp[i]);
					}
				}
			}
			else if(this.filterOption === "buyerRole"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						this.users.push(temp[i]);
					}
				}
			}
			else if(this.filterOption === "goldUserType"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						if(temp[i].buyerType == "GOLD"){
							this.users.push(temp[i]);
						}
					}
				}
			}
			else if(this.filterOption === "silverUserType"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						if(temp[i].buyerType == "SILVER"){
							this.users.push(temp[i]);
						}
					}
				}
			}
			else if(this.filterOption === "bronzeUserType"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						if(temp[i].buyerType == "BRONZE"){
							this.users.push(temp[i]);
						}
					}
				}
			}
		}
    }
});