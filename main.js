const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
var xCord = 0;
var yCord = 0;
var gameRuning = true;

class Field {
    //Creates the field
    constructor(field){
        this.field = field
    }

    //Starts the game and is the main loop for the program
    play(){
        while(gameRuning){
            this.print();
            this.startingLocation();
            this.userInput();

        }

    }

    //Prints current game board
    print(){
        console.log(this.field.join("\n"))
    }

    //Finds the starting location of the '*' and records it's coordinates
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

    //Takes given direction and moves the '*' in that direction.
    move(direction){
        //Moves Up by one
        if(direction == 'u' && yCord - 1 >= 0){
            yCord -= 1;
            this.checkLost();
            this.checkWin();
            this.field[yCord][xCord] = pathCharacter;
        }
        
        //Moves Down by one
        else if(direction == 'd' && yCord + 1 <= this.field.length){
            yCord += 1;
            this.checkLost();
            this.checkWin();
            this.field[yCord][xCord] = pathCharacter;
        }
        //Moves Right by one
        else if(direction == 'r' && xCord + 1 <= this.field.length){
            xCord += 1;
            this.checkLost();
            this.checkWin();
            this.field[yCord][xCord] = pathCharacter;
        }
        //Moves Left by one
        else if(direction == 'l' && xCord - 1 >= 0){
            xCord -= 1;
            this.checkLost();
            this.checkWin();
            this.field[yCord][xCord] = pathCharacter;
        }
        //Invalid move 
        else{
            console.log("You can not move there.");
        }
    }
    //Checks if the user landed in a hole triggering a lost game
    checkLost(){
        if(this.field[yCord][xCord] == hole){
            gameRuning = false;
            console.log("You fell into a hole. You lose.");
        }
        
    }
    //Checks if the user has reached the hat triggering a won game
    checkWin(){
        if(this.field[yCord][xCord] == hat){
            gameRuning = false;
            console.log("You Reached the hat. You WIN!!!");
        }
    }
    //Gets direction input from the user and then starts the move method in given direction
    userInput(){
        var direction = prompt("Which way? ");
        while (!(direction == 'u' || direction == 'd' || direction == 'l' || direction == 'r')){
            direction = prompt('Invaild input try again (u = up, d = down, l = left, r = right) ');
        }
        this.move(direction);
    }

    generateField(height, width, percent){
        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                var hatPlaced = false;
                var pathCharPlaced = false;
                
                //Place '*'
                if(pathCharPlaced == false && Math.floor(Math.random(4) * 5) == 0){
                    pathCharPlaced = true;
                    this.field[i][j] = pathCharacter;
                }
                //place '^'
                else if(hatPlaced == false && Math.floor(Math.random(4) * 5) == 0){
                    hatPlaced = true;
                    this.field[i][j] = hat;
                }
                //place 'O' given percentage
                else if (Math.random() < percent/100){
                    this.field[i][j] = hole;
                }
                else{
                    this.field[i][j] = fieldCharacter;
                }
            }
        }
    }
}
//Creates field and starts game
//Todo update the array size
const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);
myField.generateField(2,2, 30);
myField.play();