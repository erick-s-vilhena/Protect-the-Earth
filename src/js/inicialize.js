const cnv = document.getElementById('myCanvas');

cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d')

const shootingSpeed = 5;

const text_score = document.querySelector('.score')

const gameOverModal = document.querySelector('.modal')
const gameOverScore = document.querySelector('.gameOverScore')
const btnNewGame = document.querySelector('.btn.newGame')

const startModal = document.querySelector('.startModal')
const btnInciarJogo = document.querySelector('.btn.iniciarJogo')

let projectiles = [];
let enemies = [];
let particles = [];
let fundo = [];

let intervalID;
let animateID;

let score = 0;

let tecla_D_Pressionada = false;
let tecla_A_Pressionada = false;
let tecla_W_Pressionada = false;