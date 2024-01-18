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
  // Set random initial position without overlap
  let randomX, randomY;
  do {
    randomX = Math.floor(Math.random() * (corkboard.offsetWidth - postIt.offsetWidth));
    randomY = Math.floor(Math.random() * (corkboard.offsetHeight - postIt.offsetHeight));
  } while (isOverlap(randomX, randomY));

  postIt.style.left = `${randomX}px`;
  postIt.style.top = `${randomY}px`;

  // Make post-it draggable
  postIt.addEventListener('mousedown', (e) => {
    // Bring the post-it to the front by increasing its z-index
    postIt.style.zIndex = 999;

    let offsetX = e.clientX - postIt.getBoundingClientRect().left;
    let offsetY = e.clientY - postIt.getBoundingClientRect().top;

    function movePostIt(event) {
      // Calculate the new position within corkboard boundaries
      let newX = Math.min(Math.max(event.clientX - offsetX, 0), corkboard.offsetWidth - postIt.offsetWidth);
      let newY = Math.min(Math.max(event.clientY - offsetY, 0), corkboard.offsetHeight - postIt.offsetHeight);

      postIt.style.left = `${newX}px`;
      postIt.style.top = `${newY}px`;
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

// Function to check if the new position will overlap with existing post-its
function isOverlap(x, y) {
  let overlap = false;
  postIts.forEach(postIt => {
    const rect = postIt.getBoundingClientRect();
    if (
      x < rect.right &&
      x + postIt.offsetWidth > rect.left &&
      y < rect.bottom &&
      y + postIt.offsetHeight > rect.top
    ) {
      overlap = true;
    }
  });
  return overlap;
}