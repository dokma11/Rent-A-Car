Vue.component("rentACarObjectDisplay", { 
	data: function () {
	    return {
	    }
	},
	    template: `
	    	<div>
	    		<button v-on:click="displayProfile">Prikazi profil</button>
	    	</div>
	    `,
	    
    methods: {
    	displayProfile : function() {
			axios.post('rest/users/').router.push(`/usersProfile`)
    	}
    }
});