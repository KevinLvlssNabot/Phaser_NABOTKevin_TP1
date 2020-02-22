var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;
var jump = 0;
var pv = 3;


function init(){
 	var platforms;
	var player;
	var cursors;
	var gems;
	var scoreText;
	var rochers;
	var pv1;
	var pv2;
	var pv3;
}

function preload(){
	this.load.image('ciel','assets/skies.png');
	this.load.image('mer','assets/sea.png');
	this.load.image('nuages','assets/clouds.png');
	this.load.image('groundFond','assets/far-grounds.png');
	this.load.image('gems','assets/gems.png');
	this.load.image('sol','assets/sol.png');
	this.load.image('rochers','assets/meteor.png');
	this.load.image('arbre','assets/arbre.png');
	this.load.image('platehaute','assets/platehaute.png');
	this.load.image('pv1','assets/pv.png');
	this.load.image('pv2','assets/pv.png');
	this.load.image('pv3','assets/pv.png');
	this.load.spritesheet('perso','assets/personne.png',{frameWidth: 25, frameHeight: 50});
}



function create(){
	this.add.image(400,300,'ciel');
	this.add.image(100,400,'nuages');
	this.add.image(400,400,'nuages');
	this.add.image(800,500,'nuages');
	this.add.image(400,500,'groundFond');
	this.add.image(200,485,'arbre');
	this.add.image(300,620,'mer');
	pv1 = this.add.image(650,30,'pv1').setScale(1.5);
	pv2 = this.add.image(700,30,'pv2').setScale(1.5);
	pv3 = this.add.image(750,30,'pv3').setScale(1.5);


	platforms = this.physics.add.staticGroup();
	platforms.create(300,588,'platehaute');
	platforms.create(400,588,'platehaute');
	platforms.create(100,588,'sol');
	platforms.create(600,588,'sol');
//	platforms.create(600,400,'platehaute');
//	platforms.create(50,250,'platehaute');

	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0);
	player.body.setGravityY(100);
	this.physics.add.collider(player,platforms);

	cursors = this.input.keyboard.createCursorKeys();

	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 5}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key:'stop',
		frames: [{key: 'perso', frame:0}],
		frameRate: 10
	});

	gems = this.physics.add.group({
		key: 'gems',
		repeat:10,
		setXY: {x:12,y:0,stepX:70}
	});

//	pv = this.physics.add.group({
//		key: 'pv',
//		repeat:2,
//		setXY: {x:12,y:12,stepX:100}
//	});

	this.physics.add.collider(gems, platforms);
	this.physics.add.overlap(player,gems,collectGems,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	rochers = this.physics.add.group();
	this.physics.add.collider(rochers,platforms, rocherSol);
	this.physics.add.collider(player,rochers, hitRochers, null, this);

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

}



function update(){
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-150);
		player.setFlipX(true);
		//SPRINT
			if (this.ctrl.isDown) {
					player.setVelocityX(-300);
			}
	}else if(cursors.right.isDown){
		player.setVelocityX(150);
		player.anims.play('left', true);
		player.setFlipX(false);
		//SPRINT
			if (this.ctrl.isDown) {
					player.setVelocityX(300);
			}
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
// Double Jump
	if (player.body.touching.down) {
			jump = 0;
	}

	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-200);
		player.clearTint(0xff0000);
	}

	if(cursors.up.isUp && !player.body.touching.down && jump == 0){
		jump = 1;
	}

	if (jump == 1) {
			if (cursors.up.isDown) {
				player.setVelocityY(-250);
				jump = 2;
			}
	}
}

function hitRochers(player, rochers){
	if (pv == 0) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
		pv1.visible = false;
		gameOver=true;
	} else if (pv > 0){
		pv = pv -1;
		player.setTint(0xff0000);
	}
	if (pv == 2) {
		pv3.visible = false;
	}
	if (pv == 1) {
		pv2.visible = false;
	}
}


function collectGems(player, gem){
	gem.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);
	if (gems.countActive(true) === 0){
		gems.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});


		var x = (player.x < 400) ?
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		var rocher = rochers.create(x, 20, 'rochers');
		rocher.setBounce(0);
		rocher.setCollideWorldBounds(true);
		rocher.setVelocity(Phaser.Math.Between(-200, 200), 200);

}
}

function rocherSol(rocher, platforms) {
    rocher.setVelocityX(0);
}
