
// user inputs

const inputText = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// variables for editing

const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");

const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");

const creatureType = document.getElementById("types");

const specialName = document.getElementById("special-name");
const specialDesc = document.getElementById("special-desc");

const baseStatus = document.querySelector(".stats");


//functions 




const findCreature = (input)=>{

    if(input){

    fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`)
    .then(response => response.json())
    .then(data =>{

        creatureName.innerText = `${data.name.toUpperCase()}`;
        creatureID.innerText = `#${data.id}`;

        creatureWeight.innerText = `Weight: ${data.weight}`;
        creatureHeight.innerText = `Height: ${data.height}`;

        if(data.types){
            console.log("types found.");
            creatureType.innerHTML = "";
            data.types.forEach(element => {
            creatureType.innerHTML += `<span class="types">${element.name.toUpperCase()}</span>\n`;
            });
        }else{
            console.log("no types found.");
        }

        specialName.innerText = data.special.name;
        specialDesc.innerText = data.special.description;

        baseStatus.innerHTML = data.stats.map(stat=> `<p id="${stat.name.replace(/\s+/g, '-').toLowerCase()}">${stat.base_stat}</p>`).join('');
   
    })  
    .catch((e)=>{
        alert("Creature not found");
    })
    .finally(()=>{
        inputText.value = "";
    });

    }else{
        alert("please input.");
        return;
    }

    
    
}


//listeners


searchBtn.addEventListener('click',()=>{
    console.log("hey");
    findCreature(inputText.value);
});