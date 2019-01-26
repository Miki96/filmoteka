<template>
  <div v-bind:class="{ dark: tab == 1 }">
    <div class="LoginPozadina"></div>
    <div class="LoginPozadinaManja"></div>
    <div class="LoginFormBack">
      <div class="LoginPanel">
				<!-- Login -->
        <login v-if="tab == 0" />
				<!-- SignUp -->
				<signup v-if="tab == 1" />
      </div>
    </div>
    <div class="LoginFooter">
      <div class="LoginFooterBack">
        <div class="LoginFooterLogo">
          <div>
            <i class="fa fa-camera-retro"></i> MAX TV
          </div>
        </div>
        <div class="LoginFooterLinks">
          <div class="LoginFooterLinksBack">
            <i class="fa fa-skype" aria-hidden="true"></i>
            <i class="fa fa-facebook" aria-hidden="true"></i>
            <i class="fa fa-twitter" aria-hidden="true"></i>
            <i class="fa fa-instagram" aria-hidden="true"></i>
            <i class="fa fa-github" aria-hidden="true"></i>
          </div>
          <p>Copyright 2019</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'account',
  props: ['tab'],
  data () {
      return {
        tabs: this.tab
      }
  },
  watch: {
    tabs: function (val) {
      if (val == "0")
        this.$router.push('login');
      else
        this.$router.push('signup');
    },
    tab: function (val) {
      this.tabs = val;
    }
  },
  methods: {
    // log user out
    logout() {
      // if (localStorage.getItem('token')) {
      //   ajax.get('logout')
      //   .then(res => {
      //     // remove from storage
      //     localStorage.clear();
      //   })
      //   .catch(e => {
      //     // remove from storage
      //     localStorage.clear();
      //   });
      // }
    }
  },
  created() {
    this.logout();
  },
  components: {
    Login,
    Signup
  }
}
</script>


<style scoped>

.LoginPozadina {
	background-image: url("../assets/images/popcorn.png");
	background-position: top left;
    background-repeat: repeat;
    position: fixed;
    top: -50px; left: -50px; bottom: -50px; right: -50px;
    background-size: 600px;
    /* transition: transform 0.15s; */
    opacity: 1;
    z-index: 0;
}

.LoginFormBack {
	height: 85vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 5;
}

.LoginPanel {
	width: 400px;
	background-color: rgba(255,255,255,0.95);
	border-radius: 5px;
	box-shadow: -8px 7px 49px 0px rgba(0,0,0,0.75);
	position: relative;
}

.LoginFooter {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	height: 15vh;
	background-color: rgba(255,255,255,0.95);
	box-shadow: -8px 7px 49px 0px rgba(0,0,0,0.75);
	z-index: 5;
	display: flex;
	align-items: center;
	color: #222;
	transition: color 0.3s, background-color 0.3s;
	padding: 0 20px;
}

.LoginFooter .menjaj {
	position: absolute;
	top: -90px;
	top: -10vh;
	color: #eee;
	font-size: 3em;
	font-size: 2.3vh;
	border-radius: 50%;
	background-color: rgba(0,0,0,0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 8vh;
	height: 8vh;
	cursor: pointer;
	box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.55);
}

.LoginFooter .menjaj:hover {
	box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
}

.LoginFooter .next {
	right: 30px;
}

.LoginFooter .next i {
	position: relative;
	right: -0.1em;
}

.LoginFooter .prev {
	left: 30px;
}

.LoginFooter .prev i {
	position: relative;
	
}

.LoginFooterBack {
	width: 800px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.LoginFooterLinksBack {
	width: 200px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row-reverse;
	margin-bottom: 10px;
}

.LoginFooterLinks p {
	font-size: 0.75em;
	font-weight: bold;
	padding-top: 0px;
	text-align: right;
	font-family: 'Roboto', sans-serif;
}

.LoginFooterLinksBack{
	font-size: 2em;
}

.LoginFooterLogo {
	font-size: 3em;
	font-weight: bold;
	padding: 10px;
}

/* Black Theme */

.dark .LoginFooter {
	background-color: rgba(10,10,10,0.98);
	color: #eee;
}

.dark .LoginFooterLinks p {
	font-weight: normal;
}
</style>
