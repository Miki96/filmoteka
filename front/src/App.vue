<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	font-family: Kano;
	font-size: 14px;
	letter-spacing: .1em;
	color: #eee;
}

@font-face {
    font-family: Kano;
	src: url('assets/fonts/Kano.otf');
}

/* SCROLL */

::-webkit-scrollbar{width: 5px;}

::-webkit-scrollbar-thumb{background-color:rgb(50, 50, 50);}
::-webkit-scrollbar-thumb:hover{background-color:rgb(18, 18, 18);}

::-webkit-scrollbar-track{background-color:rgb(224, 224, 224);}

/* MAIN PAGE */

.MainBody {
	background-color: #666;
	background-image: url('/assets/images/End.png');
	background-size: cover;
}

/* MAIN CONTENT */

.Back {
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100vh;
}

.Zabeljeno {
    display: none;
}

.Back .Odeljak {
	flex-shrink: 0;
	height: 100%;
	width: 100%;
	display: flex;
	margin-right: 5vw;
	transition: transform 1s;
	transform: translateX(0vw);
}

.Odeljak .Slika {
	flex:1;
	height: 100%;
	background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    margin-left: -5vw;
}

.Odeljak .Slika .Izmedju {
	width: 5vw;
	position: absolute;
	top: -2px;
	bottom: -2px;
	background-position: 100%;
    background-size: contain;
    background-repeat: no-repeat;
}

.Odeljak .Slika .Izmedju:nth-child(1) {
	right: -1px;
	background-image: url('assets/images/Side.svg');
}

.Odeljak .Slika .Izmedju:nth-child(2) {
	left: -1px;
	background-image: url('assets/images/SideInv.svg');
}

.Odeljak .Sadrzaj {
	flex: 2;
	background-color: #eee;
	height: 100%;
	position: relative;
	z-index: 2;
	color: #111;
	display: flex;
	font-size: 2em;
}

.deo {
	padding: 40px 0;
	flex: 1;
	min-width: 400px;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
}

.deo:last-child {
	background-color: #dfdfdf;
}

.Odeljak:nth-child(1) .Slika{
	background-image: url('assets/images/Slika9.jpg');
}
.Odeljak:nth-child(2) .Slika{
	background-image: url("assets/images/Slika13.jpg");
    background-position: 48%;
}
.Odeljak:nth-child(3) .Slika{
	background-image: url("assets/images/Slika14.jpg");
    background-position: 41%;
}
.Odeljak:nth-child(4) .Slika{
	background-image: url('assets/images/Slika12.jpg');
	background-position: 30%;
}

/* MOVIE COVER */

.Cover {
	background-color: #dfdfdf;
	border-radius: 5px;
	box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.55);
	cursor: pointer;
	background-size: 100% 100%;
	position: relative;
	transition: transform 0.3s;
	font-size: 1em;
	overflow: hidden;
}

.Cover .panel {
	position: absolute;
	top: 0; right: 0; left: 0; bottom: 0;
	background-color: rgba(0,0,0,0.8);
	opacity: 0;
	transition: opacity 0.3s;
	color: #eee;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	padding: 10px;
	font-size: .5em;
}

.Cover span {
	color: #ead54f;
	letter-spacing: .01em;
	position: absolute;
	bottom: 3px;
	right: 5px;	
	font-size: 2.5em;
}

.Cover:hover .panel {
	opacity: 1;
}

.Cover:hover {
	box-shadow: 1px 1px 7px 2px rgba(0,0,0,0.65);
	transform: scale(1.05);
}

/* UTISAK */

.Poruka {
	border-radius: 5px;
	box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.55);
	font-size: 1em;
	position: relative;
}

.Poruka:hover {
	box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.65);
}

.Poruka h4 {
	text-transform: uppercase;
	font-size: .5em;
	background-color: #222;
	color: #eee;
	letter-spacing: .17em;
	padding: 10px 5px;
	text-align: center;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
}

.Poruka p {
	font-size: .48em;
	padding: 10px;
}

/* LISTA PORUKA */

.Poruka .Ostalo {
	list-style: none;
	position: absolute;
	top: 37px;
	left: 0; right: 0;
	max-height: 150px;
	overflow-y: auto;
	background-color: #f44336;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	display: none;
	z-index: 2;
}

.Poruka:hover .Ostalo {
	display: block;
}

.Poruka .Ostalo li {
	width: 100%;
}

.Poruka .Ostalo li:hover {
	background-color: #222;
	color: #eee;
}

.Poruka .Ostalo li:hover span {
	color: #eee;
}

/* h2 */

h2 {
	text-align: center;
	padding: 20px;
}

h2 span {
	font-family: Roboto;
	font-weight: bold;
}

/* DUGME */

.Dugme {
	text-align: center;
	padding: 20px 50px;
	background-color: #111;
	color: #eee;
	font-size: 0.6em;
	box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.45);
	border-radius: 5px;
	cursor: pointer;
}

.Dugme:hover {
	box-shadow: 1px 1px 7px 2px rgba(0,0,0,0.85);
	color: #ccc;
}

.Disabled {
	opacity: 0.3;
	cursor: not-allowed;
}

/* POLICA */

.PolicaBack {
	overflow: hidden;
	box-shadow: 1px 1px 7px 2px rgba(0,0,0,0.65);
	margin: 10px 0px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	border-radius: 5px;
	flex-shrink: 0;
}

.Polica {
	font-size: .7em;
	background-color: #76c2ff;
	padding: 5px;
	border-collapse: collapse;
	max-width: 500px;
}

.Polica i {
	position: absolute;
	bottom: 2px;
	font-size: 0.8em;
	right: 0px;
	left: 0px;
	color: #ccc;
}

