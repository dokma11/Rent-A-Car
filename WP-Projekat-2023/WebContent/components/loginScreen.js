Vue.component("loginScreen", {
  data: function () {
    return {
      username: null,
      password: null,
      notValid: null,
      link: 'http://localhost:8080/WebShopREST/#/usersRegistration'
    };
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100vh;">	
      <label><b>Dobrodosli!</b></label>
      <label><b>Popunite polja kako biste se prijavili na nalog</b></label>
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
          <td><input type="submit" v-on:click="login" value="Prijavi se"/></td>
        </tr>
        <tr>
          <td>Nemate nalog?</td>
          <td><a v-bind:href="link">Registrujte se</a></td>
        </tr>
      </table>
      <p v-if="notValid">Molimo Vas popunite sva polja</p>
    </div>
  `,
 methods: {
    login: function () {
      this.notValid = false;

      if (this.username && this.password) {
        const url = 'rest/login/';
        const data = { username: this.username, password: this.password };

        axios
          .post(url, data)
          .then((response) => {
            $('#success').text('Korisnik je uspesno prijavljen.');
            $("#success").show().delay(3000).fadeOut();
          })
          .catch((error) => {
            $('#error').text(error.response.data);
            $("#error").show().delay(3000).fadeOut();
          });
      } else {
        this.notValid = true;
      }
    },
  },
});
