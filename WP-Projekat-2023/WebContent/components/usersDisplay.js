Vue.component("usersProfileDisplay", { 
	data: function () {
	    return {
			user: {id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role: null}
	    }
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	    		<label><b>Pregled profila</b></label>
	    		<table border="1" class="tab">
	    			<tr>
	    				<th>Korisničko ime</th>
	    				<th>Ime</th>
	    				<th>Prezime</th>
	    				<th>Pol</th>
	    				<th>Datum rođenja</th>
	    			</tr>
	    			<tr>
	    				<td>{{user.username}}</td>
	    				<td>{{user.name}}</td>
	    				<td>{{user.surname}}</td>
	    				<td>{{user.gender}}</td>
	    				<td>{{user.dateOfBirth}}</td>
	    			</tr>
	    		</table>
	    		<div style="display: flex; justify-content: center;">
		    		<button v-on:click="editProfileClick(user.id)">Izmeni profil</button>
		    		<button v-if="user.role === 'BUYER'" v-on:click="rentalReview(user.id)">Pregled korisnikovih iznajmljivanja</button>
		    		<button v-if="user.role === 'BUYER'" v-on:click="order(user.id)">Nova porudžbina</button>
		    		<button v-if="user.role === 'ADMINISTRATOR'" v-on:click="display">Pregled svih registrovanih korisnika</button>
		    		<button v-if="user.role === 'MANAGER'" v-on:click="displayRentACar(user.id)">Pregled Rent A Car objekta</button>
		    	</div>
	    	</div>
	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/users/' + p).then(response => (this.user = response.data));
    },
    methods: {
    	editProfileClick : function(id) {
			router.push(`/usersProfile/edit/` + id);
    	},
    	
    	rentalReview: function(id) {
			router.push(`/usersProfile/rentalReview/` + id);
		},
		
		order: function(id) {
			router.push(`/usersProfile/newOrder/` + id);
		},
		
		display: function(){
			router.push(`/allUsersProfiles`);
		},
		
		displayRentACar: function(id){
			router.push(`/usersProfile/usersRentACarObject/` + id);
		}
    }
});