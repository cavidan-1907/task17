let favorites = 'http://localhost:3000/favorites/'

let bottom=document.querySelector(".bottom")

function showData(page){
fetch(favorites)
.then(response=>response.json())
.then(data=>{
  console.log(data);
  data.forEach(element=>{
    bottom.innerHTML+=
    `
    <div class="card">
    <a href="./details.html?id=${element.id}"><h2>${element.name}</h2></a>
    <div class="image">
        <img src="${element.image}">
    </div>
    <p>${element.description}.</p>
    <div class="edit">
        <i onclick="deleteCard(${element.id})" class="bi bi-trash-fill"></i>
        <i onclick="editCard(${element.id})" class="bi bi-pen pen "></i>
        <i onclick="Favorite(${element.id})" class="bi bi-heart"></i>
        </div>
        </div>
    `

  })
})
}
showData();
const nav = document.querySelector('nav');
const menu = document.querySelector(".bi-list");

const navMenu = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  if (navMenu.style.top === "90px") {
    navMenu.style.top = "-500px";
  } else {
    navMenu.style.top = "90px";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991) {
    navMenu.style.top = "-500px";
  }
})

function deleteCard(id) {
    axios.delete(`http://localhost:3000/favorites/${id}`);
    window.location.reload()
  }
  






