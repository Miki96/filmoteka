<template>
  <div class="Odeljak FiS">
    <div class="Utisci UF" :class="{AktivnoU : change}">
      <h2>Tvoji Utisci</h2>
      <form>
        <textarea v-model="comment" rows="8" cols="50" placeholder="Zapisi svoje utiske o seriji..."></textarea>
      </form>
      <div class="PotvrdaU">
        <div class="Dugme" @click="change = false">
          <i class="fa fa-times"></i>
        </div>
        <div class="Dugme" @click="kritika()">
          <i class="fa fa-check"></i>
        </div>
      </div>
    </div>
    <div class="Slika">
      <div class="Izmedju"></div>
      <div class="Izmedju"></div>
    </div>
    <div class="Sadrzaj">
      <div class="deo">
        <h2>Tvoje Serije</h2>
        <div class="PolicaBack">
          <table class="Polica">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Godina</th>
                <th>Sezona</th>
                <th>IMDB</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="serie in series" :key="'m' + serie.info._id" @click="selectSeries(serie)">
                <td>{{serie.info.naziv}}</td>
                <td>
                  <span>{{serie.info.godina}}</span>
                </td>
                <td>
                  <span>{{serie.info.sezone}}</span> 
                </td>
                <td>
                  <span>{{(serie.info.ocena * 10).toFixed(1)}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="DugmetaBack">
          <router-link tag="div" to="/search" class="Dugme">DODAJ</router-link>
        </div>
      </div>
      <div class="deo">
        <div v-if="!selected" class="Prazno">
          <i class="fa fa-pencil"></i>
          <br>Izaberite seriju iz liste kako biste procitali ili izmenili svoje utiske.
        </div>
        <div v-if="selected" class="Puno">
          <h2 class="title">{{selected.info.naziv}}</h2>
          <div class="Linija"></div>
          <div class="Info">
            <div class="Cover" :style="{backgroundImage: 'url(' + selected.info.slika + ')'}">
              <div class="panel">
                <span>
                  <i class="fa fa-imdb"></i>
                </span>
                {{selected.info.opis}}
              </div>
            </div>
            <div class="Plot">
              <table>
                <tr>
                  <td>Naziv:</td>
                  <td>{{selected.info.naziv}}</td>
                </tr>
                <tr>
                  <td>Godina:</td>
                  <td>
                    <span>{{selected.info.godina}}</span>
                  </td>
                </tr>
                <tr>
                  <td>Reditelj:</td>
                  <td>{{selected.info.reditelj}}</td>
                </tr>
                <tr>
                  <td>Glumci:</td>
                  <td><p v-for="gl in selected.info.glumci" :key="'g' + gl">{{gl}}</p></td>
                </tr>
                <tr>
                  <td>Ocena:</td>
                  <td class="Zvezde">
                    <i 
                      v-for="star in 5" 
                      :key="'st' + star" 
                      :class="selected.ocena >= star ? 'fa fa-star gold' : 'fa fa-star-o'"
                      @click="oceni(selected, star)"
                    ></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="Linija"></div>
          <div class="myInfo">
            <div class="Poruka">
              <h4>Moji Utisci</h4>
              <p>{{selected.komentar ? selected.komentar : 'Unesi svoje utiske o seriji!'}}</p>
            </div>
            <div class="izmene">
              <div class="Izmena" @click="change = true">
                <i class="fa fa-pencil"></i>
              </div>
              <div class="Izmena" @click="deleteSeries(selected.info._id)">
                <i class="fa fa-remove"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '../http-common.js'

export default {
  data () {
    return {
      series: [],
      selected: null,
      change: false,
      comment: ''
    }
  },
  watch: {
    $route (to, from){
        // reset stranice
        if (to.path == "/shows") {
          this.selected = null;
          this.change = false;
          this.comment = '';
          this.loadUserSeries();
        }
    }
  },
  methods: {
    loadUserSeries() {
      ajax.get('user/' + this.$root.user['id'])
			.then(response => {
        let userSeries = {};
        response.data.serije.forEach(el => {
          userSeries[el.idSerije] = {};
          userSeries[el.idSerije].ocena = el.ocena; 
          userSeries[el.idSerije].komentar = el.komentar;
        });
        // get info on series
        let ids = response.data.serije.map(m => m.idSerije);
        this.loadSeries(ids, userSeries);
			})
			.catch(e => {
				console.log(e);
			});
    },
    loadSeries(ids, userSeries) {
      ajax.post('/serieslist', {id: ids})
			.then(response => {
        // save series info
        let info = userSeries;
        response.data.forEach(el => {
          info[el._id].info = el;
        });
        this.series = Object.values(info);
        console.log(this.series);
			})
			.catch(e => {
				console.log(e);
			});
    },
    selectSeries(serie) {
      console.log(serie);
      this.selected = serie;
      this.comment = this.selected.komentar;
    },
    deleteSeries(id) {
      ajax.put('/deleteSeries/' + id,)
			.then(response => {
        // remove from root
        let i = this.$root.user['series'].indexOf(id);
        if (i > -1) {
          this.$root.user['series'].splice(i, 1);
        }
        // reset series
        this.selected = null;
        this.loadUserSeries();
			})
			.catch(e => {
				console.log(e);
			});
    },
    oceni(serie, n) {
      ajax.put('/addRatingS/' + serie.info._id, {ocena: n})
			.then(response => {
        // change front
        serie.ocena = n;
			})
			.catch(e => {
				console.log(e);
			});
    },
    kritika() {
      if (this.comment == '')
        return;
      // comment on series
      ajax.put('/addCommS/' + this.selected.info._id, {kom: this.comment})
			.then(response => {
        // change front
        this.selected.komentar = this.comment;
        this.change = false;
			})
			.catch(e => {
				console.log(e);
			});
    }
  },
  mounted() {
    this.loadUserSeries();
  }
}
</script>
