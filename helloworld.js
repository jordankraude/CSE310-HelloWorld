document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('firstname');
    const cursor = document.getElementById('cursor'); // Select the cursor directly by its ID
    const container = document.getElementById('container')
    const helloHeader = document.getElementById("hello");
    const submitButton = document.getElementById("submit");
    let currentIndex = 0;
    let isCycling = false;
    let intervalId;
    const greetings = [" World!", " Programmer!"];

    function typeAndDelete(text) {
        startBlinking();
        let displayText = "Hello ";
        let index = 0;
        let typingInterval = setInterval(function() {
            stopBlinking();
            displayText += text[index];
            helloHeader.textContent = displayText + " ";
            index++;
            if (index >= text.length) {
                clearInterval(typingInterval);
                setTimeout(function() {
                    let deletingIndex = text.length;
                    let deletingInterval = setInterval(function() {
                        stopBlinking();
                        displayText = "Hello " + text.substring(0, deletingIndex);
                        helloHeader.textContent = displayText;
                        deletingIndex--;
                        if (deletingIndex < 0) {
                            clearInterval(deletingInterval);
                            isCycling = false; // Set cycling flag to false after deleting

                        }
                    }, 80);
                }, 2000);
                startBlinking();
            }
        }, 80);
        startBlinking();
    }

    function startBlinking() {
        setTimeout(function() {
            cursor.classList.add('blinking');
        }, 400)
    }
    
    function stopBlinking() {
        cursor.classList.remove('blinking');
        cursor.style.opacity = '1'
    }

    function cycleGreetings() {
        if (!isCycling) {
            isCycling = true; // Set cycling flag to true before starting a new cycle
            let text = greetings[currentIndex];
            typeAndDelete(text);
            currentIndex = (currentIndex + 1) % greetings.length;
        }
    }

    function startCycling() {
        cycleGreetings();
        intervalId = setInterval(cycleGreetings, 500);
    }

    function stopCycling() {
        clearInterval(intervalId);
    }

    submitButton.addEventListener("click", function() {
        container.style.display = 'flex'
        greetings.push(" " + inputField.value + "!");
        inputField.disabled = true;
        submitButton.style.display = "none";
        inputField.style.display = "none";
        setTimeout(startCycling(), 200)
        ;
    });
});
