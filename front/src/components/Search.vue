<template>
  <div class="Odeljak">
    <div class="Slika">
      <div class="Izmedju"></div>
      <div class="Izmedju"></div>
    </div>
    <div class="Sadrzaj">
      <div class="deo">
        <form v-on:submit.prevent="pretraga">
          <div class="sBack">
            <h2>Pretraga</h2>
            <div class="Izbor">
              <p v-bind:class="{ Izabran: type == 1 }" @click="type = 1">FILM</p>
              <p v-bind:class="{ Izabran: type == 0 }" @click="type = 0">SERIJA</p>
            </div>
          </div>
          <div class="Linija"></div>
          <div class="sBack">
            <div class="Dugme DugS">
              <input type="text" placeholder="Search..." size="30" v-model="search">
              <i class="fa fa-search"></i>
            </div>
          </div>
          <div class="sBack">
            <!-- Ocena -->
            <div class="Poruka">
              <h4>Ocena
                <i class="fa fa-caret-down"></i>
              </h4>
              <p>
                <span>{{ocena}}+</span>
              </p>
              <ul class="Ostalo">
                <li v-for="i in 10" :key="i">
                  <p @click="ocena = i-1">
                    <span>{{i-1}}+</span>
                  </p>
                </li>
              </ul>
            </div>
            <!-- Godina -->
            <div class="Poruka">
              <h4>Godina
                <i class="fa fa-caret-down"></i>
              </h4>
              <p>
                <span>{{godina}}+</span>
              </p>
              <ul class="Ostalo">
                <li v-for="i in 100" :key="'g' + i">
                  <p @click="godina = 2019 - i">
                    <span>{{2019 - i}}+</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="sBack">
            <!-- Zanr -->
            <div class="Poruka">
              <h4>Zanr
                <i class="fa fa-caret-down"></i>
              </h4>
              <p>{{zanrovi[zanr]}}</p>
              <ul class="Ostalo">
                <li v-for="(z, i) in zanrovi" :key="i">
                  <p @click="zanr = i">{{z}}</p>
                </li>
              </ul>
            </div>
            <!-- Epizode -->
            <div v-if="type == 0" class="Poruka">
              <h4>Epizode
                <i class="fa fa-caret-down"></i>
              </h4>
              <p>
                <span>{{epizode}}+</span>
              </p>
              <ul class="Ostalo">
                <li v-for="i in 10" :key="i">
                  <p @click="epizode = (i - 1) * 10"><span>{{(i - 1) * 10}}+</span></p>
                </li>
              </ul>
            </div>
          </div>
          <div class="Linija"></div>
          <div class="sBack">
            <div class="Dugme" @click="pretraga">PRETRAZI</div>
          </div>
        </form>
      </div>
      <div class="deo">
        <div v-if="type == 0 && series.length == 0 || type == 1 && movies.length == 0" class="Prazno">
          <i class="fa fa-search"></i>
          <br>Pronadjite film ili seriju koju ste odgledali pa zabelezite svoje utiske.
        </div>
        <div v-if="type == 0 && series.length > 0" class="Puno PunoS">
          <h2>Rezultati:
            <span>({{series.length}})</span>
          </h2>
          <div class="PolicaBack">
            <table class="Polica">
              <thead>
                <tr>
                  <th>Naziv
                    <i class="fa fa-caret-down"></i>
                  </th>
                  <th>Godina</th>
                  <th>Epizoda</th>
                  <th>Ocena</th>
                  <th>Dodaj</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="ser in series" :key="'ss' + ser._id">
                  <td>{{ser.naziv}}</td>
                  <td>
                    <span>{{ser.godina}}</span>
                  </td>
                  <td>
                    <span>{{ser.epizode}}</span>
                  </td>
                  <td>
                    <span>{{(ser.ocena * 10).toFixed(1)}}</span>
                  </td>
                  <td>
                    <div @click="dodaj(ser._id, ser.owned)" class="Dugme" v-bind:class="{ Disabled: ser.owned }">DODAJ</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="type == 1 && movies.length > 0" class="Puno PunoS">
          <h2>Rezultati:
            <span>({{movies.length}})</span>
          </h2>
          <div class="PolicaBack">
            <table class="Polica">
              <thead>
                <tr>
                  <th>Naziv
                    <i class="fa fa-caret-down"></i>
                  </th>
                  <th>Godina</th>
                  <th>Trajanje</th>
                  <th>Ocena</th>
                  <th>Dodaj</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in movies" :key="'ms' + movie._id">
                  <td>{{movie.naziv}}</td>
                  <td>
                    <span>{{movie.godina}}</span>
                  </td>
                  <td>
                    <span>{{movie.trajanje}}</span> min
                  </td>
                  <td>
                    <span>{{(movie.ocena * 10).toFixed(1)}}</span>
                  </td>
                  <td>
                    <div @click="dodaj(movie._id, movie.owned)" class="Dugme" v-bind:class="{ Disabled: movie.owned }">DODAJ</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '../http-common.js'

