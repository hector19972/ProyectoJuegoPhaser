class SceneA extends Phaser.Scene {
    constructor() {
        super({ key: "SceneA", active: false });
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/moneda1.png');
        this.load.image('bomb', 'assets/enemigo.png');
        this.load.image('moneda', 'assets/moneda2.png');
        this.load.spritesheet('dude', 'assets/isaac2.png', { frameWidth: 32, frameHeight: 48 });

        //Audios
        this.load.audio('Sgolpe', ['assets/sounds/Bullet_Shot1.mp3']);
        this.load.audio('Smuerte', ['assets/sounds/Death.mp3']);
        this.load.audio('Smoneda1', ['assets/sounds/pennypickup.mp3']);
        this.load.audio('Smoneda2', ['assets/sounds/nickelpickup.mp3']);
        this.load.audio('Ssalto', ['assets/sounds/salto.mp3'])

        //musica
        this.load.audio('musica',['assets/music/Crusade.ogg','assets/music/Crusade.mp3'])


    }
    create() {
        //Inicialisando las variables importantes con cade nueva llamada:
        score = 0;
        vidas = 3;
        gameOver = false;
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //Sonidos
        Sgolpe = this.sound.add('Sgolpe');
        Smuerte = this.sound.add('Smuerte');
        Smoneda1 = this.sound.add('Smoneda1');
        Smoneda2 = this.sound.add('Smoneda2');
        Ssalto = this.sound.add('Ssalto')
        Mfondo=this.sound.add('musica');
        Mfondo.play();

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        monedas2 = this.physics.add.group({
            key: 'moneda',
            repeat: 2,
            setXY: {
                x: 20, y: 0, stepX: Phaser.Math.Between(10, 500)
            },
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        monedas2.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
            child.setBounceX(Phaser.Math.FloatBetween(0.9, 1));
            child.setCollideWorldBounds(true);
            child.setVelocity(Phaser.Math.Between(-200, 200), 30);
            child.allowGravity = false;

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontFamily: 'font1', fontSize: '32px', fill: '#000' });
        vidasText = this.add.text(16, 48, 'vidas: 3', { fontFamily: 'font1', fontSize: '32px', fill: '#CC0000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(monedas2, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, monedas2, collectMonedas, null, this);

        this.physics.add.collider(player, bombs, hitBomb, null, this);
    }

    update() {

        if (gameOver) {
            //Manejo de vidas de el usuario.
            if (vidas <= 0) {
                Smuerte.play();
                Mfondo.stop();
                if (localStorage.getItem("Puntaje" + NuUsuario) <= score || localStorage.getItem("Puntaje" + NuUsuario) == null) {
                    localStorage.setItem("Puntaje" + NuUsuario, score);
                    console.log("Nuevo mejor puntaje");
                }
                this.scene.start("GameOver");
                return;
            } else {
                Sgolpe.play();
                vidas--;
                vidasText.setText("Vidas: " + vidas);
                gameOver = false;
                this.physics.resume();
            }
        }
        if(score>50){
            Mfondo.stop();
            this.scene.start('SceneB');
            
        }

        if (cursors.left.isDown && cursors.shift.isDown && player.body.touching.down) {
            vel = vel - 15;
            player.setVelocityX(-300);


            player.anims.play('left', true);
        }
        else if (cursors.left.isDown && player.body.touching.down) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown && cursors.shift.isDown && player.body.touching.down) {
            vel = vel + 15;
            player.setVelocityX(300);


            player.anims.play('right', true);
        } else if (cursors.right.isDown && player.body.touching.down) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            if (vel < -15) {
                vel = vel + 5;
            } else if (vel > 15) {
                vel = vel - 5;
            } else if (vel < 10 && vel > -10 && player.body.touching.down) {
                player.setVelocityX(0);

            } else if (player.body.touching.down) {
                player.setVelocityX(0);
            }
            //player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.space.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
            Ssalto.play();
        }
    }
}
function collectStar(player, star) {
    star.disableBody(true, true);
    Smoneda1.play();
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        if (monedas2.countActive(true) === 0) {
            //  A new batch of stars to collect
            monedas2.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }

}
function collectMonedas(player, moneda) {
    moneda.disableBody(true, true);
    Smoneda2.play();
    //  Add and update the score
    score += 50;
    scoreText.setText('Score: ' + score);

    if (monedas2.countActive(true) === 0 && stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        monedas2.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();
    bomb.disableBody(true, true);

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
