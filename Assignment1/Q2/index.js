async function getAPI(url){
    const res = await $.ajax({
        url: url,
        type: 'get'
    });
    return res
}

async function getDataCall(){
    const topic  = document.getElementById('topic').value;
    const url = "https://api.github.com/search/repositories?q="+topic
    const result = await getAPI(url);
    const res_array = result.items;
    var ans = [];
    res_array.forEach(async element => {        
        const ownerRes = await getAPI(element.owner.url);
        const branch_url = element.branches_url.split('{')[0];
        const branches_url = await getAPI(branch_url);
        let licenseName ;
        if (element.license === null){
            licenseName = "N.A";
        }
        else{
            licenseName = element.license.name;
        }
        const obj = {
            "name": element.name,
      	    "full_name": element.full_name,
      	    "private": element.private,
	        "owner":{
  		        "login": element.owner.login,
		        "name": ownerRes.name,
                "followersCount" : ownerRes.followers,
                "followingCount": ownerRes.following
            },
            "licenseName":licenseName,
            "score":element.score,
            "numberOfBranch":branches_url.length
        }
        ans.push(obj);
    });
    return new Promise((resolve,reject) => {
        resolve(ans)
    });   
}

async function getData(){
    await getDataCall().then((ans) => console.log(ans)).catch((err) => console.log("There was an error"+err));
}