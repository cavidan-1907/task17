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


let data = 'http://localhost:3000/data/'
let favorites = 'http://localhost:3000/favorites/'

let bottom=document.querySelector(".bottom")

let page=1;

let loadBtn=document.querySelector(".load")

function showData(){
fetch(`${data}?_page=${page}&_limit=3`)
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
loadBtn.addEventListener("click", () => {
  page++;
  showData()
})


function deleteCard(id) {
  axios.delete(`http://localhost:3000/data/${id}`);
  axios.delete(`http://localhost:3000/favorites/${id}`);
  window.location.reload()
}

function Favorite(id) {

  if (event.target.classList.contains('bi-heart')) {
    event.target.classList.remove('bi-heart')
    event.target.classList.add('bi-heart-fill')

    axios.get(`http://localhost:3000/data/${id}`)
      .then(res => {
        console.log(res.data);
        return res.data
      })
      .then(res => {
        axios.get(`http://localhost:3000/favorites`)
          .then(response => {
            let iD = response.data.find(f => f.id === response.id);
            if (!iD) {
              axios.post(`http://localhost:3000/favorites`, res)
              console.log(event.target);
            }
            else {
              axios.delete(`http://localhost:3000/favorites/${iD.id}`)
            }
          })
      })
  }
  else {
    event.preventDefault();
    event.target.classList.remove('bi-heart-fill')
    event.target.classList.add('bi-heart')
    axios.delete(`http://localhost:3000/favoourites/${id}`)
  }
}


let file = document.querySelector("#file");
let form = document.querySelector(".form");
let img2 = document.querySelector("#img2");
let desc1 = document.querySelector("#desc");
let name1 = document.querySelector("#name");
let editB = document.querySelector(".editB");
let pen = document.querySelector(".pen");
let closeB = document.querySelector(".bi-x");

file.addEventListener("change", () => {
  let src = file.files[0]
  let reader = new FileReader();
  reader.readAsDataURL(src);
  reader.onload = function (e) {
    img2.src = e.target.result
  }
})


closeB.addEventListener("click", () => {
  editB.style.display = "none";
})


function editCard(id) {
  editB.style.display = "block"
  axios.get(`http://localhost:3000/data/${id}`).then(res => {
    name1.value = res.data.name;
    desc1.value = res.data.description;
    img2.src = res.data.image;
    file.value = res.data.image
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.get(`http://localhost:3000/data/${id}`).then(res => {
      name1.value = res.data.name;
      desc1.value = res.data.description;
      img2.src = res.data.image;

    })
    let src2 = file.files[0];
    let reader2 = new FileReader();
    reader2.onload = (e) => {
      let obj = {
        image: e.target.result,

        description: desc1.value

      }
      axios.patch(`http://localhost:3000/data/${id}`, obj).then(res = console.log(res.data))
    }
    reader2.readAsDataURL(src2)
  });
}



