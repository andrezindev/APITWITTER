document.getElementById('tweetForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const status = document.getElementById('status').value;
  
    fetch('/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  });
  
  // Consultar tweets
  fetch('/tweets')
  .then(response => response.json())
  .then(tweets => {
    const tweetsContainer = document.getElementById('tweets');
    tweets.forEach(tweet => {
      const tweetElement = document.createElement('div');
      tweetElement.textContent = tweet.text;
      tweetsContainer.appendChild(tweetElement);
    });
  });
  