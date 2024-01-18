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


// Make post-it notes draggable and set random positions
const postIts = document.querySelectorAll('.post-it');
const corkboard = document.querySelector('.corkboard');

postIts.forEach(postIt => {
  // Set random initial position within corkboard
  const randomX = Math.floor(Math.random() * (corkboard.clientWidth - postIt.clientWidth));
  const randomY = Math.floor(Math.random() * (corkboard.clientHeight - postIt.clientHeight));
  postIt.style.left = `${randomX}px`;
  postIt.style.top = `${randomY}px`;

  // Make post-it draggable
  postIt.addEventListener('mousedown', (e) => {
    // Bring the post-it to the front by increasing its z-index
    postIt.style.zIndex = 999;

    let offsetX = e.clientX - postIt.getBoundingClientRect().left;
    let offsetY = e.clientY - postIt.getBoundingClientRect().top;

    function movePostIt(event) {
      // Calculate new position within corkboard boundaries
      let newLeft = event.clientX - offsetX;
      let newTop = event.clientY - offsetY;

      // Ensure the post-it stays within the corkboard
      newLeft = Math.min(Math.max(newLeft, 0), corkboard.clientWidth - postIt.clientWidth);
      newTop = Math.min(Math.max(newTop, 0), corkboard.clientHeight - postIt.clientHeight);

      postIt.style.left = `${newLeft}px`;
      postIt.style.top = `${newTop}px`;
    }

    function stopMoving() {
      // Reset the z-index when dragging stops
      postIt.style.zIndex = 1;

      document.removeEventListener('mousemove', movePostIt);
      document.removeEventListener('mouseup', stopMoving);
    }

    document.addEventListener('mousemove', movePostIt);
    document.addEventListener('mouseup', stopMoving);
  });
});