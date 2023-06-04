const RentACarObjectDisplay = { template: '<rentACarObjectDisplay></rentACarObjectDisplay>' }
const UsersProfileDisplay = { template: '<usersProfileDisplay></usersProfileDisplay>'}
const UsersProfileEditDisplay = { template: '<usersProfileEditDisplay></usersProfileEditDisplay>'}
const UsersRegistration = { template: '<usersRegistration></usersRegistration>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: RentACarObjectDisplay},
		{ path: '/usersProfile/:id', name: 'userhome', component: UsersProfileDisplay},
		{ path: '/usersProfile/edit/:id', name: 'userhome1', component: UsersProfileEditDisplay},
		{ path: '/usersRegistration', name: 'userhome112', component: UsersRegistration},
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});