class Hashmap {
    constructor() {
        this._storage = [];
    }

    hashStr(str) {
        let finalHash = 0;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            finalHash += charCode;
        }
        return finalHash;
    }

    set(key, val) {
        let idx = this.hashStr(key);

        if (!this._storage[idx]) {
            this._storage[idx] = [];
        }

        this._storage[idx].push([key, val]);
    }

    get(key) {
        let idx = this.hashStr(key);

        if (!this._storage[idx]) {
            return undefined;
        }

        for (let keyVal of this._storage[idx]) {
            if (keyVal[0] === key) {
                return keyVal[1];
            }
        }
    }

    size(){
        return 6;
    }
}

var map = new Hashmap();
map.set(0, "Jab");
map.set(1, "Cross");
map.set(2, "Slip");
map.set(3, "Right Hook");
map.set(4, "Left Hook");
map.set(5, "Body");

function myFunction() {
    document.getElementById("combinations").innerHTML = "changed";

    let skill = document.getElementById("skill").value - 1;
    let minutes = document.getElementById("time").value - 4; // minus-ing time for warm-up

    let minutesPerExercise = 3;
    let breakTime = 1;
    let numCombinations = minutes/(minutesPerExercise + breakTime);

    if(isNaN(skill) || skill < 0 || skill > 6){
        alert("The skill must be a number selected from the list");
        return;
    }

    if(isNaN(minutes) || minutes < 5 || minutes > 200){
        alert("The time must be a number between 5 and 200 minutes");
        return;
    }

    let binaryList = getBinaryList(skill, map.size());
    let finalCombinations = generateRandom(binaryList, numCombinations);

    finalCombinations.forEach(findMapped);

    finalCombinations.sort((a, b) => a.length - b.length);

    finalCombinations.unshift("Jab (Warm Up)");

    document.getElementById("combinations").innerHTML = finalCombinations.join(" <br /> ").toString();

  }

function getBinaryList(skill, mapSize){

    let binaryList = [];

    for(let i = 0; i < Math.pow(2, mapSize); i++){
        let binary = (i).toString(2);

        if(binary.length < mapSize){
            let tempLength = binary.length;
            for(let j = 0; j < (mapSize - tempLength); j++)
                binary = "0" + binary;
        }

        if(binary.charAt(skill) == '1' && ((binary.charAt(1) == '1' && binary.charAt(3) != '1') || (binary.charAt(1) != '1' && binary.charAt(3) == '1')))
            binaryList.push(binary);
    }

    return binaryList;
}

function generateRandom(binaryList, numCombinations){
    let list = [];

    while(list.length < numCombinations){
        let randomPick = Math.floor(Math.random() * binaryList.length);

        if(!list.includes(binaryList[randomPick]))
            list.push(binaryList[randomPick]);
    }

    return list;
}

function findMapped(item, index, arr){
   let tempString = "";
    for(let i = 0; i < item.length; i++){
        if(item.charAt(i) == '1')
            tempString += (map.get(i) + ", ");
    }

    tempString = tempString.substring(0, tempString.length - 2);

    arr[index] = tempString;
}
