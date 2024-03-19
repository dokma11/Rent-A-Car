Vue.component("usersRegistration", { 
    data: function () {
        return {
            user: {id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role:null},
			notValid: false,
			repeatedPassword: null,
			allUsers: [],
			usernameExists: null
        }
    },
    template: `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
			<label><b>Registacija korisnika</b></label>
			<br></br>
	    	<form>
	    		<table>
	    			<tr>
	    				<td><label>Korisničko ime: </label></td>
	    				<td><input type = "text" name="username" v-model="user.username" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Lozinka: </label></td>
	    				<td><input type = "password" name="password" v-model="user.password" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Ponovite lozinku: </label></td>
	    				<td><input type = "password" name="repeatedPassword" v-model="repeatedPassword" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Ime: </label></td>
	    				<td><input type = "text" name="name" v-model="user.name" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Prezime: </label></td>
	    				<td><input type = "text" name="surname" v-model="user.surname" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Pol: </label></td>
	    				<td><input type = "text" name="gender" v-model="user.gender" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Datum rođenja: </label></td>
	    				<td><input type = "date" name="dateOfBirth" v-model="user.dateOfBirth" /></td>
	    			</tr>
	    			<tr>
	    				<td></td>
	    				<td><input type="submit" v-on:click="create" /></td>
	    			</tr>
	    		</table>
	    		</form>
	    		<p v-if="notValid">Molimo Vas da sve Vaše podatke unesete u odgovarajućem obliku</p>
	    		<p v-if="usernameExists">Dato korisničko ime već postoji molimo Vas unesite novo</p>
	    	</div>
    `,
     mounted () {
        axios.get('rest/users/').then(response => this.allUsers = response.data);
    },
    methods: {
        create : function() {
			event.preventDefault();
	
			if(!this.user.username){
				this.notValid = true;
				document.getElementsByName("username")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("username")[0].style.border = "2px solid black";
			}
			
			if(!this.user.password){
				this.notValid = true;
				document.getElementsByName("password")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("password")[0].style.border = "2px solid black";
			}
			
			if(!this.repeatedPassword){
				this.notValid = true;
				document.getElementsByName("repeatedPassword")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("repeatedPassword")[0].style.border = "2px solid black";
			}
			
			if(!this.user.name){
				this.notValid = true;
				document.getElementsByName("name")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("name")[0].style.border = "2px solid black";
			}
			
			if(!this.user.surname){
				this.notValid = true;
				document.getElementsByName("surname")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("surname")[0].style.border = "2px solid black";
			}
			
			if(!this.user.gender){
				this.notValid = true;
				document.getElementsByName("gender")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("gender")[0].style.border = "2px solid black";
			}
			
			if(!this.user.dateOfBirth){
				this.notValid = true;
				document.getElementsByName("dateOfBirth")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("dateOfBirth")[0].style.border = "2px solid black";
			}
						
			if(this.repeatedPassword != this.user.password){
				this.notValid = true;
				document.getElementsByName("repeatedPassword")[0].style.border = "2px solid red";
				document.getElementsByName("password")[0].style.border = "2px solid red";
			}
			
			let count = 0;
			for (const _ in this.allUsers) {
  				count++;
			}
			
			for(let i=0; i < count; i++){
				if(this.allUsers[i].username == this.user.username){
					this.notValid = true;
					this.usernameExists = true;
					document.getElementsByName("username")[0].style.border = "2px solid red";
					break;
				}
				else{
					this.notValid = false;
					this.usernameExists = false;
					document.getElementsByName("username")[0].style.border = "2px solid black";
				}
			}
			
			if (!this.notValid){
				this.user.role = 'BUYER';
			  	axios.post('rest/users/', this.user).then(response => router.push(`/login`));
			}
        }
    }
});
