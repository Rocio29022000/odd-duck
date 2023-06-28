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
let previousProducts = []
let productNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "water-can", "wine-glass"]

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
    let currentProducts = [product1, product2, product3]
    
    console.log("Previous products were: " + previousProducts)
    console.log("Current products are: " + currentProducts)

    //Avoid repetition
    while (currentProducts[0] === currentProducts[1] || currentProducts[1] === currentProducts[2]){
      currentProducts[1] = randomNum();
    }
    while (currentProducts[0] === currentProducts[2]){
      currentProducts[2] = randomNum();
    }
    console.log("Current products are: " + currentProducts)
    const equal = currentProducts.filter(currentProducts => previousProducts.includes(currentProducts));
    console.log("The repeated number is: " + equal)
    let index = currentProducts.indexOf(equal[0])
    console.log("The index of that value is: " + index)
    if (index != -1){
      while(equal === currentProducts[0] || equal === currentProducts[1] || equal === currentProducts[2]);{
        currentProducts.splice(index, 1, randomNum())  
        }
    }
    while (currentProducts[0] === currentProducts[1] || currentProducts[1] === currentProducts[2]){
      currentProducts[1] = randomNum();
    }
    while (currentProducts[0] === currentProducts[2]){
      currentProducts[2] = randomNum();
    }
    console.log("Current products are: " + currentProducts)


    console.log("The new current products are: " + currentProducts)

    //setting the attributes
    image1.src = allProducts[currentProducts[0]].src;
    image2.src = allProducts[currentProducts[1]].src;
    image3.src = allProducts[currentProducts[2]].src;
    image1.alt = allProducts[currentProducts[0]].name;
    image2.alt = allProducts[currentProducts[1]].name;
    image3.alt = allProducts[currentProducts[2]].name;
    allProducts[currentProducts[0]].views++;
    allProducts[currentProducts[1]].views++;
    allProducts[currentProducts[2]].views++;

    //add products to the previous product variable
    previousProducts = [currentProducts[0], currentProducts[1], currentProducts[2]]
    console.log(previousProducts)
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


for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `img/${productNames[i]}.jpg`);
}

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
      backgroundColor: ["lightblue"],
      borderColor: ["black"],
      bandWidth: 1
      },
      {
        label: "Clicks",
        data: productClicks,
        backgroundColor: ["blue"],
        borderColor: ["black"],
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
