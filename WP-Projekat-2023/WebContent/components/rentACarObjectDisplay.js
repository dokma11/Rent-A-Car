Vue.component("rentACarObjectDisplay", { 
	data: function () {
	    return {
			rentACar: {id: null, name: null, availableVehicles: null, workingHours: null, status: null, location: null, logoPath: null, grade: null}
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
	    			</tr>
	    			<tr v-for="(r,index) in rentACar">
	    				<td>{{r.name}}</td>
	    				<td>{{r.location.address}}</td>
	    				<td>
          					<img :src="r.logoPath" alt="Logo" /> <!-- Display the image from the URL -->
                       </td>
	    				<td>{{r.grade}}</td>
	    			</tr>
	    		</table>
	    		<button v-on:click="displayProfile">Prikazi profil</button>
	    	</div>
	    `,
	mounted () {
		
        axios.get('rest/rentACars/').then(response => (this.rentACar = response.data))
    },   
    methods: {
    	displayProfile : function() {
			axios.post('rest/users/').router.push(`/usersProfile`)
    	}
    }
});