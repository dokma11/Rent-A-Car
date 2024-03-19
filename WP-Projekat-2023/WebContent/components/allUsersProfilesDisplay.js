Vue.component("allUsersProfilesDisplay", { 
	data: function () {
	    return {
			users: [],
			userSearch: [],
			sortOption: '',
			filterOption: '',
			notValid: null,
			susUsers: []
	    };
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	    		<label><b>Prikaz svih registrovanih korisnika</b></label>
	    		<br></br>
	    		<label style="margin-right: 1225px;">Pretražite korisnike po: </label>
	    		<div style="display: flex; align-items: center;">
		    		<br></br>
		    		<label style="margin-right: 10px;">Korisničkom imenu: </label>
		    		<input type="text" name="username" v-model="userSearch.username" style="margin-right: 10px;" />
		    		<label style="margin-right: 10px;">Imenu: </label>
		    		<input type="text" name="name" v-model="userSearch.name" style="margin-right: 10px;" />
		    		<label style="margin-right: 10px;">Prezimenu: </label>
		    		<input type="text" name="surname" v-model="userSearch.surname" style="margin-right: 10px;" />
		    		<button v-on:click="search" style="margin-right: 10px;">Pretraži</button>
		    		<br></br>		    		
		    		<select v-model="sortOption" @change="sort" style="margin-right: 10px;">
					  <option value="">Sortiraj po:</option>
					  <option value="nameAsc">Imenu A-Z</option>
					  <option value="nameDesc">Imenu Z-A</option>
					  <option value="surnameAsc">Prezimenu A-Z</option>
					  <option value="surnameDesc">Prezimenu Z-A</option>
					  <option value="usernameAsc">Korisničkom imenu A-Z</option>
					  <option value="usernameDesc">Korisničkom imenu Z-A</option>
					  <option value="pointsAsc">Broju sakupljenih bodova: rastuće</option>
					  <option value="pointsDesc">Broju sakupljenih bodova: opadajuće</option>
					</select>
					<select v-model="filterOption" @change="filter" style="margin-right: 10px;">
					  <option value="">Filtriraj po:</option>
					  <option value="managerRole">Ulozi: Menadžer</option>
					  <option value="administratorRole">Ulozi: Administrator</option>
					  <option value="buyerRole">Ulozi: Kupac</option>
					  <option value="goldUserType">Tipu kupca: Zlatni</option>
					  <option value="silverUserType">Tipu kupca: Srebrni</option>
					  <option value="bronzeUserType">Tipu kupca: Bronzani</option>
					</select>
		    		<button v-on:click="reset">Resetuj</button>
	    		</div>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Username</th>
	    				<th>Name</th>
	    				<th>Surname</th>
	    				<th>Gender</th>
	    				<th>Date of birth</th>
	    				<th>Uloga</th>
	    				<th>Broj sakupljenih bodova</th>
	    				<th>Blokiraj korisnika</th>
	    			</tr>
	    			<tr v-for="(u, index) in users">
	    				<td>{{u.username}}</td>
	    				<td>{{u.name}}</td>
	    				<td>{{u.surname}}</td>
	    				<td>{{u.gender}}</td>
	    				<td>{{u.dateOfBirth}}</td>
	    				<td>{{u.role}}</td>
	    				<td>{{u.collectedPointsNumber}}</td>
	    				<td><button v-if="u.role != 'ADMINISTRATOR' && u.blocked == false" v-on:click="block(u.id)">Blokiraj</button>
	    					<p v-if="u.blocked == true">Korisnik je vec blokiran</p>
	    					<p v-if="u.role == 'ADMINISTRATOR'">Administratore ne mozete blokirati</p>
	    				</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas da popunite polja prilikom pretrage</p>
	    		<br></br>
	    		<label>Prikaz sumnjivih korisnika</label>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Username</th>
	    				<th>Ime</th>
	    				<th>Prezime</th>
	    				<th>Pol</th>
	    				<th>Datum rodjenja</th>
	    				<th>Blokiraj sumnjivog korisnika</th>
	    			</tr>
	    			<tr v-for="(su, index) in susUsers">
	    				<td>{{su.username}}</td>
	    				<td>{{su.name}}</td>
	    				<td>{{su.surname}}</td>
	    				<td>{{su.gender}}</td>
	    				<td>{{su.dateOfBirth}}</td>
	    				<td>
	    					<button v-if="su.blocked == false" v-on:click="block(su.id)">Blokiraj</button>
	    					<p v-if="su.blocked == true">Korisnik je vec blokiran</p>
	    				</td>
	    			</tr>
	    		</table>
	    	</div>
	    `,
    mounted () {
        axios.get('rest/users/').then(response => {
			this.users = response.data
			
			let count = 0;
			for (const _ in this.users) {
	  			count++;
			}
			
			for (let i = 0; i < count; i++){
				if(this.users[i].suspicious){
					this.susUsers.push(this.users[i]);
				}
			}
			
		});
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
			
			else if (this.sortOption === 'pointsAsc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].collectedPointsNumber > this.users[j + 1].collectedPointsNumber ) {
				        
				        [this.users[j], this.users[j + 1]] = [this.users[j + 1], this.users[j]];
				      
				      }
				    }
				}
			}
			else if (this.sortOption === 'pointsDesc') {
			    for (let i = 0; i < count - 1; i++) {
				    for (let j = 0; j < count - i - 1; j++) {
				      if (this.users[j].collectedPointsNumber < this.users[j + 1].collectedPointsNumber ) {
				        
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
						if(temp[i].buyerTypeId == "2"){
							this.users.push(temp[i]);
						}
					}
				}
			}
			else if(this.filterOption === "silverUserType"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						if(temp[i].buyerTypeId == "1"){
							this.users.push(temp[i]);
						}
					}
				}
			}
			else if(this.filterOption === "bronzeUserType"){
				for (let i = 0; i < count - 1; i++) {
					if(temp[i].role == "BUYER"){
						if(temp[i].buyerTypeId == "0"){
							this.users.push(temp[i]);
						}
					}
				}
			}
		},
		
		block: function(id){
			event.preventDefault();
			
			let count = 0;
			for (const _ in this.users) {
  				count++;
			}
			
			let i=0;
			for(i; i < count; i++){
				if(this.users[i].id == id){
					this.users[i].blocked = true;
					break;
				}
			}
			
			axios.put('rest/users/' + id, this.users[i]).then(response => location.reload()).catch(error => console.log(error));
		}
    }
});