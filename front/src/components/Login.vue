<template>
  <form @submit.prevent="submit">
    <div class="FormHeader">
      <span>Prijava</span>
      <div class="switch" @click="switchTab">
        <i class="fa fa-user-o"></i>
      </div>
    </div>
    <ul>
      <li>
        <i class="fa fa-envelope"></i>
        <input type="email" v-model="email" placeholder="E-mail">
        <i class="fa fa-times wrongName" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-lock"></i>
        <input type="password" v-model="pass" placeholder="Lozinka" minlength="8">
        <i class="fa fa-times wrongPass" aria-hidden="true"></i>
      </li>
    </ul>
    <div class="FormSubmit">
      <input type="submit" name="submit" value="Prijava">
    </div>
  </form>
</template>

<script>
import ajax from '../http-common.js';

export default {
	data: function () {
		return {
			email: '',
			pass: ''
		}
	},
  methods: {
    submit () {
			if (this.user == '' || this.pass == '') {
				// form not valid
				return;
			}
			// form valid
			ajax.post('auth', {
				email: this.email,
				password: this.pass
			})
			.then(res => {
				// save token and ID
				localStorage.setItem('token', res.data['token']);
				localStorage.setItem('id', res.data['id']);
				this.$root.user['id'] = localStorage.getItem('id');
				this.$root.user['token'] = localStorage.getItem('token');
				console.log(res);
				// go to main page
				this.$router.push('/');
			})
			.catch(e => {
				this.$root.$emit('showMsg', e.response.data);
			});
    },
    switchTab () {
      this.$parent.tabs = 1;
    }
  }
}
</script>


<style scoped>

.FormHeader {
	padding: 30px 10px;
	font-size: 2em;
	color: #333;
	text-align: center;
	text-transform: uppercase;
	background-color: rgba(0,0,0,0.1);
	border-radius: 4px 4px 0 0;
	transition: color 0.3s, background-color 0.3s;
}

.LoginPanel ul {
	list-style: none;
	display: flex;
	align-items: center;
	flex-direction: column;
}

.LoginPanel ul li {
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid rgba(0,0,0,0.2);
	padding: 20px 10px;
	padding-bottom: 0;
}


.LoginPanel ul li i {
	font-size: 1.6em;
	color: #333;
}

.LoginPanel ul li .wrongName, .LoginPanel ul li .wrongPass{
	display: none;
}

.LoginPanel ul li input[type=email], .LoginPanel ul li input[type=password] {
	padding: 10px;
	border:none;
	background-color: rgba(0,0,0,0);
	outline: none;
	font-size: 1em;
}

.FormSubmit {
	padding: 40px;
}

.FormSubmit input[type=submit] {
	padding: 20px 40px;
	color: #333;
	font-weight: bold;
	letter-spacing: .1em;
	border:none;
	outline-color: gray;
	background-color: rgba(0,0,0,0.1);
	width: 100%;
	cursor: pointer;
	font-size: 1em;
	text-transform: uppercase;
	transition: background-color 0.2s;
	border-radius: 5px;
	transition: color 0.3s, background-color 0.3s;
}

.FormSubmit input[type=submit]:hover {
	background-color: rgba(0,0,0,0.9);
	color: #eee;
}

/* SWITCH */

.switch {
	position: absolute;
	width: 50px;
	height: 50px;
	background-color: rgba(255,255,255,0.95);
	background-color: #222;
	color: #111;
	color: #eee;
	top: 20px;
	right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 26px;
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
	border-radius: 5px 5px 5px 5px ;
	z-index: 1;
	cursor: pointer;
}

</style>

