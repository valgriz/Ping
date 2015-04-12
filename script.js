var game = new Phaser.Game(800,600, Phaser.AUTO, '',{preload: preload, create: create, update: update});

this.game.stage.scape.pageAlignHorizontally = true;
this.game.stage.scale.pageAlighVertically = true;
this.game.stage.scale.refresh();

function preload(){
	game.load.image('back1', '/assets/back1.png');
	game.load.image('paddle', '/assets/paddle.png');
	game.load.image('ball', '/assets/ball.png');
	game.load.image('padding', '/assets/advpadding.png');

	game.load.audio('sounda','/assets/sounda.mp3');

}

var paddleObj;

var paddingGroup;

var leftKey;
var rightKey;
var aKey;
var dKey;

var balls;
var ballVel;

var score;
var scoreText;

var sounda;

var space;
var barPos;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'back1');

	ballVel =  [1,1,1,1,1,1,1,1,1,1];

	paddingGroup = game.add.group();
	paddingGroup.enableBody = true;

	for(var i = 0; i < 2; i++){
		//var pad = paddingGroup.create(0, i * (game.world.height - game.cache.getImage('padding').height) , 'padding');
		//pad.body.immovable = true;
		}


	paddleObj = game.add.sprite((game.world.width/2) - (game.cache.getImage('paddle').width/2), game.world.height - 40,'paddle');
	game.physics.arcade.enable(paddleObj);

	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	paddleObj.body.immovable = true;
	balls = game.add.group();
	balls.enableBody = true;

	for(var i = 0; i < 11; i++){
		var ball = balls.create(36 + (i * 72), 40, 'ball');
		//ball.body.velocity.y = 600;
		//ball.body.bounce.y = 1;
		//ball.body.collideWorldBounds = true;
	}



	game.physics.arcade.enable(balls);

	paddleObj.body.allowGravity = false;

	scoreText = game.add.text(16, 16,'Score: 0'), {fontSize: '32px', fill: '#000'};

	score = 0;

	sounda = game.add.audio('sounda');

	space.onDown.add(move, this);

	barPos=0;
}

function update(){

	game.physics.arcade.collide(balls, paddleObj);

	if(leftKey.isDown || aKey.isDown){
		paddleObj.body.velocity.x = -450;
	}else if(rightKey.isDown || dKey.isDown){
		paddleObj.body.velocity.x = 450;
	}else if(leftKey.is){

	}else{
	paddleObj.body.acceleration.x = -3 * paddleObj.body.velocity.x;	
	}

	if(paddleObj.x < 30){
		paddleObj.x = 30;
	} else if(paddleObj.x + game.cache.getImage('paddle').width > game.world.width - 30) {
		paddleObj.x = game.world.width - game.cache.getImage('paddle').width - 30;
	}

	for(var i = 0; i < balls.length; i++){
		var temp = balls.getAt(i);
		temp.body.y += (20 * ballVel[i]);
		if(temp.body.y > (20 * 28)){
			ballVel[i] = -ballVel[i];
			temp.body.y += 2 * (20 * ballVel[i]);
		} else if(temp.body.y < (20 * 2)){
			ballVel[i] = -ballVel[i];
			temp.body.y += 2 * (20 * ballVel[i]);
			sounda.play();
		}
	}

	//game.physics.arcade.collide(paddingGroup, balls);

	// for(var i = 0; i < balls.length; i++){
	// 	var curr = balls.getAt(i);
	// 	if(curr.y > game.world.height -50){
	// 		curr.body.velocity.y = -curr.body.velocity.y;
	// 		curr.y = (game.world.height -50)- Math.abs(curr.body.velocity.y)/16; //velocity / 15 subtract
	// 	}
	// 	if (curr.y < 30){
	// 		curr.body.velocity.y = -curr.body.velocity.y;
	// 		curr.y = 30 + Math.abs(curr.body.velocity.y)/16; //velocity / 15 subtract
	// 		sounda.play();
	// 	}
	// //score++;
	// scoreText.text = "Score: " + score;
	// }
}

function move(){
	barPos++;
	if(barPos>2){
		barPos=0;
	}
	paddleObj.y = game.world.height - (40 + (135* barPos));
	score = barPos;
}