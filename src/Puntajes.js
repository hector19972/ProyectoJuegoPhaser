//Insertar el nombre del jugador y su puntuacion en el juego

var button;
var background;
var array1 = [];
var array2 = [];
var constA;
var constB;
class Puntajes extends Phaser.Scene {
    constructor() {
        super({ key: "Puntajes", active: false });
    }
    preload() {
        this.load.image('regresar', 'assets/BotonRegresar.png');

    }

    create() {
        constA = 0;
        constB = 0;
        this.add.image(400, 300, 'fondo');
        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("lastname", "Smith");
            // Retrieve
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
        for (let i = 0; localStorage.getItem("Id" + i) != null; i++) {
            array1[i] = localStorage.getItem("Puntaje" + i);
            array2[i] = i;            
        }
        for (let i = 0; i < array1.length; i++) {
            for (let y = 0; y < array1.length-1; y++) {
                if(array1[y] < array1[y+1]){
                    constA=array1[y];
                    array1[y]=array1[y+1];
                    array1[y+1]=constA;
                    constB=array2[y];
                    array2[y]=array2[y+1];
                    array2[y+1]=constB;
                }
            }
        }
        for (let index = 0; index < array2.length && index < 5; index++) {
            scoreText = this.add.text(75, 150+(index*50), localStorage.getItem("Id" + array2[index])+" "+localStorage.getItem("Puntaje"+array2[index]), {fontFamily: 'font1', fontSize: '32px', fill: '#000' });
        }
        scoreText = this.add.text(50, 75, "Los mejores puntajes de el juego", { fontFamily: 'font1', fontSize: '40px', fill: '#000' });



        var back = this.add.image(400, 400, 'regresar');

        /* if (typeof(Storage) !== "undefined") {
             // Store            
             // Retrieve
             document.getElementById("result").innerHTML = localStorage.getItem("lastname");
           } else {
             document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
           }
           scoreText = this.add.text(16, 16, localStorage.getItem("Id1"), { fontSize: '32px', fill: '#000' });
         */
        back.setInteractive();
        back.once('pointerdown', function () {
            this.scene.start("Menu");
            //this.scene.switch("SceneD","SceneB");

        }, this);



    }



}