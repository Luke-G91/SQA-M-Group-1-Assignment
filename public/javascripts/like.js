// Function to handle the like action for a post
function handleLike(postId) {
  // Send a POST request to the server to like the post
  fetch(`/blog/${postId}/like`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Get the like button element for the post
        const likeButton = document.getElementById(`like-button-${postId}`);
        // Update the button text and class based on the like state
        likeButton.innerText = data.liked ? 'Liked' : 'Like';
        likeButton.innerText += ` (${data.likeCount})`;
        likeButton.classList.toggle('liked', data.liked);
      } else {
        // Show an alert if the user needs to log in to like the post
        alert('You need to log in to like a post.');
      }
    });
}
