document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playButton = document.getElementById('playButton'); 
    const stopButton = document.getElementById('stopButton'); 

   
    playButton.addEventListener('click', () => {
        backgroundMusic.play().catch(error => {
            console.log('Erro ao tocar a música:', error); 
        });
    });

   
    stopButton.addEventListener('click', () => {
        backgroundMusic.pause(); 
        backgroundMusic.currentTime = 0; 
    });

    const jumentinho = document.querySelector('.jumentinho');
    let positionX = 100; 
    let isJumping = false; 
    const messageBox = document.querySelector('.message-box');
    const messageText = "Welcome to the Backlands! Get ready for incredible adventures with the donkey!";
    let isMessageDisplayed = false; 
    let typingIndex = 0; 
    let typingTimeout; 

    
    function showMessage() {
        if (!isMessageDisplayed) {
            messageBox.style.display = 'block'; 
            messageBox.innerHTML = `<p class="typing"></p>`;
            typingIndex = 0; 
            typeMessage(); 
            isMessageDisplayed = true; 
        }
    }

    
    function typeMessage() {
        if (typingIndex < messageText.length) {
            messageBox.querySelector('.typing').textContent += messageText.charAt(typingIndex);
            typingIndex++;
            typingTimeout = setTimeout(typeMessage, 100); 
        }
    }

    
    function hideMessage() {
        clearTimeout(typingTimeout); 
        messageBox.style.display = 'none'; 
        isMessageDisplayed = false; 
        messageBox.querySelector('.typing').textContent = ''; 
    }

    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && positionX < 830) { 
            positionX += 10;
            jumentinho.style.left = positionX + 'px';
            showMessage(); 
        } else if (event.key === 'ArrowLeft' && positionX > 0) { 
            positionX -= 10; 
            jumentinho.style.left = positionX + 'px'; 
            showMessage(); 
        } else if (event.key === 'w' || event.key === 'W') {
            positionX += 10; 
            jumentinho.style.left = positionX + 'px'; 
            showMessage();
        } else if (event.key === 's' || event.key === 'S') {
            positionX -= 10; 
            jumentinho.style.left = positionX + 'px'; 
            showMessage(); 
        } else if (event.key === 'ArrowUp' && !isJumping) {
            isJumping = true;
            jump(); 
        }
    });

    
    function jump() {
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight < 100) {
                jumpHeight += 5; 
                jumentinho.style.bottom = (40 + jumpHeight) + 'px'; 
            } else {
                clearInterval(jumpInterval); 
                fall();
            }
        }, 20);
    }

    
    function fall() {
        let fallHeight = 100; 
        const fallInterval = setInterval(() => {
            if (fallHeight > 0) {
                fallHeight -= 5; 
                jumentinho.style.bottom = (40 + fallHeight) + 'px'; 
            } else {
                clearInterval(fallInterval); 
                isJumping = false; 
                jumentinho.style.bottom = '40px'; 
            }
        }, 20);
    }

    
    document.addEventListener('keyup', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'w' && event.key !== 's') {
            hideMessage(); 
        }
    });
});
