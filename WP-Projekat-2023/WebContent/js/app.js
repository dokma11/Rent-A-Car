const RentACarsDisplay = { template: '<rentACarsDisplay></rentACarsDisplay>' }
const UsersProfileDisplay = { template: '<usersProfileDisplay></usersProfileDisplay>'}
const UsersProfileEditDisplay = { template: '<usersProfileEditDisplay></usersProfileEditDisplay>'}
const RegistrationUser = {template: '<usersRegistration></usersRegistration>'}
const RegistrationRentACar = {template: '<rentACarRegistration></rentACarRegistration>'}
const LoginScreen = {template: '<loginScreen></loginScreen>'}
const RentalReview = {template: '<rentalReview></rentalReview>'}
const NewOrder = {template: '<newOrder></newOrder>'}
const NewVehicle = {template: '<newVehicle></newVehicle>'}
const RentACarObjectDisplay = {template: '<rentACarObjectDisplay></rentACarObjectDisplay>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/rentaCar', name: 'home', component: RentACarsDisplay},
		{ path: '/rentaCar/rentACarObjectDisplay/:id', name: 'rentACarObjectDisplay', component: RentACarObjectDisplay},
		{ path: '/usersProfile/:id', name: 'userhome', component: UsersProfileDisplay},
		{ path: '/usersProfile/edit/:id', name: 'userhome1', component: UsersProfileEditDisplay},
		{ path: '/usersRegistration', name: 'registration', component: RegistrationUser},	
		{ path: '/rentACarRegistration', name: 'rentACarRegistration', component: RegistrationRentACar},	
		{ path: '/usersProfile/rentalReview/:id', name: 'rentalReviewhome', component: RentalReview},
		{ path: '/usersProfile/newOrder/:id', name: 'newOrderHome', component: NewOrder},
		{ path: '/newVehicle/:id', name: 'newVehicleHome', component: NewVehicle},
		{ path: '/', name: 'loginscreen', component: LoginScreen}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});