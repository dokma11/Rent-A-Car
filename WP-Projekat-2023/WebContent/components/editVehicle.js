Vue.component("editVehicle", { 
	data: function () {
	    return {
			vehicle: [],
			notValid: null
	    }
	},
	    template: `
	    	<div>
	    		<label><b>Izmena vozila</b></label>
	    		<br></br>
	    		<table>
	    			<tr>
	    				<td><label>Unesite marku*: </label></td>
	    				<td><input type="text" name="brand" v-model="vehicle.brand" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite model*: </label></td>
	    				<td><input type="text" name="model" v-model="vehicle.model" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite cenu*: </label></td>
	    				<td><input type="number" min="1" name="price" v-model="vehicle.price" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite tip vozila*: </label></td>
	    				<td>
	    					<select name="vehicleType" v-model="vehicle.vehicleType">
	    						<option>CAR</option>
	    						<option>VAN</option>
	    						<option>MOTORHOME</option>
	    						<option>RV</option>
	    						<option>MINIBUS</option>
	    					</select>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite tip menjaca*: </label></td>
	    				<td>
	    					<select name="gearBoxType" v-model="vehicle.gearBoxType">
	    						<option>MANUAL</option>
	    						<option>AUTOMATIC</option>
	    					</select>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite tip goriva*: </label></td>
	    				<td>
	    					<select name="fuelType" v-model="vehicle.fuelType">
	    						<option>DIESEL</option>
	    						<option>GASOLINE</option>
	    						<option>HYBRID</option>
	    						<option>ELECTRIC</option>
	    					</select>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite potrosnju*: </label></td>
	    				<td><input type="text" name="consumption" v-model="vehicle.consumption" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite Broj vrata*: </label></td>
	    				<td><input type="number" min="1" name="doorsNumber" v-model="vehicle.doorsNumber" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Broj osoba*: </label></td>
	    				<td><input type="number" min="1" name="passengerCapacity" v-model="vehicle.passengerCapacity" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite putanju slike*: </label></td>
	    				<td><input type="text" name="picturePath" v-model="vehicle.picturePath" /></td>
	    			</tr>
	    			<tr>
	    				<td><label>Unesite opis (opciono): </label></td>
	    				<td><input type="text" name="description" v-model="vehicle.description" /></td>
	    			</tr>
	    			<tr>
	    				<td></td>
	    				<td><input type="submit" value="Izmeni" v-on:click="editVehicle" /></td>
	    			</tr>
	    		</table>
	    		<p v-if="notValid">Molimo vas popunite sva neophodna polja</p>
	    	</div>
	    `,
    mounted () {
        let p = this.$route.params.id
        axios.get('rest/vehicles/' + p).then(response => (this.vehicle = response.data))
    },
    methods: {
    	editVehicle : function() {
			event.preventDefault();
			this.notValid = false;
			
			if(!this.vehicle.brand){
				this.notValid = true;
				document.getElementsByName("brand")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("brand")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.model){
				this.notValid = true;
				document.getElementsByName("model")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("model")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.price){
				this.notValid = true;
				document.getElementsByName("price")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("price")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.vehicleType){
				this.notValid = true;
				document.getElementsByName("vehicleType")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("vehicleType")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.gearBoxType){
				this.notValid = true;
				document.getElementsByName("gearBoxType")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("gearBoxType")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.fuelType){
				this.notValid = true;
				document.getElementsByName("fuelType")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("fuelType")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.consumption){
				this.notValid = true;
				document.getElementsByName("consumption")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("consumption")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.doorsNumber){
				this.notValid = true;
				document.getElementsByName("doorsNumber")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("doorsNumber")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.passengerCapacity){
				this.notValid = true;
				document.getElementsByName("passengerCapacity")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("passengerCapacity")[0].style.border = "2px solid black";
			}
			
			if(!this.vehicle.picturePath){
				this.notValid = true;
				document.getElementsByName("picturePath")[0].style.border = "2px solid red";
			}
			else{
				document.getElementsByName("picturePath")[0].style.border = "2px solid black";
			}
			
			if(!this.notValid){
				this.vehicle.owner = this.rentACar;
				axios.post('rest/vehicles/', this.vehicle).then(response => router.push(`/rentaCar/rentACarObjectDisplay/${this.rentACar.id}`)).catch(error => console.log(error));
			}
    	}
    }
});