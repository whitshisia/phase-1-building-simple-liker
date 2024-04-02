// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const colorStates = {
  "red" : "",
  "": "red"
};
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden'); 


const articleHearts = document.querySelectorAll(".like-glyph");

function likeCallback(e) {
  const heart = e.target;
  mimicServerCall()
    .then(function(serverMessage) {
      alert("You notified the server!");
      heart.innerText = heart.innerText === EMPTY_HEART ? FULL_HEART : EMPTY_HEART;
      heart.classList.toggle('activated-heart'); 
      if (heart.innerText === FULL_HEART) {
        errorModal.classList.add('hidden'); 
      }
    })
    .catch(function(error) {
      errorModal.classList.remove('hidden');
      const errorMessage = document.getElementById('modal-message');
      errorMessage.innerText = error;
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

for (const glyph of articleHearts) {
  glyph.addEventListener("click", likeCallback);
}






//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
