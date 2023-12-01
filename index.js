const $ALPHABET = document.querySelector('.alphabet');
const $TARGET_WORD = document.querySelector('.word__target');

const DICTIONARY = ["АПЕЛЬСИН", "ЯБЛОКО", "ГРУША",'КАНТ', 'ХРОНИКА', 'ЗАЛ', 'ГАЛЕРА', 'БАЛЛ', 'ВЕС', 'КАФЕЛЬ', 'ЗНАК', 'ФИЛЬТР', 'БАШНЯ', 'КОНДИТЕР', 'ОМАР', 'ЧАН', 'ПЛАМЯ', 
'БАНК', 'ТЕТЕРЕВ','МУЖ', 'КАМБАЛА', 'ГРУЗ', 'КИНО', 'ЛАВАШ', 'КАЛАЧ', 'ГЕОЛОГ', 'БАЛЬЗАМ', 'БРЕВНО', 'ЖЕРДЬ', 'БОРЕЦ', 'САМОВАР', 'КАРАБИН', 'ПОДЛОКОТНИК', 'БАРАК', 'МОТОР', 
'ШАРЖ', 'СУСТАВ', 'АМФИТЕАТР', 'СКВОРЕЧНИК', 'ПОДЛОДКА', 'ЗАТЫЧКА', 'РЕСНИЦА', 'СПИЧКА', 'КАБАН', 'МУФТА', 'СИНОПТИК', 'ХАРАКТЕР', 'МАФИОЗИ', 'ФУНДАМЕНТ', 'БУМАЖНИК', 'БИБЛИОФИЛ', 
'ДРОЖЖИ', 'КАЗИНО', 'КОНЕЧНОСТЬ', 'ПРОБОР', 'ДУСТ', 'КОМБИНАЦИЯ', 'МЕШКОВИНА', 'ПРОЦЕССОР', 'КРЫШКА', 'СФИНКС', 'ПАССАТИЖИ', 'ФУНТ', 'КРУЖЕВО', 'АГИТАТОР', 'ФОРМУЛЯР', 'ПРОКОЛ', 
'АБЗАЦ', 'КАРАВАН', 'ЛЕДЕНЕЦ', 'КАШПО', 'БАРКАС', 'КАРДАН', 'ВРАЩЕНИЕ', 'ЗАЛИВНОЕ', 'МЕТРДОТЕЛЬ', 'КЛАВИАТУРА', 'РАДИАТОР', 'СЕГМЕНТ', 'ОБЕЩАНИЕ', 'МАГНИТОФОН', 'КОРДЕБАЛЕТ', 
'ЗАВАРУШКА'];

let arrayOfIdx = [];

const canvas = document.getElementById('hangman');

const context = canvas.getContext("2d");

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

Draw = (part) => {
   switch (part) {
      case 'gallows' :
        context.strokeStyle = '#444';
        context.lineWidth = 10; 
        context.beginPath();
        context.moveTo(175, 225);
        context.lineTo(5, 225);
        context.moveTo(40, 225);
        context.lineTo(25, 5);
        context.lineTo(100, 5);
        context.lineTo(100, 25);
        context.stroke();
        break;

      case 'head':
        context.lineWidth = 5;
        context.beginPath();
        context.arc(100, 50, 25, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
        break;
      
      case 'body':
        context.beginPath();
        context.moveTo(100, 75);
        context.lineTo(100, 140);
        context.stroke();
        break;

      case 'rightHarm':
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(60, 100);
        context.stroke();
        break;

      case 'leftHarm':
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(140, 100);
        context.stroke();
        break;

      case 'rightLeg':
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(80, 190);
        context.stroke();
        break;

      case 'rightFoot':
         context.beginPath();
         context.moveTo(82, 190);
         context.lineTo(70, 185);
         context.stroke();
      break;

      case 'leftLeg':
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(125, 190);
        context.stroke();
      break;

      case 'leftFoot':
         context.beginPath();
         context.moveTo(122, 190);
         context.lineTo(135, 185);
         context.stroke();
      break;
   } 
}

const draws = [
   'gallows', 
   'head', 
   'body', 
   'rightHarm', 
   'leftHarm',
   'rightLeg',
   'leftLeg',
   'rightFoot',
   'leftFoot',
]
let step = 0;



let word;
let wordsHistory =[];
let copyDictionary = DICTIONARY.slice();

let counter;
let deathCounter =9;
let score=0;

function generateWord(){
    itemfromLS = localStorage.getItem('wordsHistory');
    if(itemfromLS) {
        wordsHistory = JSON.parse(itemfromLS);
        if (wordsHistory.length == DICTIONARY.length){ 
            localStorage.clear();
            wordsHistory=[];
         }
    }
    else{
        wordsHistory=[];
    }
    let iterableDictionary = copyDictionary.filter((el)=> wordsHistory.indexOf(el)== -1);
    word = iterableDictionary[Math.floor(Math.random()*(iterableDictionary.length))];    
    localStorage.setItem('wordsHistory', JSON.stringify(wordsHistory));
    return word, wordsHistory;
}


const startGame = ()=>{
    $TARGET_WORD.innerHTML = '';
    console.log('sdvkijhuivuhsjdi');
    generateWord(); 
        
    for (let i = 0; i < word.length; i++){
        $TARGET_WORD.insertAdjacentHTML('beforeend', `<div class='word__wrapper'><div class = 'hidden' id=${i}>${word[i]}</div></div>`);
    }
    counter = word.length;
    console.log(word);
    return word;
}
startGame();


const successFunc =()=>{
    score++;
    arrayOfIdx = [];
    clearCanvas();
    step = 0;
    startGame();
}

const correctLetterFunc=(word, letter, idx)=>{

    for(i=0; i<word.length; i++){
        if (word[i]=== letter){
            document.getElementById(`${i}`).classList.remove('hidden');
            counter--;
        }
    }
    if (counter==0){
       setTimeout(successFunc, 1000)
     }
}

const looseFunc =()=>{
    clearCanvas();
    step = 0;
    arrayOfIdx = [];
    deathCounter=9;
    startGame();
}

const wrongLetterFunc = (letter)=>{
    deathCounter--;
    Draw(draws[step++])
    if(deathCounter==0){
        looseFunc();
    }
}

const eventFunc = (el)=>{
    let letter = el.target.innerHTML;
    let idx = word.indexOf(letter);
    if (idx !== -1 && !arrayOfIdx.includes(idx)){
        correctLetterFunc(word, letter, idx);
        arrayOfIdx.push(idx); 
    }
    else {
        wrongLetterFunc(letter)
    }
}
$ALPHABET.addEventListener('click', eventFunc);