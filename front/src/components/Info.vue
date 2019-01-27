<template>
  <div class="Odeljak">
    <div class="Slika">
      <div class="Izmedju"></div>
      <div class="Izmedju"></div>
    </div>
    <div class="Sadrzaj">
      <div class="deo">
        <div class="projekat">
          <h2>Projekat</h2>
          <p>Dobrodosli na
            <b>MAX FILM</b>, skolski projekat gde mozete pronaci filmove i serije koje ste imali prilike da odgledate i ostavite svoje utiske o njima.
          </p>
          <h2>Uputstvo</h2>
          <ul>
            <li class="Poruka">
              <h4>Filmovi</h4>
              <p>Pogledajte trailer za hitove koje uskoro dolaze u bioskope.</p>
            </li>
            <li class="Poruka">
              <h4>Serije</h4>
              <p>Pogledajte koji se to filmovi daju, kada i u kojim bioskopima.</p>
            </li>
            <li class="Poruka">
              <h4>Pretraga</h4>
              <p>Idealno mesto da cuvate sve filmove koje ste odgledali.</p>
            </li>
            <li class="Poruka">
              <h4>Prijatelji</h4>
              <p>Pretrazite bazu podataka po zanru, godini, oceni...</p>
            </li>
          </ul>
          <h2>Uzivajte!</h2>
          <p>
            <b>Napomena:</b> Baza trenutno ima svega nekoliko desetina filmova i serija jer kreator od svih drugih ispitnih obaveza nije imao vremena da ubaci vise.
          </p>
        </div>
      </div>
      <div class="deo">
        <div class="projekat projekat2">
          <h2>Hitovi</h2>
          <ul>
            <li class="Cover">
              <div class="panel">
                <span>
                  <i class="fa fa-imdb"></i>
                </span>
                Saznajte kako se zavrsava saga o najpoznatijem agentu svih ljubitelja ovog zanra.
              </div>
            </li>
            <li class="Cover">
              <div class="panel">
                <span>
                  <i class="fa fa-imdb"></i>
                </span>
                Pogledate kako zivi mutant koji nikada ne stari mnogo godina nakon sto su X-men nestali.
              </div>
            </li>
            <li class="Cover">
              <div class="panel">
                <span>
                  <i class="fa fa-imdb"></i>
                </span>
                Ne propustite dramaticnu pricu o evakuaciji Belgijske vojske pod Nemackom okupacijom.
              </div>
            </li>
            <li class="Cover">
              <div class="panel">
                <span>
                  <i class="fa fa-imdb"></i>
                </span>
                Pirati su sve vratili. Ovog puta sa jos vecim avanturama i starim humorom.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.Odeljak .deo{
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.Odeljak  .projekat {
	max-width: 450px;
}

.Odeljak .deo .projekat > p {
	text-align: center;
	line-height: 1.3em;
	font-size: .6em;
	padding-bottom: 10px;
}

.Odeljak .deo:first-child ul {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	justify-content: space-around;
}

.Odeljak .deo:first-child ul li {
	width: 45%;
	background-color: #a878ff;
	margin-bottom: 20px;
	cursor: pointer;
}

/* HITOVI */

.Odeljak .deo:last-child ul {
	padding-bottom: 0;
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	justify-content: space-around;
	max-width: 390px;
}

.Odeljak .deo:last-child ul li {
	margin-bottom: 20px;
	width: 170px;
	height: 240px;
}

.Odeljak .deo:last-child ul li:nth-child(1) {
	background-image: url('../assets/images/M9.jpg');
}
.Odeljak .deo:last-child ul li:nth-child(2) {
	background-image: url('../assets/images/M6.jpg');
}
.Odeljak .deo:last-child ul li:nth-child(3) {
	background-image: url('../assets/images/M3.jpg');
}
.Odeljak .deo:last-child ul li:nth-child(4) {
	background-image: url('../assets/images/M5.jpg');
}
</style>

