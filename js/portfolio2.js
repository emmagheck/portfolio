document.addEventListener('DOMContentLoaded', function() {
    // Your text to be typed
    var textToType = "Welcome! My name is Emma and I'm a second-year MSI student at the University of Michigan School of Information studying Digital Curation. 👩🏼‍💻 I am passionate about using tech in libraries and archives to increase the accessibility and usability of digital data.";

    // Target element
    var typedTextElement = document.getElementById('typed-text');

    // Index to keep track of the current position in the text
    var index = 0;

    // Interval between typing each character (adjust as needed)
    var typingInterval = 20; // in milliseconds

    // Function to simulate typing
    function typeText() {
      typedTextElement.textContent += textToType[index];
      index++;

      // Check if there are more characters to type
      if (index < textToType.length) {
        // Continue typing
        setTimeout(typeText, typingInterval);
      }
    }

    // Start typing when the page loads
    typeText();
  });

  function toggleMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
  }
