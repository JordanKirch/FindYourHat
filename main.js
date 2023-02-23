const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    //Creates the field
    constructor(field){
        this.field = field;
        this.yCord = 0;
        this.xCord = 0;
        this.gameRuning = true;
        this.startingLocation();
    }

    //Starts the game and is the main loop for the program
    play(){
        while(this.gameRuning){
            this.print();
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
                    this.xCord = j;
                    this.yCord = i;
                }
            }
        }
    }

    //Takes given direction and moves the '*' in that direction.
    move(direction){
        //Moves Up by one
        if(direction == 'u' && this.yCord - 1 >= 0){
            this.yCord -= 1;
            this.checkLost();
            this.checkWin();
            this.field[this.yCord][this.xCord] = pathCharacter;
        }
        
        //Moves Down by one
        else if(direction == 'd' && this.yCord + 1 <= this.field.length){
            this.yCord += 1;
            this.checkLost();
            this.checkWin();
            this.field[this.yCord][this.xCord] = pathCharacter;
        }
        //Moves Right by one
        else if(direction == 'r' && this.xCord + 1 <= this.field.length){
            this.xCord += 1;
            this.checkLost();
            this.checkWin();
            this.field[this.yCord][this.xCord] = pathCharacter;
        }
        //Moves Left by one
        else if(direction == 'l' && this.xCord - 1 >= 0){
            this.xCord -= 1;
            this.checkLost();
            this.checkWin();
            this.field[this.yCord][this.xCord] = pathCharacter;
        }
        //Invalid move 
        else{
            console.log("You can not move there.");
        }
    }

    //Checks if the user landed in a hole triggering a lost game
    checkLost(){
        if(this.field[this.yCord][this.xCord] == hole){
            this.gameRuning = false;
            console.log("You fell into a hole. You lose.");
        }
        
    }

    //Checks if the user has reached the hat triggering a won game
    checkWin(){
        if(this.field[this.yCord][this.xCord] == hat){
            this.gameRuning = false;
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

    //Generates the field given the height, width, and the percentage of holes
    static generateField(height, width, percent){
        let field = [];
        var hatPlaced = false;
        var pathCharPlaced = false;
        for(var i = 0; i < height; i++){
            field.push([]);
            for(var j = 0; j < width; j++){
                //Place '*'
                if(pathCharPlaced == false && Math.floor(Math.random(4) * 5) == 0){
                    pathCharPlaced = true;
                    field[i][j] = pathCharacter;
                }
                //place '^'
                else if(hatPlaced == false && Math.floor(Math.random(4) * 5) == 0){
                    hatPlaced = true;
                    field[i][j] = hat;
                }
                //place 'O' given percentage
                else if (Math.random() < percent/100){
                    field[i][j] = hole;
                }
                else{
                    field[i][j] = fieldCharacter;
                }
            }
        }
        return field;
    }
}

//Creates field and starts game
const genField = Field.generateField(5,5,30);
const myField = new Field(genField);
myField.play();