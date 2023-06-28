const RentACarsDisplay = { template: '<rentACarsDisplay></rentACarsDisplay>' }
const HomePage = { template: '<homePage></homePage>' }
const UsersProfileDisplay = { template: '<usersProfileDisplay></usersProfileDisplay>'}
const AllUsersProfilesDisplay = { template: '<allUsersProfilesDisplay></allUsersProfilesDisplay>'}
const UsersProfileEditDisplay = { template: '<usersProfileEditDisplay></usersProfileEditDisplay>'}
const RegistrationUser = {template: '<usersRegistration></usersRegistration>'}
const ManagerRegistration = {template: '<managerRegistration></managerRegistration>'}
const RegistrationRentACar = {template: '<rentACarRegistration></rentACarRegistration>'}
const LoginScreen = {template: '<loginScreen></loginScreen>'}
const RentalReview = {template: '<rentalReview></rentalReview>'}
const NewOrder = {template: '<newOrder></newOrder>'}
const NewVehicle = {template: '<newVehicle></newVehicle>'}
const EditVehicle = {template: '<editVehicle></editVehicle>'}
const RentACarObjectDisplay = {template: '<rentACarObjectDisplay></rentACarObjectDisplay>'}
const UsersRentACarObjectDisplay = {template: '<usersRentACarObjectDisplay></usersRentACarObjectDisplay>'}
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
		{ path: '/managerRegistration', name: 'managerregistration', component: ManagerRegistration},	
		{ path: '/rentACarRegistration', name: 'rentACarRegistration', component: RegistrationRentACar},	
		{ path: '/usersProfile/rentalReview/:id', name: 'rentalReviewhome', component: RentalReview},
		{ path: '/usersProfile/usersRentACarObject/:id', name: 'usersRentACarObject', component: UsersRentACarObjectDisplay},
		{ path: '/usersProfile/newOrder/:id', name: 'newOrderHome', component: NewOrder},
		{ path: '/newVehicle/:id', name: 'newVehicleHome', component: NewVehicle},
		{ path: '/editVehicle/:id', name: 'editVehicleHome', component: EditVehicle},
		{ path: '/login', name: 'loginscreen', component: LoginScreen},
		{ path: '/checkout', name: 'checkout', component: Checkout}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});