export default {
  data() {
    return {
      movies: [],
      series: [],
      type: 1,
      zanrovi: ['Svi', 'Akcija', 'Avantura', 'Drama', 'Komedija', 'Triler', 'Tinejderski', 'Romantika', 'Misterija', 'Istorijski', 'Kriminalisticki'],
      zanr: 0,
      ocena: 0,
      godina: 1900,
      epizode: 0,
      search: '',
    }
  },
  watch: {
    $route (to, from){
        // reset stranice
        if (to.path == "/search") {
          this.movies = [];
          this.series = [];
          this.zanr = 0;
          this.ocena = 0;
          this.godina = 1900;
          this.epizode = 0;
          this.search = '';
        }
    }
  },
  methods: {
    pretraga() {
      console.log('pretraga');
      let zanr = (this.zanr == 0) ? null : this.zanrovi[this.zanr];
      let search = (this.search == '') ? null : this.search;
      let ocena = this.ocena / 10.0;

      // check if searching for movie or series
      let query = (this.type == 1) ? 'movieSearch' : 'seriesSearch';

      ajax.post(query, {
				sub: search,
				godina: this.godina,
				zanr: zanr,
        ocena: ocena,
        epizode: this.epizode
			})
			.then(response => {
        if (this.type == 1) {
          // save to movies
          this.movies = response.data;
        } else {
          // save to series
          this.series = response.data;
        }
        console.log(response.data);
        this.stanje();
			})
			.catch(e => {
				console.log(e);
			});
    },
    dodaj(id, owned) {
      // block if owned
      if (owned) return;
      // check if movie or series
      let query = (this.type == 1) ? '/addMovie/' : '/addSeries/';
      // add new
      ajax.put(query + id)
			.then(response => {
        // add to user collection
        if (this.type == 1)
          this.$root.user['movies'].push(id);
        else 
          this.$root.user['series'].push(id);
        this.pretraga();
			})
			.catch(e => {
				console.log(e);
			});
    },
    stanje() {
      // provera da li korisnik vec ima film
      for (let i = 0; i < this.movies.length; i++) {
        const m = this.movies[i];
        this.movies[i].owned = this.$root.user['movies'].includes(m._id);
      }
      // provera da li korisnik vec ima seriju
      for (let i = 0; i < this.series.length; i++) {
        const s = this.series[i];
        this.series[i].owned = this.$root.user['series'].includes(s._id);
      }
    }
  }
}
</script>

<style scoped>
/* PRETRAGA */
.Odeljak form {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.Odeljak .sBack {
	display: flex;
	width: 100%;
	max-width: 400px;
	align-items: center;
	justify-content: center;
	margin: 15px 0;
}

.Odeljak .sBack:nth-child(3) {
	margin-bottom: 0;
}

.Odeljak .sBack {
	margin-bottom: 0;
}

.Odeljak .sBack:nth-child(5) {
	margin-top: 0;
}

.Odeljak .sBack:first-child {
	justify-content: space-between;
}

.Odeljak .sBack:first-child h2 {
	padding: 20px 0px;
}

.Odeljak .sBack:last-child {
	justify-content: flex-end;
	padding-right: 10px;
}

.Odeljak .sBack:last-child .Dugme {
	font-size: 0.5em;
}

.Odeljak span {
	font-family: Roboto;
	color: #222;
}

.Odeljak .DugS {
	padding: 0;
	background-color: #eee;
}

.Odeljak .DugS i {
	padding: 20px 30px;
	background-color: #222;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.Odeljak .DugS:hover {
	box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.45);
	color: #eee;
}

.Odeljak form input[type=text] {
	padding: 15px 25px;
	border: none;
	background-color: rgba(255,255,255,0);
	outline: none;
	color: #333;
	margin-right: 20px;
	font-family: Roboto;
	font-size: 1em;
	max-width: 250px;
}

/* FILM SERIJA */

.Izbor {
	border-radius: 10px;
	display: flex;
	background-color: #ddd;
	font-weight: bold;
	position: relative;
	overflow: hidden;
	font-size: 0.6em;
	color: #aaa;
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.65);
	
}

.Izbor p {
	flex:1;
	padding: 20px;
	width: 100px;
	text-align: center;
	cursor: pointer;
}

.Izabran {
	background-color: #333;
	color: #eee;
}

/* PREPRAVKE */

.Odeljak .Poruka {
	flex: 1;
	margin: 10px;
	cursor: pointer;
	background-color: #f44336;
}

.Odeljak .Poruka:hover {
	box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.55);
}


.Odeljak .Poruka p {
	font-weight: bold;
	text-align: center;
}


/* REZULTATI */

.Odeljak .Polica {
	background-color: #F44336;
}

.Odeljak .Polica tbody tr {
    border-bottom: 1px solid #c1352a;
    font-family: Roboto;
}

.Odeljak .Polica tr:nth-child(even) {
    background-color: #d4362a;
}

.Odeljak .Polica tr:nth-child(even):hover {
    background-color: #222;
    border-bottom: 1px solid #222;
}

.Odeljak .Polica .Dugme {
	padding: 10px;
	font-size: 0.7em;
}

.Odeljak .Polica tr:hover .Dugme {
	background-color: #555;
}
</style>

