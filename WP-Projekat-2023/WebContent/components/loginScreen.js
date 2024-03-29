Vue.component("loginScreen", {
	  data: function () {
	    return {
	      username: null,
	      password: null,
	      notValid: null,
		  isBlocked: false,
	      link: 'http://localhost:8080/WebShopREST/#/usersRegistration',
	      userToLogIn: [],
	      users: [],
	      notExisting: false
	    };
	  },
	  template: `
	    <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">	
	      <label><b>Dobrodošli!</b></label>
	      <label><b>Popunite polja kako biste se prijavili na nalog</b></label>
	      <br></br>
	      <table class="app">
	        <tr>
	          <td>Korisničko ime: </td>
	        </tr>
	        <tr>
	          <td><input type="text" name="username" v-model="username"/></td>
	        </tr>
	        <tr>
	          <td>Lozinka: </td>
	        </tr>
	        <tr>
	          <td><input type="password" name="password" v-model="password"/></td>
	        </tr>
	        <tr>
	          <td><input type="submit" v-on:click="login" value="Prijavi se"/></td>
	        </tr>
	        <tr>
	          <td>Nemate nalog?</td>
	          <td><a v-bind:href="link">Registrujte se</a></td>
	        </tr>
	      </table>
	      <p v-if="notValid">Molimo Vas popunite sva polja</p>
	      <p v-if="isBlocked">Vas korisnički nalog je blokiran samim time se više ne možete prijaviti na svoj nalog</p>
	      <p v-if="notExisting">Korisnički nalog sa unetim kredencijalima ne postoji</p>
	    </div>
	  `,
	 mounted () {
		axios.get(`rest/users/`).then(response => this.users = response.data) 
	 },
	 methods: {
	    login: function () {
			event.preventDefault();

	      let count = 0;
		  for (const _ in this.users) {
	  		  count++;
		  }
				
		  let entered = false;
		  for(let i=0; i < count; i++){
			  if(this.users[i].username == this.username && this.users[i].password == this.password){
				  this.userToLogIn = this.users[i];
				  entered = true;
				  break;
			  }
		  }
		  
		  if(entered){
			if (!this.userToLogIn.blocked) {
	          axios.post('rest/users/login', this.userToLogIn)
	            .then(response => {
	              router.push(`/rentACar`);
	            })
	            .catch(error => {
	              console.error(error);
	            });
	        } 
	        else {
	          this.isBlocked = true;
	        } 
		  }
		  else{
			  this.notExisting = true;
		  }		
	    },
	  },
});
