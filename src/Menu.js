//menu principal

var button;
var background;
class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu", active: true });
    }
    preload() {
        this.load.image('eye', 'assets/platform.png');
        this.load.image('fondo', 'assets/fondo.png');
        this.load.image('juegar', 'assets/BotonJugar.png');
        this.load.image('scores','assets/BotonRecords.png');
        this.load.image('instrucciones','assets/BotonInstrucciones.png');
        this.load.audio('musicaGameover',['assets/music/The Forgotten.ogg','assets/music/The Forgotten.mp3']);
    }

    create() {
        this.add.image(400, 300, 'fondo');
        var play = this.add.image(400, 120, 'juegar');
        var scores = this.add.image(400, 270, 'scores');
        var instruccions = this.add.image(400, 420, 'instrucciones');
        play.setInteractive();
        play.once('pointerdown', function () {
            nuevoUsuario = true;
            var idJugador = prompt("Pease enteryour name", "name");
            if (typeof (Storage) !== "undefined") {
                // Store
                if (localStorage.getItem("Id0") == null) {
                    console.log("Esto esta mal")
                    localStorage.setItem("Id0", idJugador);
                }
            } else {
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
            }
            for (index = 0; localStorage.getItem("Id" + index) != null; index++) {
                if (idJugador == localStorage.getItem("Id" + index)) {
                    NuUsuario = index;
                    nuevoUsuario = false;
                    console.log("Nuevo susuario existente? " + nuevoUsuario);
                } else {
                    console.log("Nuevo susuario existente? " + nuevoUsuario);
                }                
            }
            if (nuevoUsuario == false) {
                console.log("Ultima entrada en la tabla = " + index + " Al usuario ya existe le correspond el id" + NuUsuario);
            } else {
                NuUsuario=index;
                console.log("Creando al usuario " + idJugador)
                localStorage.setItem("Id"+index, idJugador);
            }
            //this.scene.add("SceneA", new SceneA);
            this.scene.start("SceneA");

        }, this);
        scores.setInteractive();
        scores.once('pointerdown', function () {            
            //this.scene.add("SceneD", new SceneD);
            this.scene.start("Puntajes");
        }, this)
        instruccions.setInteractive();
        instruccions.once('pointerdown', function () {            
            //this.scene.add("SceneD", new SceneD);
            this.scene.start("Instrucciones");
        }, this)



    }



}


