//Function to check if the array "output" already has a key named "X" 
//using this function for both actors array and genre array by passing true or false to isActor
function checkIfPresent(output, X, isActor){
    var set = -1
    if(output.length == 0){ return set }

    output.forEach((element,index,output) => {
        if(isActor){
            if(element.Name === X){
                set = index
                return set
            }
        }    
        else{
            if(element.Type === X){
                set = index
                return set
            }
        }
    });
    return set
}

async function getData(){
    const fetch = require('node-fetch');
    
    const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";

    const response = await fetch(url);
    const data = await response.json();

    var actorOutput = []
    var genreOutput = []

    //Getting actors array
    if (response.status == 200){
        for(let i =0;i<data.length;i++){
            if (data[i].cast.length!=0){
                for(let j =0;j<data[i].cast.length;j++){
                    var ind = checkIfPresent(actorOutput,data[i].cast[j],true);
                    if(ind == -1){
                        let obj = {Name : data[i].cast[j],
                            Movies: [data[i].title]
                        };
                        actorOutput.push(obj);
                    }else{
                        actorOutput[ind].Movies.push(data[i].title);
                    }

                }
                
                
            }
        }

        //Getting Genres array
        for(let i =0;i<data.length;i++){
            if (data[i].genres.length!=0){
                for(let j =0;j<data[i].genres.length;j++){
                    var ind = checkIfPresent(genreOutput,data[i].genres[j],false);
                    if(ind == -1){
                        let obj = {Type : data[i].genres[j],
                            Movies: [data[i].title]
                        };
                        genreOutput.push(obj);
                    }else{
                        genreOutput[ind].Movies.push(data[i].title);
                    }

                }
            }
        }

    }
    else{
        console.log("Some error while fetching data");
    }

    const result = {
        actors : actorOutput,
        Genres : genreOutput
    };
    
    const fs = require('fs');
    fs.writeFile('output.json',JSON.stringify(result),err =>{
        if (err) throw err;
        console.log("written to file");
        console.log("For detailed output take a look at output.json")
    });
    console.log(result);
}

getData()