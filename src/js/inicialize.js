const cnv = document.getElementById('myCanvas');

cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d')

const shootingSpeed = 4;

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
let score = 0;
let animateID;