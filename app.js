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
    this.click = 0;
    RandomImage.all.push(this);

}
// console.log(RandomImage.all);

RandomImage.all = [];


// createResult();
// craeteList();
// createChart();


for (let i = 0; i < imgArray.length; i++) {
    new RandomImage(imgArray[i].split('.')[0], imgArray[i]);
}

function render() {
    let leftRandom = getRandomNumber(0, imgArray.length - 1);
    let rightRandom = getRandomNumber(0, imgArray.length - 1);
    let centerRandom = getRandomNumber(0, imgArray.length - 1);
    leftImage.src = RandomImage.all[leftRandom].imgpath;
    // console.log(leftImage.src)
    rightImage.src = RandomImage.all[rightRandom].imgpath;
    centerImage.src = RandomImage.all[centerRandom].imgpath;
    // console.log(centerRandom);
    RandomImage.all[leftRandom].shown++;
    RandomImage.all[rightRandom].shown++;
    RandomImage.all[centerRandom].shown++;


    localStorage.data = JSON.stringify(RandomImage.all);
}

render();








imageSection.addEventListener('click', clickHandler);
function clickHandler(e) {
    if ((e.target.id === 'leftImage' || e.target.id === 'rightImage') && counter < numberOfRound) {
        render();
        counter++;
    }
    else {
        imageSection.removeEventListener('click', clickHandler);
        createResult();
        creatChart();
        getData();


    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



function createResult() {
    let resultElement = document.getElementById('result');
    let buttonElement = document.createElement('button');
    resultElement.appendChild(buttonElement);
    buttonElement.textContent = 'show result';
    buttonElement.onclick = craeteList;

    // console.log(buttonElement.onclick);

    function craeteList() {
        let listElement = document.getElementById('result')
        let ulElements = document.createElement('ul');
        listElement.appendChild(ulElements);

        for (let i = 0; i < imgArray.length; i++) {
            let liElement = document.createElement('li');
            liElement.textContent = `${RandomImage.all[i].name} had ${RandomImage.all[i].click} votes, and was seen ${RandomImage.all[i].shown} times.`;
            ulElements.appendChild(liElement);
        }


    }
}

function creatChart() {
    let nameArray = [];
    let shownArray = [];
    let clickArray = [];

    for (let i = 0; i < imgArray.length; i++) {
        nameArray.push(RandomImage.all[i].name);
        shownArray.push(RandomImage.all[i].shown);
        clickArray.push(RandomImage.all[i].click);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArray,
            datasets: [{
                label: '# of shown',
                data: shownArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: clickArray,
                backgroundColor: [
                    'green',

                ],
                borderColor: [
                    'green',

                ],
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

function getData() {
    if (localStorage.data) {
        let data = JSON.parse(localStorage.data);
        for (let i = 0; i < data.length; i++) {
            new Rest(data[i].name, data[i].imgpath, data[i].shown);
        }
    } else {
        for (let i = 0; i < imgArray.length; i++) {
            new Rest(imgArray[i].split('.')[0], imgArray[i]);
        }
    }
}