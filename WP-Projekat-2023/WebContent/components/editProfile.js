Vue.component("usersProfileEditDisplay", { 
	data: function () {
	    return {
			user: {id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role:null},
			notValid: null
		}
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	    	<form>
	    		<label><b>Izmena profila</b></label>
	    		<br></br>
	    		<table>
	    			<tr>
	    				<td><label>Korisnicko ime: </label></td>
	    				<td><input type = "text" name="username" v-model="user.username" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Sifra: </label></td>
	    				<td><input type = "password" name="password" v-model="user.password" /></td>
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
	    				<td><label>Datum rodjenja: </label></td>
	    				<td><input type = "date" name="dateOfBirth" v-model="user.dateOfBirth" /></td>
	    			</tr>
	    			<tr>
	    				<td></td>
	    				<td><input type="submit" v-on:click="edit(user.id)" /></td>
	    			</tr>
	    		</table>
	    		</form>
	    		<p v-if="notValid">Molimo Vas da sve Vase podatke unesete u odgovarajucem obliku</p>
	    	</div>
	    `,
    mounted () {
        let p = this.$route.params.id
        axios.get('rest/users/' + p).then(response => (this.user = response.data))
    },
    methods: {
    	edit : function(id) {
			let p = this.$route.params.id;
			event.preventDefault();
			let valid = true;
			this.notValid = false;
			
			if(!this.user.username){
				valid = false;
				this.notValid = true;
				document.getElementsByName("username")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("username")[0].style.border = "2px solid black";
			}
			
			if(!this.user.password){
				valid = false;
				this.notValid = true;
				document.getElementsByName("password")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("password")[0].style.border = "2px solid black";
			}
			
			if(!this.user.name){
				valid = false;
				this.notValid = true;
				document.getElementsByName("name")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("name")[0].style.border = "2px solid black";
			}
			
			if(!this.user.surname){
				valid = false;
				this.notValid = true;
				document.getElementsByName("surname")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("surname")[0].style.border = "2px solid black";
			}
			
			if(!this.user.gender){
				valid = false;
				this.notValid = true;
				document.getElementsByName("gender")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("gender")[0].style.border = "2px solid black";
			}
			
			if(!this.user.dateOfBirth){
				valid = false;
				this.notValid = true;
				document.getElementsByName("dateOfBirth")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("dateOfBirth")[0].style.border = "2px solid black";
			}
			
			if(valid){
				axios.put('rest/users/' + p, this.user).then(response => router.push(`/usersProfile/` + p)).catch(error => console.log(error));
			}
    	}
    }
});