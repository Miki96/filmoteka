<template>
  <div class="home">
    <!-- Navigation -->
    <nav>
      <ul>
        <router-link tag="li" active-class="aktivan" to="/home">Pocetna</router-link>
        <router-link tag="li" active-class="aktivan" to="/movies">Filmovi</router-link>
        <router-link tag="li" active-class="aktivan" to="/shows">Serije</router-link>
        <router-link tag="li" active-class="aktivan" to="/search">Pretraga</router-link>
      </ul>
      <div class="Korisnik">
        <p>{{fname}}<br><span>{{lname}}</span></p>
        <div class="Profil"></div>
        <router-link tag=div class="odjava" to="/login">
          <span>Odjavi se</span>
          <i class="fa fa-chevron-right"></i>
        </router-link>
      </div>
    </nav>
    <!-- Main Content -->
    <div class="Back">
      <info v-bind:style="{ transform: 'translateX(' + (page * -105) + 'vw)'}"/>
      <movies v-bind:style="{ transform: 'translateX(' + (page * -105) + 'vw)'}"/>
      <shows v-bind:style="{ transform: 'translateX(' + (page * -105) + 'vw)'}"/>
      <search v-bind:style="{ transform: 'translateX(' + (page * -105) + 'vw)'}"/>
    </div>
    <!-- Footer -->
    <footer>
      <div class="LoginFooter LoginFooterA LoginAdapt">
        <div class="menjaj next" @click="next">
          <i class="fa fa-chevron-right"></i>
        </div>
        <div class="menjaj prev" @click="prev">
          <i class="fa fa-chevron-left"></i>
        </div>
        <div class="LoginFooterBack">
          <div class="LoginFooterLogo">
            <div><i class="fa fa-camera-retro"></i> MAX TV</div>	
          </div>
          <div class="LoginFooterLinks LoginFooterLinksA">
            <div class="LoginFooterLinksBack">
              <i class="fa fa-skype" aria-hidden="true"></i>
              <i class="fa fa-facebook" aria-hidden="true"></i>
              <i class="fa fa-twitter" aria-hidden="true"></i>
              <i class="fa fa-instagram" aria-hidden="true"></i>
              <i class="fa fa-github" aria-hidden="true"></i>
            </div>
            <p>Copyright 2017 Miodrag Mikić. Sva prava zadržana.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import Info from '@/components/Info.vue'
import Movies from '@/components/Movies.vue'
import Shows from '@/components/Shows.vue'
import Search from '@/components/Search.vue'
import ajax from '../http-common.js';

export default {
  props: {
    page: {
      default: 0
    }
  },
  data() {
    return {
      fname: '',
      lname: ''
    }
  },
  components: {
    Info,
    Movies,
    Shows,
    Search
  },
  methods: {
    next() {
      // get next adress
      switch (this.page) {
        case 0:
          this.$router.push('/movies');
          break;
        case 1:
          this.$router.push('/shows');
          break;
        case 2:
          this.$router.push('/search');
          break;
        default:
          break;
      }
    },
    prev() {
      // get prev adress
      switch (this.page) {
        case 3:
          this.$router.push('/shows');
          break;
        case 2:
          this.$router.push('/movies');
          break;
        case 1:
          this.$router.push('/home');
          break;
        default:
          break;
      }
    },
    loadUser() {
      ajax.get('user/' + this.$root.user['id'])
			.then(response => {
        // get first and last name
        this.fname = response.data.fname;
        this.lname = response.data.lname;
        // save series and movies
        if (response.data.filmovi != null)
          this.$root.user['movies'] = response.data.filmovi.map(f => f.idFilma);
        if (response.data.serije != null)
          this.$root.user['series'] = response.data.serije.map(s => s.idSerije);
			})
			.catch(e => {
				console.log(e.response.data);
			});
    }
  },
  mounted() {
    this.loadUser();
  }
}
</script>

<style scoped>

/* NAVIGACIJA */

nav {
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	z-index: 1;
	font-size: .8em;
	background-color: rgba(10,10,10,0.8);
	box-shadow: 0px 0px 17px 1px rgba(0,0,0,0.95);
	z-index: 3;
}

nav ul {
	display: flex;
	list-style: none;
	padding: 0px 20px;
}

nav ul li {
	padding: 20px 7px;
	width: 120px;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: .2em;
	font-weight: bold;
	cursor: pointer;
}

nav ul li:hover {
	color: #aaa;
}

.aktivan {
	color: #aaa;	
}

nav .Korisnik {
	position: absolute;
	right: 0;
	top: 0;
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1em;
	height: 53px;
	padding-right: 20px;
	cursor: pointer;
}

.Korisnik p {
	margin-right: 10px;
	text-align: right;
	color: #aaa;
}

.Korisnik p span {
	color: #ccc;
}

.Korisnik .Profil {
	width: 40px;
	height: 40px;
	background-color: rgba(255,255,255,0.1);
	border-radius: 3px;
	background-size: 100% 100%;
	background-image: url("../assets/images/Pro2.jpg");
	opacity: 0.6;
	box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.25);
}

.Korisnik .odjava {
  position: absolute;
  width: 200px;
  right: 0;
  top: 53px;
  padding: 20px 20px;
  background-color: rgba(10,10,10,0.8);
  color: #eee;
  display: none;
}

.Korisnik:hover .odjava {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Footer */

.LoginFooter {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	height: 15vh;
	box-shadow: -8px 7px 49px 0px rgba(0,0,0,0.75);
	z-index: 5;
	display: flex;
	align-items: center;
	transition: color 0.3s, background-color 0.3s;
	padding: 0 20px;
  background-color: rgba(10,10,10,0.98);
	color: #eee;
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

/* ADAPT ZA MAIN */

.LoginAdapt {
	height: auto;
	font-size: .5em;
}

.LoginAdapt .LoginFooterLinksBack {
	font-size: 2.3em;
}

.LoginAdapt p {
	display: none;
}


.LoginFooterBack {
	width: 800px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.LoginFooterLinksBack {
	width: 150px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row-reverse;
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
</style>

