const RentACarsDisplay = { template: '<rentACarsDisplay></rentACarsDisplay>' }
const HomePage = { template: '<homePage></homePage>' }
const UsersProfileDisplay = { template: '<usersProfileDisplay></usersProfileDisplay>'}
const AllUsersProfilesDisplay = { template: '<allUsersProfilesDisplay></allUsersProfilesDisplay>'}
const UsersProfileEditDisplay = { template: '<usersProfileEditDisplay></usersProfileEditDisplay>'}
const RegistrationUser = {template: '<usersRegistration></usersRegistration>'}
const RegistrationRentACar = {template: '<rentACarRegistration></rentACarRegistration>'}
const LoginScreen = {template: '<loginScreen></loginScreen>'}
const RentalReview = {template: '<rentalReview></rentalReview>'}
const NewOrder = {template: '<newOrder></newOrder>'}
const NewVehicle = {template: '<newVehicle></newVehicle>'}
const RentACarObjectDisplay = {template: '<rentACarObjectDisplay></rentACarObjectDisplay>'}
const Checkout = {template: '<checkout></checkout>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: HomePage},
		{ path: '/rentACar', name: 'rentacarhome', component: RentACarsDisplay},
		{ path: '/rentaCar/rentACarObjectDisplay/:id', name: 'rentACarObjectDisplay', component: RentACarObjectDisplay},
		{ path: '/usersProfile/:id', name: 'userhome', component: UsersProfileDisplay},
		{ path: '/allUsersProfiles', name: 'allusershome', component: AllUsersProfilesDisplay},
		{ path: '/usersProfile/edit/:id', name: 'userhome1', component: UsersProfileEditDisplay},
		{ path: '/usersRegistration', name: 'registration', component: RegistrationUser},	
		{ path: '/rentACarRegistration', name: 'rentACarRegistration', component: RegistrationRentACar},	
		{ path: '/usersProfile/rentalReview/:id', name: 'rentalReviewhome', component: RentalReview},
		{ path: '/usersProfile/newOrder/:id', name: 'newOrderHome', component: NewOrder},
		{ path: '/newVehicle/:id', name: 'newVehicleHome', component: NewVehicle},
		{ path: '/login', name: 'loginscreen', component: LoginScreen},
		{ path: '/checkout', name: 'checkout', component: Checkout}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});