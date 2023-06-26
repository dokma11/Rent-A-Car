Vue.component("usersRentACarObjectDisplay", { 
	data: function () {
	    return {
			manager: [],
			rentACar: [],
			orders: [],
			buyers: []
	    }
	},
	    template: `
	    	<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">
	    		<label><b>Prikaz Rent A Car objekta</b></label>
	    		<br></br>
	    		<table border="1" class="tab"> 
	    			<tr>
	    				<th>Naziv</th>
	    				<th>Radno vreme</th>
	    				<th>Status</th>
	    				<th>Lokacija</th>
	    				<th>Logo</th>
	    				<th>Ocena objekta</th>
	    			</tr>
	    			<tr>
	    				<td>{{rentACar.name}}</td>
	    				<td>{{rentACar.workingHours}}</td>
	    				<td>{{rentACar.status}}</td>
	    				<td>{{rentACar.location.address}}</td>
	    				<td>
          					<img :src="rentACar.logoPath" alt="Logo" />
                       	</td>
	    				<td>{{rentACar.grade}}</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<label><b>Prikaz porudzbina koje su vezane za objekat</b></label>
	    		<table border="1" class="tab"> 
	    			<tr>
	    				<th>Kupac</th>
	    				<th>Datum i vreme iznajmljivanja</th>
	    				<th>Trajanje najma</th>
	    				<th>Cena</th>
	    			</tr>
	    			<tr v-for="(o,index) in orders">
	    				<td>{{o.buyer}}</td>
	    				<td>{{o.rentalDate}}</td>
	    				<td>{{o.rentalDuration}}</td>
	    				<td>{{o.price}}</td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<label><b>Prikaz kupaca koji su porucili iz objekta</b></label>
	    		<table border="1" class="tab"> 
	    			<tr>
	    				<th>Korisnicko ime</th>
	    				<th>Ime</th>
	    				<th>Prezime</th>
	    				<th>Broj sakupljenih poena</th>
	    			</tr>
	    			<tr v-for="(b,index) in buyers">
	    				<td>{{b.username}}</td>
	    				<td>{{b.name}}</td>
	    				<td>{{b.surname}}</td>
	    				<td>{{b.collectedPointsNumber}}</td>
	    			</tr>
	    		</table>
	    	</div>
	    `,
    mounted () {
        let p = this.$route.params.id;
        axios.get('rest/users/' + p).then(response => ((this.manager = response.data) && (this.rentACar = this.manager.rentACarObject)));
        axios.get('rest/users/').then(response => (this.buyers = response.data));
        axios.get('rest/orders/').then(response => (this.orders = response.data));
        //have to somehow filter the buyers and orders
    },
    methods: {
    	template : function() {
			
    	}
    }
});