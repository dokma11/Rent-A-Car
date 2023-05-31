const RentACarObjectDisplay = { template: '<rentACarObjectDisplay></rentACarObjectDisplay>' }
const UsersProfileDisplay = { template: '<usersProfileDisplay></usersProfileDisplay>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: RentACarObjectDisplay},
		{ path: '/usersProfile/:id', name: 'userhome', component: UsersProfileDisplay}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});