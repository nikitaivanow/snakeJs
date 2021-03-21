const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
let startMusic = document.getElementById("sound")

const ground = new Image()
ground.src  = "img/background.png"

const food = new Image()
food.src  = "img/melon.png"

let body = new Image()
body.src = "img/body.png"

const headLeft = new Image()
headLeft.src = "img/headLeft.png"

const headRight = new Image()
headRight.src = "img/headRight.png"

const headUp = new Image()
headUp.src = "img/headUp.png"

const headDown = new Image()
headDown.src = "img/headDown.png"

const pauseBg = new Image()
pauseBg.src = "img/pause1.png"

const firstScreen = new Image()
firstScreen.src = "img/FirstScreen.png"

const gameOver = new Image()
gameOver.src = 'img/gameOver.png'

const kaktus = new Image()
kaktus.src = "img/kaktus.png"


let head = headUp

let box = 32;

let score = 0;

let melon = {
	x: Math.floor((Math.random() * 20 + 1)) * box,
	y: Math.floor((Math.random() * 17 + 4)) * box,
}

let danger = {
x: Math.floor((Math.random() * 20 + 1)) * box ,
y: Math.floor((Math.random() * 17 + 4)) * box  ,
}
let danger1 = {
	x: Math.floor((Math.random() * 20 + 1)) * box ,
	y: Math.floor((Math.random() * 17 + 4)) * box  ,
	}
let danger2 = {
		x: Math.floor((Math.random() * 20 + 1)) * box ,
		y: Math.floor((Math.random() * 17 + 4)) * box  ,
		}

let snake = []

function resetSnake(){
	snake[0] = {
	x: 10 * box,
	y: 12 * box}
	snake.length = 1
	head = headUp
	dir = ""
	score = 0
	melon = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		},
	danger = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
	danger1 = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
	danger2 = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
}

function endGame(){
	clearInterval(game)
	ctx.drawImage(gameOver, 0, 0)
	gameState = "gameOver"

}

document.addEventListener("keydown", direction)

function start(){
	ctx.drawImage(firstScreen, 0,0)
	ctx.startMusic.play()
	startMusic = "true"

}


let dir
let gameState = "menu"




function direction(event){
	if(event.keyCode == 37 && dir !="right")
		dir = "left"
	else if(event.keyCode == 38 && dir !="down")
		dir = "up"
	else if(event.keyCode == 39 && dir !="left")
		dir = "right"
	else if(event.keyCode == 40  && dir !="up")
		dir = "down"
	else if(event.keyCode == 32 )
		changeState()
}
function changeState(){
	if (gameState == "game"){
		gameState = "pause"
		clearInterval(game)
		ctx.drawImage(pauseBg, 0,0)
	}else if(gameState=="pause"){
		gameState="game"
		game = setInterval(drawGame,150)
	}else if(gameState=="menu"){
		resetSnake()
		gameState="game"
		game = setInterval(drawGame,150)
	}else if(gameState == "gameOver"){
		gameState="game"
		resetSnake()
		game = setInterval(drawGame,150)
	}

}


function eatBody(head, arr){
	for(let i=0; i<arr.length; i++){
		if(head.x == arr[i].x && head.y == arr[i].y)
			endGame()
	}
}


function drawGame(){

	ctx.drawImage(ground, 0, 0)

	ctx.drawImage(food, melon.x, melon.y)

	ctx.drawImage(kaktus, danger.x, danger.y)

	ctx.drawImage(kaktus, danger2.x, danger2.y)

	ctx.drawImage(kaktus, danger1.x, danger1.y)

	for(let i=0; i<snake.length; i++){
		let partOftheBody
		i == 0
		? partOftheBody = head
		: partOftheBody = body
		ctx.drawImage(partOftheBody,  snake[i].x , snake[i].y, box , box)
	}
	ctx.fillStyle = "white";
	ctx.font = "60px Arial";
	ctx.fillText(score, box * 2.6, box * 2);
	

	let snakeX = snake[0].x
	let snakeY = snake[0].y

	if(snakeX==melon.x && snakeY==melon.y){
		score++
		melon = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		},
		danger = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
		danger1 = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
		danger2 = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
	}else if(snakeX==danger.x && snakeY==danger.y || snakeX==danger1.x && snakeY==danger1.y||snakeX==danger2.x && snakeY==danger2.y){
		 danger = {
			x: Math.floor((Math.random() * 20 + 1)) * box,
			y: Math.floor((Math.random() * 17 + 4)) * box,
		}
		endGame()

	}else{
		snake.pop();
	}

	if(snakeX < box || snakeX > box * 21
		|| snakeY < 4 * box || snakeY > box * 22){
		endGame()}
	if(dir == "left") {snakeX -= box; head = headLeft;}
	if(dir == "right") {snakeX += box; head = headRight;}
	if(dir == "up") {snakeY -= box;head =headUp}
	if(dir == "down") {snakeY += box;head =headDown}

	let newHead = {
		x: snakeX,
		y: snakeY
	}
	eatBody(newHead, snake)

	snake.unshift(newHead)

}




