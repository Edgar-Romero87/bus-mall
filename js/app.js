'use script';

var parentElement = document.getElementById('products');

var parentForm = document.getElementById('rounds');

var allProducts = [];

var clickingRounds = 25;


//Constructor Function
function OurProducts (src, alt, title ){
  this.filePath = src;
  this.alt = alt;
  this.title = title;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);

}

new OurProducts('images/bag.jpg','bag','Bag');
new OurProducts('images/banana.jpg','banana','Banana');
new OurProducts('images/bathroom.jpg','bathroom','Bathroom');
new OurProducts('images/boots.jpg','boots','Boots');
new OurProducts('images/breakfast.jpg','breakfast','Breakfast');
new OurProducts('images/bubblegum.jpg','bubblegum','Bubblegum');
new OurProducts('images/chair.jpg','chair','Chair');
new OurProducts('images/cthulhu.jpg','cthulhu','Cthulhu');
new OurProducts('images/dog-duck.jpg','dog-duck','Dog duck');
new OurProducts('images/dragon.jpg','dragon','Dragon');
new OurProducts('images/pen.jpg','pen','Pen');
new OurProducts('images/pet-sweep.jpg','pet-sweep','Pet sweep');
new OurProducts('images/scissors.jpg','scissors','Scissors');
new OurProducts('images/shark.jpg','shark','Shark');
new OurProducts('images/sweep.png','sweep','Sweep');
new OurProducts('images/tauntaun.jpg','tauntaun','Tauntaun');
new OurProducts('images/unicorn.jpg','unicorn','Unicorn');
new OurProducts('images/usb.gif','usb','Usb');
new OurProducts('images/water-can.jpg','water-can','Water can');
new OurProducts('images/wine-glass.jpg','wine-glass','Wine glass');

OurProducts.prototype.busMall = function(){
  var imageElement = document.createElement('img');

  imageElement.setAttribute('src', this.filePath);

  imageElement.setAttribute('alt', this.alt);

  imageElement.setAttribute('title', this.title);

  parentElement.appendChild(imageElement);
};

// HELPER function
function randomNumber(min=0, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//render 3 random images to the DOM from an array of images.
function getRandomProducts(){
  parentElement.textContent = '';

  //call my random number function to get a random index position. that is my random index position for my allProducts array.
  var firstRandomIndex = randomNumber(0, allProducts.length-1);
  var secondRandomIndex = randomNumber(0, allProducts.length-1);
  var thirdRandomIndex = randomNumber(0, allProducts.length-1);

  while(firstRandomIndex === secondRandomIndex){
  //get 2 more images
  //we will only brake out of this loop once the third random index is different than the first and second one random index.
    secondRandomIndex = randomNumber(0, allProducts.length-1);
  }
  while(secondRandomIndex === thirdRandomIndex || secondRandomIndex === firstRandomIndex){
    thirdRandomIndex = randomNumber(0, allProducts.length-1);
  }

//use that object instance to call the busMall function.
  allProducts[firstRandomIndex].busMall();
  allProducts[firstRandomIndex].views++;

  allProducts[secondRandomIndex].busMall();
  allProducts[secondRandomIndex].views++;

  allProducts[thirdRandomIndex].busMall();
  allProducts[thirdRandomIndex].views++;

}

getRandomProducts();

//function handleClick() {
//    //figure out what product was clicked on
//    //increment the vote on that product
//    //call the getRandomProducts function to generate new products to the page
// }
function dataChart(){
  var parentSelector = document.getElementById('chart');
  var listParent = document.createElement('ul');
  parentSelector.appendChild(listParent);
  for(var i=0; i< allProducts.length; i++){
    var listProducts = document.createElement('li');
    listProducts.textContent = `${allProducts[i].title} had ${allProducts[i].votes} votes and it showed ${allProducts[i].views} times.`;
    listParent.appendChild(listProducts);
  }
}


//Set an Event Listener
parent.addEventListener('click', function handler(){
  var productClickedOn = event.target.title;

  for(var i=0; i<allProducts.length; i++){
    if(productClickedOn === allProducts[i].title){
      allProducts[i].votes++;
    }
  }

  clickingRounds--;
  if(clickingRounds <= 0){
    dataChart();
    this.removeEventListener('click', handler);
  }
  getRandomProducts();
});


parentForm.addEventListener('submit', function(event){
  event.preventDefault();
  var rounds = Number(event.target.roundSelect.value);
  clickingRounds = rounds;
  // console.log(rounds);
});

