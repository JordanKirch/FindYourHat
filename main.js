const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
var xCord = 0;
var yCord = 0;
var gameRuning = true;

class Field {

    constructor(field){
        this.field = field
    }
    //Starts the game and is the main loop for the program
    play(){
        while(gameRuning){
            this.field.print();
        }

    }
    //Prints current game board
    print(){
        console.log(this.field.join("\n"))
    }

    startingLocation(){
        for (var i = 0; i < this.field.length; i++){
            for(var j = 0; j < this.field.length; j++){
                if(this.field[i][j] == pathCharacter){
                    xCord = j;
                    yCord = i;
                }
            }
        }
    }

    move(direction){
        //Moves Up by one
        if(direction == 'u' && yCord - 1 >= 0){
            yCord -= 1;
            if(this.field[yCord][xCord] == hole){
                this.lose();
            }

            this.field[yCord][xCord] = pathCharacter;
        }
        
        //Moves Down by one
        else if(direction == 'd' && yCord + 1 <= this.field.length){
            yCord += 1;
            if(this.field[yCord][xCord] == hole){
                this.lose();
            }
            this.field[yCord][xCord] = pathCharacter;
        }
        //Moves Right by one
        else if(direction == 'r' && (this.field[yCord][xCord + 1] == fieldCharacter || this.field[yCord][xCord + 1] == hole)){
            xCord += 1;
            if(this.field[yCord][xCord] == hole){
                this.lose();
            }
            this.field[yCord][xCord] = pathCharacter;
        }
        //Moves Left by one
        else if(direction == 'l' && (this.field[yCord][xCord - 1] == fieldCharacter || this.field[yCord][xCord - 1] == hole)){
            xCord -= 1;
            if(this.field[yCord][xCord] == hole){
                this.lose();
            }
            this.field[yCord][xCord] = pathCharacter;
        }
        //Invalid move 
        else{
            console.log("You can not move there.");
            // this.userInput();
        }

        this.print();
    }

    lose(){
        gameRuning = false
        console.log("You fell into a hole.");
    }

    checkWin(){

    }
    //Gets direction input from the user and then starts the move method in given direction
    userInput(){
        var direction = prompt("Which way? ");
        while (!(direction == 'u' || direction == 'd' || direction == 'l' || direction == 'r')){
            direction = prompt('Invaild input try again (u = up, d = down, l = left, r = right) ');
        }
        this.move(direction);
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);
myField.print();
myField.userInput();