var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
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
var scorePotion = 0;
var charge = 0;
var pvEnnemis = 3;
var pvEnnemis2 = 3;
var pvEnnemis3 = 3;


function init(){
 	var platforms;
	var player;
	var cursors;
	var gems;
	var walls;
	var scoreText;
	var rochers;
	var potions;
	var pv1;
	var pv2;
	var pv3;
	var ennemis;
	var ennemis2;
	var ennemis3;
	var projectiles;
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
	this.load.image('potions','assets/potion.png');
	this.load.image('walls','assets/walls.png');
	this.load.image('projectiles','assets/projectiles.png');
	this.load.spritesheet('perso','assets/PoolMen_Idle.png',{frameWidth: 30, frameHeight: 47});
	this.load.spritesheet('ennemis','assets/ennemis.png',{frameWidth: 40, frameHeight: 39});

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
	platforms.create(600,520,'platehaute').setScale(0.8).setSize(68,45).setOffset(15,10);
	platforms.create(470,460,'platehaute').setScale(0.8).setSize(68,45).setOffset(15,10);
	platforms.create(390,460,'platehaute').setScale(0.8).setSize(68,45).setOffset(15,10);
	platforms.create(790,590,'platehaute');
	platforms.create(190,410,'platehaute');
	platforms.create(550,280,'platehaute');
	platforms.create(450,280,'platehaute');
	platforms.create(100,350,'platehaute').setScale(0.8).setSize(68,45).setOffset(15,10);
	platforms.create(300,300,'platehaute').setScale(0.5).setSize(45,35).setOffset(25,19);;

	walls = this.physics.add.staticGroup();
	walls.create(245,520,'walls').visible = false;
	walls.create(455,520,'walls').visible = false;
	walls.create(395,220,'walls').visible = false;
	walls.create(605,220,'walls').visible = false;
	walls.create(745,520,'walls').visible = false;


	ennemis = this.physics.add.sprite(300,450,'ennemis').setSize(30,40).setScale(0.8);
	ennemis.setCollideWorldBounds(true);
	ennemis.setBounceY(0);
	ennemis.setBounceX(1);
	ennemis.body.setGravityY(100);
	ennemis.setVelocityX(40);
	this.physics.add.collider(ennemis,platforms);
	this.physics.add.collider(ennemis,walls);

	ennemis2 = this.physics.add.sprite(650,450,'ennemis').setSize(30,40).setScale(0.8);
	ennemis2.setCollideWorldBounds(true);
	ennemis2.setBounceY(0);
	ennemis2.setBounceX(1);
	ennemis2.body.setGravityY(100);
	ennemis2.setVelocityX(40);
	this.physics.add.collider(ennemis2,platforms);
	this.physics.add.collider(ennemis2,walls);

	ennemis3 = this.physics.add.sprite(550,220,'ennemis').setSize(30,40).setScale(0.8);
	ennemis3.setCollideWorldBounds(true);
	ennemis3.setBounceY(0);
	ennemis3.setBounceX(1);
	ennemis3.body.setGravityY(100);
	ennemis3.setVelocityX(40);
	this.physics.add.collider(ennemis3,platforms);
	this.physics.add.collider(ennemis3,walls);

	player = this.physics.add.sprite(100,450,'perso').setScale(0.8);
	player.setCollideWorldBounds(true);
	player.setBounce(0);
	player.body.setGravityY(100);
	this.physics.add.collider(player,platforms);
	this.physics.add.collider(player,ennemis, hitPlayer, null, this);
	this.physics.add.collider(player,ennemis2, hitPlayer2, null, this);
	this.physics.add.collider(player,ennemis3, hitPlayer3, null, this);

	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 1}),
		frameRate: 2,
		repeat: -1
	});

	this.anims.create({
		key: 'gauche',
		frames: this.anims.generateFrameNumbers('ennemis', {start: 0, end: 7}),
		frameRate: 5,
		repeat: -1
	});

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

	potion = this.physics.add.group();
	this.physics.add.collider(potion, platforms);
	this.physics.add.overlap(potion, ennemis, ennemisPotion);
	this.physics.add.overlap(potion, ennemis2, ennemisPotion2);
	this.physics.add.overlap(potion, ennemis3, ennemisPotion3);
	this.physics.add.overlap(player,potion,collectPotion,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	rochers = this.physics.add.group();
	this.physics.add.collider(rochers,platforms, rocherSol);
	this.physics.add.overlap(rochers, potion, rocherPotion);
	this.physics.add.collider(player,rochers, hitRochers, null, this);

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
	this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	projectiles = this.physics.add.group({
		key: 'projectiles',
		maxSize: 10,
		setXY: {x:player.x,y:player.y}
	});


		this.physics.add.collider(projectiles,platforms, disparaitCaillou);
		this.physics.add.collider(projectiles,ennemis, disparaitEnnemis);
		this.physics.add.collider(projectiles,ennemis2, disparaitEnnemis2);
		this.physics.add.collider(projectiles,ennemis3, disparaitEnnemis3);

}



