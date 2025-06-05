const cnv = document.getElementById('myCanvas');

cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d')

let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;

const text_score = document.querySelector('.score')

const gameOverModal = document.querySelector('.modal')
const gameOverScore = document.querySelector('.gameOverScore')
const btnNewGame = document.querySelector('.btn.newGame')

const startModal = document.querySelector('.startModal')
const btnInciarJogo = document.querySelector('.btn.iniciarJogo')

const controles = document.querySelector('.controles')
const btnEsquerda = document.querySelector('.btn.esquerda')
const btnDireita = document.querySelector('.btn.direita')
const btnAcelerar = document.querySelector('.btn.acelerar')
const btnAtirar = document.querySelector('.btn.atirar')


const barraTotalDeVida = document.querySelector('.container-barra-de-vida').offsetWidth
const barraDeVida = document.querySelector('.barra-de-vida')

const musicGame = document.querySelector('#music-game')
musicGame.volume = .5;

const explosao = 1
const disparo = 2


let projectiles = [];
let enemies = [];
let particles = [];
let fundo = [];

let intervalID;
let animateID;

let score = 0;
let dificultade = score + 1000;
let tempoCriarMeteoro = 160;

let frameMeteoro = 0

let tecla_D_Pressionada = false;
let tecla_A_Pressionada = false;
let tecla_W_Pressionada = false;
let tecla_ESPACO_Pressionada = false;

let anti_bug_press_inciar_jogo = false;