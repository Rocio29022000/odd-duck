"use strict"
console.log("Pick Me!")

//Global variables
const productContainer = document.querySelector("section");
const resultsButton = document.querySelector("button");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");


//Set values
let clicks = 0;
const maxClicksAllowed = 25;

//Set Product array
let allProducts = [];

//Random number generator
function randomNum(){
    return Math.floor(Math.random() * allProducts.length);
}

//Constructor function for the objects (images of the products)
function Product(name, src){
    this.name = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this)
}

//Function to render the products
function renderProducts(){
    let product1 = randomNum();
    let product2 = randomNum();
    let product3 = randomNum();

    //Avoid repetition
    while (product1 === product2 || product2 === product3){
        product2 = randomNum();
    }
    while (product1 === product3){
        product3 = randomNum();
    }

    //setting the attributes
    image1.src = allProducts[product1].src;
    image2.src = allProducts[product2].src;
    image3.src = allProducts[product3].src;
    image1.alt = allProducts[product1].name;
    image2.alt = allProducts[product2].name;
    image3.alt = allProducts[product3].name;
    allProducts[product1].views++;
    allProducts[product2].views++;
    allProducts[product3].views++;
}

//Function for the click event
function handleProductClick(event) {
    if (event.target === productContainer) {
      alert("Please click on an image");
    } else {
      clicks++;
      // console.log(clicks);
      let clickedProduct = event.target.alt;
      for (let i = 0; i < allProducts.length; i++) {
        if (clickedProduct === allProducts[i].name) {
          allProducts[i].clicks++;
          break;
        }
      }
      if (clicks === maxClicksAllowed) {
        productContainer.removeEventListener("click", handleProductClick);
        productContainer.className = "no-voting";
        resultsButton.addEventListener("click", renderChart);
        resultsButton.className = "clicks-allowed";
      } else {
        renderProducts();
      }
    }
  }

  function renderResults() {
    // console.log("Your results are in!");
    let ul = document.querySelector("ul");
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement("li");
      li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
      ul.appendChild(li);
    }
    
  }

const bag = new Product("bag", "img/bag.jpg");
const banana = new Product("banana", "img/banana.jpg");
const bathroom = new Product("bathroom", "img/bathroom.jpg");
const boots = new Product("boots", "img/boots.jpg");
const breakfast = new Product("breakfast", "img/breakfast.jpg");
const bubblegum = new Product("bubblegum", "img/bubblegum.jpg");
const chair = new Product("chair", "img/chair.jpg");
const cthulhu = new Product("cthulhu", "img/cthulhu.jpg");
const dogduck = new Product("dog-duck", "img/dog-duck.jpg");
const dragon = new Product("dragon", "img/dragon.jpg");
const pen = new Product("pen", "img/pen.jpg");
const petsweep = new Product("pet-sweep", "img/pet-sweep.jpg");
const scissors = new Product("scissors", "img/scissors.jpg");
const shark = new Product("shark", "img/shark.jpg");
const sweep = new Product("sweep", "img/sweep.png");
const tauntaun = new Product("tauntaun", "img/tauntaun.jpg");
const unicorn = new Product("unicorn", "img/unicorn.jpg");
const watercan = new Product("water-can", "img/water-can.jpg");
const wineglass = new Product("wine-glass", "img/wine-glass.jpg");

renderProducts();

productContainer.addEventListener("click", handleProductClick);

function renderChart(){
  
  const productNames = [];
  const productViews = [];
  const productClicks = [];

  for (let i=0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  
  const data = {
    labels: productNames,
    datasets: [
      {
      label: "Views",
      data: productViews,
      backgroundColor: ["#42032C"],
      borderColor: ["#D36B00"],
      bandWidth: 1
      },
      {
        label: "Clicks",
        data: productClicks,
        backgroundColor: ["#D36B00"],
        borderColor: ["#42032C"],
        bandWidth: 1
      }
    ] 
  }

  const config = {
    type: "bar",
    data: data,
  }
  
  const productChart = document.getElementById("chart");
  const myChart = new Chart(productChart, config)
}
