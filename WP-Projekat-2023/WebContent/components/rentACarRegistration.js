Vue.component("rentACarRegistration", { 
	data: function () {
	    return {
			rentACar: [],
			manager: null,
			address: null,
			notValid: null
	    }
	},
	    template: `
	    	<div>
	    		<label>Registracija Rent A Car objekta</label>
	    		<table>
	    			<tr>
	    				<td><label>Unesite naziv: </label></td>
	    				<td><input type="text" name="name" v-model="rentACar.name" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite lokaciju: </label></td>
	    				<td><input type="text" name="locationAddress" v-model="address" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite radno vreme: </label></td>
	    				<td><input type="text" name="workingHours" v-model="rentACar.workingHours" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Postavite logo: </label></td>
	    				<td><input type="text" name="picturePath" v-model="rentACar.picturePath" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite zaduzenog menadzera: </label></td>
	    				<td><input type="text" name="manager" v-model="manager" /></td>
	    			</tr>
	    		</table>
	    		<br></br>
	    		<button v-on:click="createManager">Kreiraj novog menadzera</button>
	    		<br></br>
	    		<button v-on:click="registerRentACar">Registruj objekat</button>
	    		<br></br>
	    		<p v-if="notValid">Molimo Vas popunite sva polja</p>
	    	</div>
	    `,
    mounted () {
        
    },
    methods: {
    	addManager : function() {
			
    	},
    	
    	createManager: function(){
			
		},
		
		registerRentACar: function(){
			event.preventDefault();
			this.notValid = false;
			let valid = true;
			
			if(!this.rentACar.name){
                valid = false;
                this.notValid = true;
                document.getElementsByName("name")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("name")[0].style.border = "2px solid black";
            }
			
			if(!this.address){
                valid = false;
                this.notValid = true;
                document.getElementsByName("locationAddress")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("locationAddress")[0].style.border = "2px solid black";
            }
			
			if(!this.rentACar.workingHours){
                valid = false;
                this.notValid = true;
                document.getElementsByName("workingHours")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("workingHours")[0].style.border = "2px solid black";
            }
            
            if(!this.rentACar.picturePath){
                valid = false;
                this.notValid = true;
                document.getElementsByName("picturePath")[0].style.border = "2px solid red";
            }
            else{
                document.getElementsByName("picturePath")[0].style.border = "2px solid black";
            }
			
			if(valid){
				//this.rentACar.location.address = this.address;
				axios.post('rest/rentACars/', this.rentACar).then(response => router.push(`/rentACar`)).catch(error => console.log(error));
			}
		}
    }
});