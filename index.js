//Model Section

const displayText = document.getElementById('displaytext');
let wordsArray = displayText.innerText.split(" ");

let strText = displayText.innerHTML;

let typingBar = document.getElementById("typing-bar");

function updateWordStatus()
{
    updateDisplayTextColor();
    typingBar.addEventListener('keydown', handleSpaceBar);


    typingBar.value = typingBar.value.trim();
    console.log('pronto');
}



function handleSpaceBar(event){
    if(event.key === ' ')
    {
        checkFinish();
    }
}

//View Section

function updateDisplayTextColor(){
    let text = strText;


    // update the color of the first word of the display text to green if it's correct
    if(wordsArray[0] === typingBar.value)
    {
        let newText = text.replace(wordsArray[0], "<span style='color: lightgreen'>"+ wordsArray[0] + "</span>")
        displayText.innerHTML = newText;
    }
    else{
        let newText = text.replace(wordsArray[0], "<span style='color: red'>"+ wordsArray[0] + "</span>")
        displayText.innerHTML = newText;
    }
}



//Control Section

function checkFinish(){
    let text = strText

    if(wordsArray[0] === typingBar.value){
        let newText = text.replace(wordsArray[0] + ' ', '');
        wordsArray.splice(0, 1);

        displayText.innerHTML = newText;
        
        typingBar.value = "";
        strText = newText;
    }
}


typingBar.addEventListener("input", updateWordStatus);