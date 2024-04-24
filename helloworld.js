document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('firstname');
    const cursor = document.getElementById('cursor'); // Select the cursor directly by its ID
    const container = document.getElementById('container')
    const helloHeader = document.getElementById("hello");
    const submitButton = document.getElementById("submit");
    let currentIndex = 0;
    let isCycling = false;
    let intervalId;
    const greetings = ["World!", "Programmer!"];

    function typeAndDelete(text) {
        let displayText = "Hello ";
        let index = 0;
        let typingInterval = setInterval(function() {
            displayText += text[index];
            helloHeader.textContent = displayText;
            index++;
            if (index >= text.length) {
                clearInterval(typingInterval);
                setTimeout(function() {
                    let deletingIndex = text.length;
                    let deletingInterval = setInterval(function() {
                        displayText = "Hello " + text.substring(0, deletingIndex);
                        helloHeader.textContent = displayText;
                        deletingIndex--;
                        if (deletingIndex < 0) {
                            clearInterval(deletingInterval);
                            isCycling = false; // Set cycling flag to false after deleting
                            stopBlinking();
                        }
                    }, 100);
                }, 3000);
                startBlinking();
            }
        }, 100);
    }

    function startBlinking() {
        setTimeout(function() {
            cursor.classList.add('blinking');
        }, 500)
    }
    
    function stopBlinking() {
        cursor.classList.remove('blinking');
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
        intervalId = setInterval(cycleGreetings, 2000);
    }

    function stopCycling() {
        clearInterval(intervalId);
    }

    submitButton.addEventListener("click", function() {
        container.style.display = 'flex'
        greetings.push(inputField.value + "!");
        inputField.disabled = true;
        submitButton.style.display = "none";
        inputField.style.display = "none";
        setTimeout(startCycling(), 500)
        ;
    });

    inputField.addEventListener("input", function() {
        stopCycling();
        inputField.disabled = false;
        submitButton.style.display = "inline-block";
        helloHeader.textContent = "Hello " + inputField.value;
    });

    inputField.addEventListener("focus", function() {
        cursor.style.opacity = 1;
    });

    inputField.addEventListener("blur", function() {
        cursor.style.opacity = 0;
    });
});
