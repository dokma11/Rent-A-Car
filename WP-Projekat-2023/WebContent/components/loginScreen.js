Vue.component("loginScreen", {
  data: function () {
    return {
      username: null,
      password: null,
      notValid: null,
    };
  },
  template: `
    <div>
      <label>Dobrodosli!</label>
      <br></br>
      <label>Popunite polja kako biste se prijavili na nalog</label>
      <br></br>
      <table class="app">
        <tr>
          <td>Korisnicko ime: </td>
        </tr>
        <tr>
          <td><input type="text" name="username" v-model="username"/></td>
        </tr>
        <tr>
          <td>Lozinka: </td>
        </tr>
        <tr>
          <td><input type="password" name="password" v-model="password"/></td>
        </tr>
        <tr>
          <td></td>
          <td><input type="submit" v-on:click="login" value="login"/></td>
        </tr>
        <tr>
          <td>Nemate nalog?</td>
          <td>Registrujte se(treba link da bude)</td>
        </tr>
      </table>
      <p v-if="notValid">Molimo Vas popunite sva polja</p>
    </div>
  `,
  methods: {
    login: function () {
      event.preventDefault();
      this.notValid = false;

      if (this.username && this.password) {
        const url = `rest/users/login/${encodeURIComponent(
          this.username
        )}&${encodeURIComponent(this.password)}`;
        axios
          .post(url)
          .then((response) => {
            // Assuming the response contains a redirect URL or token for authentication
            if (response.status === 200) {
              router.push(`/rentACar`);
            } else {
              // Handle any other status codes if needed
              console.log(response);
            }
          })
          .catch((error) => {
            // Handle any error response here
            console.log(error);
          });
      } else {
        this.notValid = true;
      }
    },
  },
});
