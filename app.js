'use strict';

let imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg',
    'water-can.jpg', 'wine-glass.jpg'];

let all = [];
let counter = 0;
let numberOfRound = 25;

const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let rightImage = document.getElementById('rightImage');
let centerImage = document.getElementById('centerImage');

function RandomImage(name, imgpath) {
    this.name = name;
    this.imgpath = 'img/' + imgpath;
    this.shown = 0;
    this.clike = 0;
    RandomImage.all.push(this);

}
// console.log(RandomImage.all);

RandomImage.all = [];

for (let i = 0; i < imgArray.length; i++) {
    new RandomImage(imgArray[i].split('.')[0], imgArray[i]);
}

function render() {
    let leftRandom = getRandomNumber(0, imgArray.length - 1);
    let rightRandom = getRandomNumber(0, imgArray.length - 1);
    let centerRandom = getRandomNumber(0, imgArray.length - 1);
    leftImage.src = RandomImage.all[leftRandom].imgpath;
    console.log(leftImage.src)
    rightImage.src = RandomImage.all[rightRandom].imgpath;
    centerRandom.src = RandomImage.all[centerRandom].imgpath;
    console.log(centerRandom.src)
    RandomImage.all[leftRandom].shown++;
    RandomImage.all[rightRandom].shown++;
    RandomImage.all[centerRandom].shown++;
}

render();



imageSection.addEventListener('click', clickHandler);
function clickHandler(e) {
    if ((e.target.id === 'leftImage' || e.target.id === 'rightImage') && counter < numberOfRound) {
        render();
        counter++;
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// console.log(getRandomNumber());
