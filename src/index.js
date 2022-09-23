let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addToyForm = document.getElementsByClassName('add-toy-form')[0]
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addToyForm.addEventListener('submit', onSubmit)
  function onSubmit(event) {
event.preventDefault()
const fdata = new FormData(addToyForm)
const params = {
  name: fdata.get('name'),
  image: fdata.get('image'), 
  likes: 0
}
createToy(params)
  }
  function getToys() {
    fetch('http://localhost:3000/toys').then(res => res.json())
      .then(toydata => {
        toyCollection.innerHTML = ''

        toydata.forEach(toy => {
          toyCollection.innerHTML += `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button onclick = 'updateToy(${toy.id}, ${toy.likes +1})' class="like-btn" id="${toy.id}">Like ❤️</button>
      </div>
        `
        });
      })
  }
  function createToy(params) {

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify (params)
    }) 
    .then(res => res.json())
    .then(newToyData => {
      console.log(newToyData)
      getToys()
    })
  }
  function updateToy(id, likes) {
    fetch('http://localhost:3000/toys/'+id, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify ({likes})
    }) 
    .then(res => res.json())
    .then(newToyData => {
      console.log(newToyData)
      getToys()
    })
    
  }
  getToys()
  window.updateToy = updateToy
});
