class Queen{
    constructor(x_pos,y_pos){
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    canAttack(queenObj){
        if(this.x_pos === queenObj.x_pos || this.y_pos === queenObj.y_pos || Math.abs(this.x_pos - queenObj.x_pos) === Math.abs(this.y_pos - queenObj.y_pos)){
            return "Yes the queen can attack,Go for it";
        }
        else{
            return "No it cannot, try something else";
        }
    }
}
let queen1 = new Queen(2,4)
let queen2 = new Queen(4,6)
console.log(queen1.canAttack(queen2));