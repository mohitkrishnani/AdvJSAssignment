let json = require('./battles.json');

var attacker_king = []
var defender_king = []
var region = []
var name = []
var attacker_outcome = []
var battle_type = []
var defender_size = []

json.forEach((ele) =>{
    attacker_king.push(ele.attacker_king);
    defender_king.push(ele.defender_king);
    region.push(ele.region);
    name.push(ele.name);
    attacker_outcome.push(ele.attacker_outcome);
    battle_type.push(ele.battle_type);
    defender_size.push(ele.defender_size);
})

function getFrequent(arr){
    var duplicates = {}
    var max = ''
    var maxi = 0;
    arr.forEach((el) => {
        duplicates[el] = duplicates[el] + 1 || 1;
        if (maxi < duplicates[el] ){
            max = el;
            maxi = duplicates[el]
        }
    });
    if (maxi == 1)
        return "All names occur only once";
    else
        return max;
}

var win=0;
var loss=0;

attacker_outcome.forEach((el) => {
    if (el === "win")
        win++;
    else if(el == "loss")
        loss++;
});


const unique_battle_types = battle_type.filter((el, i, arr) => {
    if (el!="")
        return arr.indexOf(el) === i;
});

const min = defender_size.filter((el) => {
    return el!=null;
}).reduce((a,b) => {
    return (a<b ? a:b);
})

const max = defender_size.reduce((a,b) => {
    return (a>b ? a:b);
})

const avg = defender_size.reduce((sum,val) => {
    return sum+val;
})/defender_size.length;

const result = {
    'most_active':{
        'attacker_king': getFrequent(attacker_king),
        'defender_king': getFrequent(defender_king),
        'region': getFrequent(region),
        'name': getFrequent(name)
    },
    'attacker_outcome':{
        'win':win, // total win
        'loss':loss // total loss
    },
    'battle_type':unique_battle_types, // unique battle types
    'defender_size':{
        'average':avg,
        'min':min,
        'max':max    
    }
}
console.log(result);