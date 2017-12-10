
const keys = document.querySelectorAll('.key');
//declare function to actually do the thing
function drum(audio, key) {
    audio.currentTime=0;//rewind to the start
    audio.play();
    key.classList.add('playing');    
}
//function to grab info from keypress or click and send it to the drum function
function playSound(e) {
    //from click
    if(!e.keyCode){  
        let key='';
        //get the div to transform
        if (e.srcElement){
            
            if(e.srcElement.className === 'key'){
                key = e.srcElement
            }
            else{
                key = e.srcElement.parentNode
            }
        }
        //polyfill for Mozilla
        if(e.originalTarget){
            if(e.originalTarget.className === 'key'){
                key = e.originalTarget
            }
            else{
                key = e.originalTarget.parentNode
            }
        }
        
        //extract the data-key
        const audio = document.querySelector(`audio[data-key="${key.getAttribute('data-key')}"]`);
        drum(audio, key);
        console.log(audio);
        //console.log(e.path.findIndex((i) => i==='div.key'));
        return;
    }
    //from keypress
    else {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        if (!audio) return;//if the key isn't mapped to a sound, stop
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        drum(audio, key);
    }
}

//finds the end of the animation and reverses it
function removeTransition(e) {
    if(e.propertyName !== 'transform') return;//skip incorrect transition types
    this.classList.remove('playing');
}
//event listeners
window.addEventListener('keydown', playSound);
keys.forEach(key => key.addEventListener('mousedown', playSound))

keys.forEach(key => key.addEventListener('transitionend', removeTransition))