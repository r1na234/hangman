const $ALPHABET = document.querySelector('.alphabet');
const $TARGET_WORD = document.querySelector('.taget__word');

const DICTIONARY = ["АПЕЛЬСИН", "ЯБЛОКО", "ГРУША",'КАНТ', 'ХРОНИКА', 'ЗАЛ', 'ГАЛЕРА', 'БАЛЛ', 'ВЕС', 'КАФЕЛЬ', 'ЗНАК', 'ФИЛЬТР', 'БАШНЯ', 'КОНДИТЕР', 'ОМАР', 'ЧАН', 'ПЛАМЯ', 
'БАНК', 'ТЕТЕРЕВ','МУЖ', 'КАМБАЛА', 'ГРУЗ', 'КИНО', 'ЛАВАШ', 'КАЛАЧ', 'ГЕОЛОГ', 'БАЛЬЗАМ', 'БРЕВНО', 'ЖЕРДЬ', 'БОРЕЦ', 'САМОВАР', 'КАРАБИН', 'ПОДЛОКОТНИК', 'БАРАК', 'МОТОР', 
'ШАРЖ', 'СУСТАВ', 'АМФИТЕАТР', 'СКВОРЕЧНИК', 'ПОДЛОДКА', 'ЗАТЫЧКА', 'РЕСНИЦА', 'СПИЧКА', 'КАБАН', 'МУФТА', 'СИНОПТИК', 'ХАРАКТЕР', 'МАФИОЗИ', 'ФУНДАМЕНТ', 'БУМАЖНИК', 'БИБЛИОФИЛ', 
'ДРОЖЖИ', 'КАЗИНО', 'КОНЕЧНОСТЬ', 'ПРОБОР', 'ДУСТ', 'КОМБИНАЦИЯ', 'МЕШКОВИНА', 'ПРОЦЕССОР', 'КРЫШКА', 'СФИНКС', 'ПАССАТИЖИ', 'ФУНТ', 'КРУЖЕВО', 'АГИТАТОР', 'ФОРМУЛЯР', 'ПРОКОЛ', 
'АБЗАЦ', 'КАРАВАН', 'ЛЕДЕНЕЦ', 'КАШПО', 'БАРКАС', 'КАРДАН', 'ВРАЩЕНИЕ', 'ЗАЛИВНОЕ', 'МЕТРДОТЕЛЬ', 'КЛАВИАТУРА', 'РАДИАТОР', 'СЕГМЕНТ', 'ОБЕЩАНИЕ', 'МАГНИТОФОН', 'КОРДЕБАЛЕТ', 
'ЗАВАРУШКА'];


let word;
let wordsHistory =[];
let copyDictionary = DICTIONARY.slice();

let counter;
let deathCounter =6;
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
    wordsHistory.push(word);
    localStorage.setItem('wordsHistory', JSON.stringify(wordsHistory));
    return word, wordsHistory;
}


const startGame = ()=>{
    $TARGET_WORD.innerHTML = '';
   
    generateWord(); 
    
    
    
    for (let i = 0; i < word.length; i++){
        $TARGET_WORD.insertAdjacentHTML('beforeend', `<div class = 'hidden' id=${i}>${word[i]}</div>`);
    }
    counter = word.length;
    console.log(word);
    return word;
    

}
startGame();


const successFunc =()=>{
    console.log('win');
    score++;
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

const wrongLetterFunc = (letter)=>{
    deathCounter--;
 
    if(deathCounter==0){
        console.log('fail');
    }
}

const eventFunc = (el)=>{
    let letter = el.target.innerHTML;
    let idx = word.indexOf(letter);    
    if (idx !== -1){
        correctLetterFunc(word, letter, idx);
    }
    else {
        wrongLetterFunc(letter)
    }

}

$ALPHABET.addEventListener('click', eventFunc)


  