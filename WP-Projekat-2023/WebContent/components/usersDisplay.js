Vue.component("usersProfileDisplay", { 
	data: function () {
	    return {
			user: {id: null, username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role: null}
	    }
	},
	    template: `
	    	<div>
	    		<table border="1">
	    			<tr>
	    				<th>Username</th>
	    				<th>Name</th>
	    				<th>Surname</th>
	    				<th>Gender</th>
	    				<th>Date of birth</th>
	    			</tr>
	    			<tr>
	    				<td>{{user.username}}</td>
	    				<td>{{user.name}}</td>
	    				<td>{{user.surname}}</td>
	    				<td>{{user.gender}}</td>
	    				<td>{{user.dateOfBirth}}</td>
	    			</tr>
	    		</table>
	    		<button v-on:click="editProfileClick(user.id)">Izmeni profil</button>
	    		<br></br>
	    		<button v-if="user.role === 'BUYER'" v-on:click="rentalReview(user.id)">Pregled korisnikovih iznajmljivanja</button>
	    		<br></br>
	    		<button v-if="user.role === 'BUYER'" v-on:click="order(user.id)">Nova porudzbina</button>
	    		<br></br>
	    		<button v-if="user.role === 'ADMINISTRATOR'" v-on:click="display">Pregled svih registrovanih korisnika</button>
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
		}
    }
});