function update(){


	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.anims.play('idle', false);
		player.setVelocityX(-100);
		player.setFlipX(true);
		//SPRINT
			if (this.ctrl.isDown) {
					player.setVelocityX(-200);
			}
	}else if(cursors.right.isDown){
		player.setVelocityX(100);
		player.anims.play('left', true);
		player.anims.play('idle', false);
		player.setFlipX(false);
		//SPRINT
			if (this.ctrl.isDown) {
					player.setVelocityX(200);
			}
	}else{
		player.anims.play('idle', true);
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

	if (this.space.isDown) {
		charge = 1;
		//	if (player.body.velocity.x > 0) {
		if (projectiles.countActive(true) === 0){
			projectiles.children.iterate(function(child){
				child.enableBody(true,player.x, player.y,0, true, true);
			});
	}
		//	}
		}


	if (this.space.isUp && charge == 1) {
		if (player.body.velocity.x > 0) {
			projectiles.setVelocityX(200);
		} else if (player.body.velocity.x < 0) {
			projectiles.setVelocityX(-200);
		}else if (player.body.velocity.x == 0){
			projectiles.setVelocityY(-200);
		}
		projectiles.setVelocityY(-10);
}
	// ennemis

		if (ennemis.body.velocity.x < 0) {
			ennemis.setFlipX(true);
		} else {
			ennemis.anims.play('gauche', true);
			ennemis.setFlipX(false);
		}

		if (ennemis2.body.velocity.x < 0) {
			ennemis2.setFlipX(true);
		} else {
			ennemis2.anims.play('gauche', true);
			ennemis2.setFlipX(false);
		}

		if (ennemis3.body.velocity.x < 0) {
			ennemis3.setFlipX(true);
		} else {
			ennemis3.anims.play('gauche', true);
			ennemis3.setFlipX(false);
		}

		if (pv == 0) {
			pv1.visible = false;
			this.physics.pause();
			gameOver = true;
		}


}

function hitRochers(player, rochers){
			rochers.disableBody(true, true);
	if (pv == 0) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
		pv1.visible = false;
		gameOver = true;
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
	scorePotion += 10;
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
	if (scorePotion == 200) {
		x = (player.x < 400) ?
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		potions = potion.create(x, 20, 'potions');
		potions.setBounce(0);
		potions.setCollideWorldBounds(true);
		potions.setVelocity(Phaser.Math.Between(0, 0), 200);
	}
}

function rocherSol(rocher, platforms) {
    rocher.setVelocityX(0);
}

function collectPotion(player, potion){
	potion.disableBody(true, true);
	scorePotion = 0;
	pv++;
		if (pv == 2) {
				pv2.visible = true;
		} else if (pv == 3) {
				pv3.visible = true;
		}
	if (pv > 3) {
		pv = 3;
	}
}

function rocherPotion(rocher, potion){
	rocher.setScale(1.5);
	potion.disableBody(true,true);
	scorePotion = 0;
}

function ennemisPotion(ennemis, potion){
	ennemis.setScale(1.5);
	potion.disableBody(true,true);
	scorePotion = 0;
	ennemis.setVelocityY(-200);
}

function ennemisPotion2(ennemis2, potion){
	ennemis2.setScale(1.5);
	potion.disableBody(true,true);
	scorePotion = 0;
	ennemis2.setVelocityY(-200);
}

function ennemisPotion3(ennemis3, potion){
	ennemis3.setScale(1.5);
	potion.disableBody(true,true);
	scorePotion = 0;
	ennemis3.setVelocityY(-200);
}

function hitPlayer(player, ennemis){
	player.setVelocityY(-300);
	player.setVelocityX(-100);
	ennemis.setVelocityX(40);
	if (pv == 0) {
		player.setTint(0xff0000);
		player.anims.play('turn');
		pv1.visible = false;
		gameOver = true;
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

function hitPlayer2(player, ennemis2){
	player.setVelocityY(-300);
	player.setVelocityX(-100);
	ennemis2.setVelocityX(40);
	if (pv == 0) {
		player.setTint(0xff0000);
		player.anims.play('turn');
		pv1.visible = false;
		gameOver = true;
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

function hitPlayer3(player, ennemis3){
	player.setVelocityY(-300);
	player.setVelocityX(-100);
	ennemis3.setVelocityX(40);
	if (pv == 0) {
		player.setTint(0xff0000);
		player.anims.play('turn');
		pv1.visible = false;
		gameOver = true;
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

function disparaitCaillou(projectiles, platforms){
	projectiles.disableBody(true,true);
}

function disparaitEnnemis(ennemis, projectiles){
	pvEnnemis = pvEnnemis -1;
	ennemis.setVelocityX(40);
	ennemis.setTint(0xff0000);
	projectiles.disableBody(true, true);
		if (pvEnnemis == 0) {
			ennemis.disableBody(true, true);
		}
}

function disparaitEnnemis2(ennemis2, projectiles){
	pvEnnemis2 = pvEnnemis2 -1;
	ennemis2.setVelocityX(40);
	ennemis2.setTint(0xff0000);
	projectiles.disableBody(true, true);
		if (pvEnnemis2 == 0) {
			ennemis2.disableBody(true, true);
		}
}

function disparaitEnnemis3(ennemis3, projectiles){
	pvEnnemis3 = pvEnnemis3 -1;
	ennemis3.setTint(0xff0000);
	ennemis3.setVelocityX(40);
	projectiles.disableBody(true, true);
		if (pvEnnemis3 == 0) {
			ennemis3.disableBody(true, true);
		}
}
//function shoot(projectiles){
//	var projectile = this.projectiles.get(player.x, player.y);
//		if (projectile) {
//				projectile.setActive = true;
//				projectile.setVisible = true;
//				projectile.body.velocity.x = 200;
//		}
//}