.Polica span {
	font-family: Roboto;
	color: #222;
}

.Polica th, .Polica td {
	padding: 15px 5px;
	text-align: center;
}

.Polica thead tr {
	background-color: #111;
	color: #eee;
	border-bottom: none;
	font-size: 0.8em;
}

.Polica th:first-child {
	background-color: #222;
}

.Polica th {
	padding: 15px 5px;
	cursor: pointer;
	position: relative;
}

.Polica th:hover {
	background-color: #222;	
}

.Polica th:first-child, .Polica td:first-child {
	width: 100px;
}

.Polica tbody {
	font-size: 0.6em;
	max-height: 45vh;
	overflow-y: auto;
	display: block;
	font-weight: bold;
}

.Polica thead, .Polica tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}

.Polica tr {
	border-bottom: 1px solid #6fbfff;
}

.Polica tr:last-child {
	border: none;
}

.Polica tr:nth-child(even) {
    background-color: #95d0ff;
}

.Polica tbody tr:hover {
	background-color: #222;
	color: #eee;
	cursor: pointer;
	box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.65);
	border-bottom: 1px solid #222;
}

.Polica tbody tr:hover span {
	color: #eee;
}

/* LINIJA */

.Linija {
	width: 90%;
	height: 2px;
	margin: 10px 0px;
	background: linear-gradient(to right, rgba(0,0,0,0) 0%,#999 25%,#999 75%,rgba(0,0,0,0) 100%);
}

/* PRAZNO-PUNO */

.Puno {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.Prazno {
	max-width: 400px;
	margin: auto;
	text-align: center;
	color: #aaa;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.Prazno i {
	font-size: 5em;
	padding: 10px;
}

.AktivnoPP {
	display: flex;
}

/* FILMOVI */

.FiS .deo {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.FiS .DugmetaBack {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-top: 10px;
	max-width: 450px;
}

.FiS .DugmetaBack .Poruka {
	margin: 15px;
	max-width: 300px;
	background-color: #afd8f9;
	visibility: hidden;
}

.FiS .Info, .Prijatelji .Info {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin: 10px 0px;
}

.FiS .Cover, .Prijatelji .Cover {
	width: 20vh;
	height: 28vh;
	background-image: url('/assets/images/M9.jpg');
}

.FiS .Cover i {
	color: #39c4ff;
}

.FiS .Plot, .Prijatelji .Plot {
	max-width: 300px;
	color: #333;
	font-size: 0.7em;
	padding: 5px;
}

.Plot table {
	border-collapse: collapse;
	font-size: 0.8em;
}

.Plot table td {
	padding: 3px 15px;
	color: #777;
}

.Plot table td:first-child {
	font-weight: bold;
	color: #222;
}

.Plot table span {
	font-family: Roboto;
}

.Plot .Zvezde {
	color: #444;
}

.myInfo {
	display: flex;
	justify-content: space-around;
	align-items: center;
}


.FiS .Izmena {
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: .8em;
	width: 60px;
	height: 60px;
	border-radius: 5px;
	background-color: #111;
	color: #ccc;
	box-shadow: 1px 1px 7px 2px rgba(0,0,0,0.65);
	cursor: pointer;
	margin-left: 20px;
}

.FiS .Poruka, .Prijatelji .myInfo .Poruka {
	max-width: 300px;
	margin: 15px;
	background-color: #76c2ff;
}

/* UTISCI */

.Odeljak .AktivnoU {
	visibility: visible;
	opacity: 1;
}

.Utisci {
	position: fixed;
	top: 0; bottom: 0; left: 0; right: 0;
	background-color: rgba(0,0,0,0.95);
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 3em;
	opacity: 0;
	transition: opacity 0.3s, visibility 0.3s;
	visibility: hidden;
}

.Utisci textarea {
	font-family: Roboto;
	outline: none;
	border-radius: 5px;
	color: #666;
	width: 100%;
	padding: 15px;
	margin-bottom: 10px;
	font-size: .4em;
	box-shadow: 1px 1px 7px 1px rgba(0,0,0,0.45);
	border:none;
	background-color: #efefef;
}

.Utisci .PotvrdaU {
	display: flex;
	width: 300px;
	justify-content: space-around;
}

.Utisci .Dugme:hover {
	color: #222;
	background-color: #eee;
}

/* RAZLIKA ZA SERIJE */

.Odeljak:nth-child(3) .Polica {
	background-color: #ff8d25;
}

.Odeljak:nth-child(3) .Polica tbody tr {
    border-bottom: 1px solid #f3831d;
}

.Odeljak:nth-child(3) .Polica tr:nth-child(even) {
    background-color: #e67c1c;
}

.Odeljak:nth-child(3) .Polica tr:nth-child(even):hover {
    background-color: #222;
    border-bottom: 1px solid #222;
}

.Odeljak:nth-child(3) .Poruka {
	background-color: #ff8d25;
}

.Odeljak:nth-child(3) .Cover {
	background-image: url('/assets/images/S1.jpg');
}

.Odeljak:nth-child(3) .Cover i {
	color: #FF9800;
}

/* RESPONSIVE */

@media screen and (max-height: 800px) {
    .Odeljak:nth-child(1) .deo:last-child ul li {
    	width: 150px;
    	height: 200px;
    }
    .Odeljak:nth-child(1) .deo:last-child ul {
    	max-width: 340px;
    }

    .Odeljak:nth-child(1) .projekat > p:last-child {
    	display: none;
    }
}

@media screen and (max-height: 700px) {
	.Odeljak:nth-child(1) .projekat h2:nth-child(3){
		display: none;
	}
	.Odeljak:nth-child(1) .deo:first-child ul {
		padding-top: 10px;
	}
}
</style>
