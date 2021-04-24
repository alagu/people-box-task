function fetchFolders() {
    return fetch('https://gist.githubusercontent.com/alagu/bfee7d87e0e03cd9bc33693af61281d9/raw/b100b548563ffcb1b554432c3ffdf855f1651547/folder-data.json')        
    .then(res => res.json())
    .then(res => {                
        if(res.error) {
            throw(res.error);
        }            
        return res;
    })
    .catch(error => {
        console.log("Error");
    }) 
}

export default fetchFolders;