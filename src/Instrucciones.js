//Mostrar puntuacion, cambiar nombres

var button;
var background;
class Instrucciones extends Phaser.Scene {
    constructor() {
        super({ key: "Instrucciones", active: false });
    }
    preload() {
        this.load.image('regresar', 'assets/BotonRegresar.png');
        this.load.image('back','assets/Instrucciones.png')
    
    }

    create() {
        this.add.image(400, 300, 'back');

        var back = this.add.image(700, 550, 'regresar');

        back.setInteractive();
        back.once('pointerdown', function () {
            console.log("Hola");
            //this.scene.add("SceneD", new SceneD);
            this.scene.start("Menu");
        }, this)



    }



}