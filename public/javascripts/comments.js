// Function to handle showing/hiding comments in views/pages/blog.pug
// This function is used
/* eslint-disable-next-line no-unused-vars */
function toggleComments(post) {
  const container = document.getElementById('comments-container');
  const button = document.getElementById('view-comments');
  const isHidden = container.style.display === 'none';
  
  container.style.display = isHidden ? 'block' : 'none';
  const commentCount = post?.commentCount || 0;
  button.textContent = isHidden ? 
    `Hide Comments (${commentCount})` : 
    `View Comments (${commentCount})`;
}
// This function is used in views/components/comment.pug
/* eslint-disable-next-line no-unused-vars */
function editComment(commentId) {
  const textElement = document.getElementById(`comment-text-${commentId}`);
  const editForm = document.getElementById(`edit-form-${commentId}`);
  textElement.style.display = 'none';
  editForm.style.display = 'block';
}
// This function is used in views/components/comment.pug
/* eslint-disable-next-line no-unused-vars */
function updateComment(commentId) {
  const input = document.getElementById(`edit-input-${commentId}`);
  const comment = input.value.trim();
  
  if (!comment || comment.length > 500) return;

  fetch(`/blog/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const textElement = document.getElementById(`comment-text-${commentId}`);
        textElement.textContent = comment;
        cancelEdit(commentId);
      }
    });
}

function cancelEdit(commentId) {
  const textElement = document.getElementById(`comment-text-${commentId}`);
  const editForm = document.getElementById(`edit-form-${commentId}`);
  textElement.style.display = 'block';
  editForm.style.display = 'none';
}

// Character counter for comment input
document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.querySelector('form');
  if (commentForm) {
    const textarea = commentForm.querySelector('textarea');
    const charCount = commentForm.querySelector('.comment-char-count');
    textarea.addEventListener('input', function() {
      charCount.textContent = this.value.length;
    });
  }
});
