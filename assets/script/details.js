let id=new URLSearchParams (window.location.search).get("id");
let botom1=document.querySelector(".botom1");
async function getALLCard(){
    let res= await axios(`http://localhost:3000/data/${id}`);
    
    let element=await res.data;

    botom1.innerHTML=
    `

    <div class="card">
    <a href="./details/details.html?id=${element.id}"><h2>${element.name}</h2></a>
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
    console.log(element);
}

getALLCard()