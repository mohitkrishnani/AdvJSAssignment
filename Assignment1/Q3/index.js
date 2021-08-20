async function getData(){
    const fetch = require('node-fetch');
    const url = "http://api.nobelprize.org/v1/prize.json";
    const response = await fetch(url);
    let data = await response.json();
    return new Promise((resolve,reject) =>{
        if(response.status === 200){
            let ans = [];
            data.prizes.forEach((element) => {
                if (parseInt(element.year) >= 2000 && parseInt(element.year) <= 2019){
                    if(element.category.toLowerCase() === "chemistry"){
                        element.laureates.forEach(ele => {
                            ans.push(ele.firstname +" "+ele.surname);
                        });
                    }
                } 
            });
            resolve(ans);
        }
        else{
            reject("Some problems while fetchinng data");
        }
    });
}

getData()
    .then(res => console.log(res))
    .catch(err => console.log(err));