document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    // You can add your own logic here to validate the email and show the content
    document.getElementById('message').textContent = 'Thank you! You can now proceed to watch the content.';
  });