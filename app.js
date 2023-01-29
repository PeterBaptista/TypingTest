class TypeTest{
    constructor(){

        this.displayText = document.getElementById('displaytext');

        this.typingBar = document.getElementById('typing-bar');
        this.typingContainer = document.getElementById('typing-container');

        this.wordsArray = this.displayText.innerText.split(" ");

        this.strDisplayText = this.displayText.innerHTML;
        this.originalText = this.displayText.innerHTML;

        this.totalWords = 0;
        this.displayScore = document.createElement('div');
        this.displayScore.id = 'score-display';

    }
  
    
    handleDisplayTextColor(){
        // Catch the string text that is displayed and store in aux variable called 'text';
        let text = this.strDisplayText;


        // Update the first word color of the text based if it's correct or not on input;
        if(this.wordsArray[0] === this.typingBar.value){
            let auxTest = text.replace(this.wordsArray[0], "<span style='color: lightgreen'>" + this.wordsArray[0] + "</span>");
            this.displayText.innerHTML = auxTest;
        }
        else{
            let auxTest = text.replace(this.wordsArray[0], "<span style='color: red'>" + this.wordsArray[0] + "</span>");
            this.displayText.innerHTML = auxTest;
        }

        
    }
    

    handleSpaceBar()
    {
        let text = this.strDisplayText;

        
        if(this.wordsArray[0] === this.typingBar.value){
            this.typingBar.value = this.typingBar.value.trim();
            // update the text removing the correct word
            let auxText = text.replace(this.wordsArray[0], '');
            this.displayText.innerHTML = auxText;

            // remove the word from the word Array
            this.wordsArray.splice(0, 1);

            // remove the text from input
            this.typingBar.value = "";

            //update the strDisplayText
            this.strDisplayText = auxText.trim();  

            //update the total words
            this.totalWords += 1;
        } 
    }
    handleScore(){
        this.displayScore.innerHTML = this.totalWords + ' WPM (Words per Minute)';
        let existingElement = document.getElementById('typing-container');
        let parent = existingElement.parentNode;
        parent.insertBefore(this.displayScore, existingElement.nextSibling)


    }


    activateInput(){
        this.typingBar.disabled = false;
    }

    deactivateInput(){
        this.typingBar.disabled = true;
    }
}

class Timer{
    constructor()
    {
        this.totalTime = 0;
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.id = 'time-display';

        this.startButton = document.getElementById('start-button');

        this.resetButton = document.createElement('button');
        this.resetButton.id = 'reset-button';

        this.minutes;
        this.seconds;
    }

    initiateTimer(){
        this.totalTime = 60;
        this.minutes = Math.floor(this.totalTime/ 60);
        this.seconds = this.totalTime % 60;

        //format the timer in a minute:second way of viewing like in '2:30';
        this.timeDisplay.innerHTML = this.minutes + ':' + this.seconds.toString().padStart(2, '0');
    }
    
    updateTimer(){
        this.minutes = Math.floor(this.totalTime/ 60);
        this.seconds = this.totalTime % 60;

        //format the timer in a minute:second way of viewing like in '2:30';
        this.timeDisplay.innerHTML = this.minutes + ':' + this.seconds.toString().padStart(2, '0');
    }
    

    displayTimer()
    {
        let existingElement = document.getElementById('typing-container');
        let parent = existingElement.parentNode;
        parent.insertBefore(this.timeDisplay, existingElement);

    }

    countdown()
    {   
            this.totalTime--;
            this.updateTimer();
    }

    showResetButton()
    {
        this.resetButton.innerHTML = 'reset';

        let buttonsBox = document.getElementById('buttons-box');
        buttonsBox.appendChild(this.resetButton);


    }
    removeResetButton(){
        let buttonsBox = document.getElementById('buttons-box');
        buttonsBox.removeChild(this.resetButton);
    }

}


function handleView(){
    typeTest.handleDisplayTextColor();

    typeTest.typingBar.addEventListener('keydown', function(event){
        if(event.key === ' ')
        {
            typeTest.handleSpaceBar();
        }
    });
    typingBar.value = typingBar.value.trim();
}


function handleCountdown(timer, intervalId, typeTest)
{
    timer.countdown();
    if(timer.totalTime === 0)
    {   
        clearInterval(intervalId);
        terminateTest(typeTest);
        timer.showResetButton();
    }
    
}

function initiateTest(startButton, timer, typeTest){
    //shows up the timer and initiate it;
    timer.initiateTimer();
    timer.displayTimer();
    
    // start to decrease the seconds by one
    let intervalId = setInterval(() => {handleCountdown(timer, intervalId, typeTest)}, 1000);

    // disable the start button and enables the input box
    startButton.disabled = true;
    typeTest.activateInput();
    
}

function terminateTest(typeTest){
    typeTest.deactivateInput();
    typeTest.handleScore();
}

function resetTest(startButton, timer, typeTest)
{   
    //reset the timer
    timer.totalTime = 60;

    timer.removeResetButton();

    //reset the text;
    typeTest.strDisplayText = typeTest.originalText;
    typeTest.wordsArray = typeTest.originalText.split(' ');
    typeTest.displayText.innerHTML = typeTest.originalText;
    typeTest.typingBar.value = '';

    //enable start Button
    startButton.disabled = false;

    //remove score
    typeTest.displayScore.remove();
    typeTest.totalWords = 0;
}






const typeTest = new TypeTest();
const typingBar = typeTest.typingBar;
typeTest.deactivateInput();

const timer = new Timer();
const startButton = timer.startButton;
const resetButton = timer.resetButton;


typingBar.addEventListener('input', handleView);
startButton.addEventListener('click', ()=> {initiateTest(startButton, timer, typeTest)});
resetButton.addEventListener('click', () => {resetTest(startButton, timer, typeTest)});