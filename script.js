var game = new Phaser.Game(820, 560, Phaser.AUTO, '',{preload: preload, create: create, update: update});

this.game.stage.scape.pageAlignHorizontally = true;
this.game.stage.scale.pageAlighVertically = true;
this.game.stage.scale.refresh();

function preload(){
	game.load.image('back1', '/btc2/assets/back2.png');
	game.load.image('paddle', '/btc2/assets/paddle.png');
	game.load.image('ball', '/btc2/assets/ball.png');
	game.load.image('padding', '/btc2/assets/advpadding.png');

	game.load.audio('s390','/btc2/sounds/390.mp3');
	game.load.audio('s440','/btc2/sounds/440.mp3');
	game.load.audio('s523','/btc2/sounds/523.mp3');
	game.load.audio('s587','/btc2/sounds/587.mp3');
	game.load.audio('s659','/btc2/sounds/659.mp3');
	game.load.audio('s783','/btc2/sounds/783.mp3');
	game.load.audio('s880','/btc2/sounds/880.mp3');
	game.load.audio('s1046','/btc2/sounds/1046.mp3');
	game.load.audio('s1174','/btc2/sounds/1174.mp3');


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

var s1;
var s2;
var s3;
var s4;
var s5;
var s6;
var s7;
var s8;
var s9;
var s10;

var sounds;
var space;
var barPos;

var timeConstant;
var timeCounter;
var pdx;

var platX;
var platY;
var platW;
var platH;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0,'back1');

	ballVel =  [1,1,1,1,1,1,1,1,1,1];
	timeConstant = 1;
	timeCounter = 0;
	pdx = 0;

	platX = 16;
	platY = 26;
	platW = 8;
	platH = 1;

	s1 = game.add.audio('s390');
	s2 = game.add.audio('s440');
	s3 = game.add.audio('s523');
	s4 = game.add.audio('s587');
	s5 = game.add.audio('s659');
	s6 = game.add.audio('s783');
	s7 = game.add.audio('s880');
	s8 = game.add.audio('s1046');
	s9 = game.add.audio('s1174');
	s10 = game.add.audio('s390');
	
	sounds = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

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
		var ball = balls.create((20 * 2) + (i * 80), 40 + ((0 * i)%460), 'ball');
		//ball.body.velocity.y = 600;
		//ball.body.bounce.y = 1;
		//ball.body.collideWorldBounds = true;
	}



	game.physics.arcade.enable(balls);

	paddleObj.body.allowGravity = false;

	//scoreText = game.add.text(16, 16,'Score: 0'), {fontSize: '32px', fill: '#000'};

	score = 0;

	

	space.onDown.add(move, this);

	barPos = 0;
}

function update(){

	game.physics.arcade.collide(balls, paddleObj);

	if(leftKey.isDown || aKey.isDown){
		pdx = -1;
	}else if(rightKey.isDown || dKey.isDown){
		pdx = 1;
	}else{
		pdx = 0;
	}



	// if(paddleObj.x < 30){
	// 	paddleObj.x = 30;
	// } else if(paddleObj.x + game.cache.getImage('paddle').width > game.world.width - 30) {
	// 	paddleObj.x = game.world.width - game.cache.getImage('paddle').width - 30;
	// }


	


	if(timeCounter == timeConstant){
		platX += pdx;
		paddleObj.body.x = 20 * platX;
		paddleObj.body.y = 20 * platY;

		for(var i = 0; i < balls.length; i++){
			var temp = balls.getAt(i);
			temp.body.y += (20 * ballVel[i]);
			
			if(temp.body.y > (20 * ((game.world.height/20) - 2))){
				ballVel[i] = -ballVel[i];
				temp.body.y += 2 * (20 * ballVel[i]);
			} else if(temp.body.y < (20 * 2)){
				ballVel[i] = -ballVel[i];
				temp.body.y += 2 * (20 * ballVel[i]);
				//sounda.play();
				var temps = sounds[i];
				temps.play();

			}

			if((temp.body.y/20)== platY){
				if((temp.body.x/20) + 1 > platX && (temp.body.x/20) < platX + platW ){
					ballVel[i] = -ballVel[i];
				}
			}
		}
	}

	if(timeCounter > timeConstant){
		timeCounter = 0;
	}



	timeCounter++;


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
	if(barPos>4){
		barPos=0;
	}
	//paddleObj.y = game.world.height - ((20 * 2) + ((20 * 6)* barPos));
	platY = (game.world.height/20) - (2 + (3 * barPos));

	//original 6 * barPos
	paddleObj.body.y = 20 * platY;
	score = barPos;
}