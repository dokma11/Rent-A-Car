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
	    		<select v-model="sortOption" @change="search">
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
				<select v-model="filterOption" @change="search">
				  <option value="">Filtriraj po:</option>
				  <option value="managerRole">Menadzer</option>
				  <option value="administratorRole">Administrator</option>
				  <option value="buyerRole">Kupac</option>
				  <option value="goldUserType">Zlatni kupac</option>
				  <option value="silverUserType">Srebrni kupac</option>
				  <option value="bronzeUserType">Bronzani kupac</option>
				</select>
	    		<button v-on:click="search">Pretrazi</button>
	    		<table border="1">
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
			
			    if ((!this.userSearch.name || item.name.toLowerCase() === this.userSearch.name.toLowerCase()) &&
			        (!this.userSearch.surname || item.surname.toLowerCase() === this.userSearch.surname.toLowerCase()) &&
			        (!this.userSearch.username || item.username.toLowerCase() === this.userSearch.username.toLowerCase())) {
			      
			      this.users.push(item);
			      entered = true;
			    }
			  }
			}
			
			if(!entered){
				this.users = temp;
			}
			
			if (this.sortOption === 'nameAsc') {
			    this.users.sort((a, b) => a.name.localeCompare(b.name));
			  } else if (this.sortOption === 'nameDesc') {
			    this.users.sort((a, b) => b.name.localeCompare(a.name));
			  } else if (this.sortOption === 'surnameAsc') {
			    this.users.sort((a, b) => a.surname.localeCompare(b.surname));
			  } else if (this.sortOption === 'surnameDesc') {
			    this.users.sort((a, b) => b.surname.localeCompare(a.surname));
			  } else if (this.sortOption === 'usernameAsc') {
			    this.users.sort((a, b) => a.username.localeCompare(b.username));
			  } else if (this.sortOption === 'usernameDesc') {
			    this.users.sort((a, b) => b.username.localeCompare(a.username));
			  } else if (this.sortOption === 'pointsAsc') {
			    this.users.sort((a, b) => a.collectedPointsNumber - b.collectedPointsNumber);
			  } else if (this.sortOption === 'pointsDesc') {
			    this.users.sort((a, b) => b.collectedPointsNumber - a.collectedPointsNumber);
			  }
			  
			if(!entered && this.sortOption === ''){
				this.users = temp;
				this.notValid = true;
			}
		}
    }
});