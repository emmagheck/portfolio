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


// Function to check if two rectangles overlap
function isOverlapping(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }
  
  // Function to get random position within corkboard bounds
  function getRandomPosition(maxX, maxY, noteWidth, noteHeight) {
    const x = Math.floor(Math.random() * (maxX - noteWidth));
    const y = Math.floor(Math.random() * (maxY - noteHeight));
    return { x, y };
  }
  
  // Make post-it notes draggable and set random non-overlapping positions
  const corkboard = document.querySelector('.corkboard');
  const postIts = document.querySelectorAll('.post-it');
  
  postIts.forEach(postIt => {
    // Set random non-overlapping initial position
    const corkboardRect = corkboard.getBoundingClientRect();
    const postItRect = postIt.getBoundingClientRect();
    const maxX = corkboardRect.width - postItRect.width;
    const maxY = corkboardRect.height - postItRect.height;
  
    let position = getRandomPosition(maxX, maxY, postItRect.width, postItRect.height);
  
    // Check for collisions and adjust position if needed
    while (postIts.some(otherNote => isOverlapping(position, otherNote.getBoundingClientRect()))) {
      position = getRandomPosition(maxX, maxY, postItRect.width, postItRect.height);
    }
  
    postIt.style.left = `${position.x}px`;
    postIt.style.top = `${position.y}px`;
  
    // Make post-it draggable
    postIt.addEventListener('mousedown', (e) => {
      postIt.style.zIndex = 999;
  
      let offsetX = e.clientX - postItRect.left;
      let offsetY = e.clientY - postItRect.top;
  
      function movePostIt(event) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
  
        // Ensure post-it stays within corkboard bounds
        postIt.style.left = `${Math.min(maxX, Math.max(0, newX))}px`;
        postIt.style.top = `${Math.min(maxY, Math.max(0, newY))}px`;
      }
  
      function stopMoving() {
        postIt.style.zIndex = 1;
  
        document.removeEventListener('mousemove', movePostIt);
        document.removeEventListener('mouseup', stopMoving);
      }
  
      document.addEventListener('mousemove', movePostIt);
      document.addEventListener('mouseup', stopMoving);
    });
  });