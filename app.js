class TypeTest{
    constructor(){
        this.displayText = document.getElementById('displaytext');
        this.typingBar = document.getElementById('typing-bar');
        this.typingContainer = document.getElementById('typing-container');
        this.wordsArray = this.displayText.innerText.split(" ");
        this.strDisplayText = this.displayText.innerHTML;

        
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
            this.strDisplayText = auxText;  
        } 
    }
}

class Timer{
    constructor()
    {
        this.totalTime = 0;
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.id = 'time-display';

        this.startButton = document.getElementById('start-button');
        this.minutes;
        this.seconds;
    }

    initiateTimer(){
        this.totalTime = 60;
        this.minutes = Math.floor(this.totalTime/ 60);
        this.seconds = this.totalTime % 60;

        this.timeDisplay.innerHTML = this.minutes + ':' + this.seconds.toString().padStart(2, '0');
    }
    
    updateTimer(){
        this.minutes = Math.floor(this.totalTime/ 60);
        this.seconds = this.totalTime % 60;
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

}


function initiateTest(){
    typeTest.handleDisplayTextColor();

    typeTest.typingBar.addEventListener('keydown', function(event){
        if(event.key === ' ')
        {
            typeTest.handleSpaceBar();
        }
    });
    typingBar.value = typingBar.value.trim();
    console.log('pronto');
}

function handleCountdown(timer)
{
   timer.countdown();
   console.log('eu estive no countdown')
   if(timer.totalTime === 0)
    {
        timer.initiateTimer();
    }

}


const typeTest = new TypeTest();
const typingBar = typeTest.typingBar;

const timer = new Timer();
const startButton = timer.startButton;



typingBar.addEventListener('input', initiateTest);


timer.initiateTimer();
timer.displayTimer();

let intervalId = setInterval(() => {handleCountdown(timer)}, 1000);
