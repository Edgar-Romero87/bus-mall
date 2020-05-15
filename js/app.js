/* eslint-disable indent */
'use script';

var uniqueIndexArray = [];
var allProducts = [];
var parentElement = document.getElementById('products');
var listParent = document.getElementById('lists');
var totalVotes = 0;
var names = [];
var votes = [];
var views = [];
var imagesFromLocalJString = [];

//Constructor Function
function OurProducts (url, alt, title){
  this.filePath = url;
  this.alt = alt;
  this.title = title;
  this.votes = votes;
  this.views = views;
  allProducts.push(this);

}




OurProducts.prototype.busMall = function(){

  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', this.filePath);

  imageElement.setAttribute('alt', this.alt);

  imageElement.setAttribute('title', this.title);

  parentElement.appendChild(imageElement);
  //   var imageElement = document.createElement('img');
  //   imageElement.src = this.filePath;

  //   imageElement.alt = this.alt;

  //   imageElement.title = this.title;

  //   parentElement.appendChild(imageElement);
};
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

//render 3 random images to the DOM from an array of images.
function getRandomIndex(){

  var index = getRandomNumber(allProducts.length);

  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allProducts.length);
  }
  uniqueIndexArray.push(index);

  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }
  // select a random image from that array to render
    // helper function to generage a random number between 0 and the length of the array
    // render the object instance at that index to the DOM

  // make sure that the images are uniqe (to each other and previous images)
    // -- come back to this in a minute
  return index;
}

// HELPER function
function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allProducts[index].busMall();
  allProducts[index].views++;
}

function handleClick(event){
  //first, empty everything out
  parentElement.textContent = '';

  //figure out what was clicked
  var titleOfWhatWasClicked = event.target.title;

  //loop through all of my object instance to compare titles so that I can find the one that was clicked on
  for(var i=0; i<allProducts.length; i++){
    if(titleOfWhatWasClicked === allProducts[i].title){

      allProducts[i].votes++;
      totalVotes++;

      //Save our allproducts arra into LOCAL STORAGE
      var stringifiedallProductsArray = JSON.stringify(allProducts);
      localStorage.setItem('items', stringifiedallProductsArray);

      if(totalVotes === 25){
        //turn off event listener
        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }
  displayImage();
  displayImage();
  displayImage();
  //listen for a click and render new images when we hear it
  //need to keep track of views and votes
}
displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', handleClick);
//only allow 25 votes
//show results at the end

OurProducts.prototype.appendList = function(){
  for(var i=0;i < allProducts.length; i ++){
    var listElement = document.createElement('li');
    listElement.textContent = `${allProducts[i].title} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times.`;
    listParent.appendChild(listElement);
  }
  if(localStorage.getItem('imageLocal') === null){
    console.log(allProducts);
    var stringImages = JSON.stringify(allProducts);
    localStorage.setItem('imageLocal', stringImages);
  } else {
    var imagesFromLocal = localStorage.getItem('imageLocal');
    var stringArrayLocal = JSON.parse(imagesFromLocal);
    imagesFromLocalJString = stringArrayLocal;
    addViewsAndVotesLocal();
  }
};

function addViewsAndVotesLocal(){
  for (var i=0; i< allProducts.length; i++){
    imagesFromLocalJString[i].views += allProducts[i].views;
    imagesFromLocalJString[i].votes += allProducts[i].votes;
  }
  var updatedCount = JSON.stringify(imagesFromLocalJString);
  localStorage.setItem('imageLocal', updatedCount);
}

//loop over all of my items and make an array of just the names of items
function makeNamesArray(){
  for(var i=0; i<allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }

  generateChart();
}


function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
