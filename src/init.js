const config = {
    width: 800,
    height: 600,
    paretn: 'juego',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
    type: Phaser.CANVAS,
    backgroundColor: '#dccfc7',
    scene: [Menu, SceneA, SceneB ,Instrucciones,Puntajes,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }



}
var player;
var stars;
var monedas2;
var bombs;
var vidas;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var vidasText;
var overText;
var vel=60;
var NuUsuario=0;
var nuevoUsuario=true;
var index=0;
//audios
var Sgolpe;
var Smuerte;
var Smoneda1;
var Smoneda2;
var Ssalto;
//musica
var Mfondo;
var MfondoOver;

new Phaser.Game(config);

