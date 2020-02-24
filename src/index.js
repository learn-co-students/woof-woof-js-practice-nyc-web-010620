let dogs = []
const dogBar = document.getElementById("dog-bar")

function renderDogs(response){
    const dogBar = document.getElementById("dog-bar")
    const spanHTMLArr = response.map(dog => {
        return `<span id=${dog.id}> ${dog.name} </span>`
    })
    dogBar.innerHTML = spanHTMLArr.join("")
}

function goodDogsRender(response){
    const dogBar = document.getElementById("dog-bar")
    const spanHTMLArr = response.map(dog => {
        if(dog.isGoodDog === true){
          return `<span id=${dog.id}> ${dog.name} </span>`
        }
    })
    dogBar.innerHTML = spanHTMLArr.join("")
}

function badDogsRender(response){
    const dogBar = document.getElementById("dog-bar")
    const spanHTMLArr = response.map(dog => {
        if(dog.isGoodDog === false){
          return `<span id=${dog.id}> ${dog.name} </span>`
        }
    })
    dogBar.innerHTML = spanHTMLArr.join("")
}


document.addEventListener('DOMContentLoaded', (event) => {
    

    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(response => {
        console.log(response)
        dogs = response
        renderDogs(response)
    })

    document.addEventListener("click", function(event){
        if(event.target.tagName === "SPAN"){
            const dogInfoDiv = document.getElementById("dog-info")
            const foundDog = dogs.find(dog => dog.id === parseInt(event.target.id))
            const dogStatus = foundDog.isGoodDog === true ? "Good Dog!" : "Bad Dog!"
            dogInfoDiv.innerHTML = 
            `<img src=${foundDog.image}> <h2>${foundDog.name}</h2> <button id =${foundDog.id}> ${dogStatus} </button>`            
        } else if(event.target.innerText === "Good Dog!") {
            const foundDog = dogs.find(dog => dog.id === parseInt(event.target.id))
            event.target.innerText = "Bad Dog!"
            const data = {
                isGoodDog: false
            }
                fetch(`http://localhost:3000/pups/${foundDog.id}`, {
                    method: "PATCH", 
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(data)
            })
        } else if(event.target.innerText === "Bad Dog!"){
            const foundDog = dogs.find(dog => dog.id === parseInt(event.target.id))
            event.target.innerText = "Good Dog!"
            const data = {
                isGoodDog: true
            }
            console.log(foundDog)
                fetch(`http://localhost:3000/pups/${foundDog.id}`, {
                    method: "PATCH", 
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(data)
            })
        } else if(event.target.id = "good-dog-filter"){
            if(event.target.innerText === "Filter good dogs: OFF"){
                event.target.innerText = "Filter good dogs: ON"
                fetch("http://localhost:3000/pups")
                .then(response => response.json())
                .then(response => {
                    goodDogsRender(response)
                })
            } else if(event.target.innerText === "Filter good dogs: ON"){
                event.target.innerText = "Filter good dogs: OFF"
                fetch("http://localhost:3000/pups")
                .then(response => response.json())
                .then(response => {
                    badDogsRender(response)
                })
            }
        }
    })
});