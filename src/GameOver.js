var button;
var background;
class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver", active: false });
    }
    preload() {
        this.load.image('regresar', 'assets/BotonRegresar.png');
        this.load.image('backOver', 'assets/fondo.png');
        

    }

    create() {
        this.add.image(400, 300, 'backOver');
        var back = this.add.image(700, 550, 'regresar');
        MfondoOver=this.sound.add('musicaGameover');
        MfondoOver.play();
        overText = this.add.text(400, 250, "Has muerto\n \n \n Puedes volver a intentarlo \n \n \n Llega a 500 puntos y podras\n avanzar al siguiente nivel", { fontFamily: 'font1', fontSize: '40px', fill: '#000',align:'center'}).setOrigin(0.5);
        back.setInteractive();
        back.once('pointerdown', function () {
            //this.scene.add("SceneD", new SceneD);
            MfondoOver.stop();
            this.scene.stop('SceneA');
            this.scene.stop('SceneB');
            this.scene.start("Menu");
        }, this)



    }



}