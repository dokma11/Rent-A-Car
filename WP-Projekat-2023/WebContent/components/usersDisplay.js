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
	    	</div>
	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/users/' + p).then(response => (this.user = response.data))
    },
    methods: {
    	editProfileClick : function(id) {
			router.push(`/usersProfile/edit/` + id);
    	}
    }
});