Vue.component("checkout", { 
	data: function () {
	    return {
			shoppingCart: []
	    }
	},
	    template: `
	    	<div>
	    		<label><b>Pregled korpe<b></label>
	    		<br></br>
	    		<table>
	    			<tr>
	    				<th>Marka</th>
	    				<th>Model</th>
	    				<th>Cena</th>
	    				<th>Slika</th>
	    				<th>Kolicina</th>
	    			</tr>
	    			<tr v-for="(v, index) in shoppingCart.vehiclesInCart">
	    				<td>{{v.brand}}</td>
	    				<td>{{v.model}}</td>
	    				<td>{{v.price}}</td>
	    				<td>{{v.picturePath}}</td>
	    				<td></td>	
	    			</tr>
	    		</table>
	    		<label>Ukupna cena korpe je {{shoppingCart.price}}</label>
	    		<br></br>
	    		<button v-on:click="rent">Iznajmi</button>
	    	</div>
	    `,
    mounted () {
		let p = this.$route.params.id;
        axios.get('rest/shoppingCarts/' + p).then(response => this.shoppingCart = response.data)
    },
    methods: {
    	rent : function() {
			axios.post('rest/orders/' + this.shoppingCart).then(reponse => (router.push(`/`)));
    	}
    }
});