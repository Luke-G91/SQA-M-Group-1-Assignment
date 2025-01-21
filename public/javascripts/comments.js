// Function to handle showing/hiding comments
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
// This function is used
/* eslint-disable-next-line no-unused-vars */
function editComment(commentId) {
  const textElement = document.getElementById(`comment-text-${commentId}`);
  const editForm = document.getElementById(`edit-form-${commentId}`);
  textElement.style.display = 'none';
  editForm.style.display = 'block';
}
// This function is used
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

// This function is used
  /* eslint-disable-next-line no-unused-vars */
function createCommentHTML(comment) {
  return `
    <div class="comment" id="comment-${comment.id}">
      <p class="comment-meta">
        <span class="comment-author">${comment.user.displayName}</span>
        <span class="comment-date">(${new Date(comment.createdAt).toLocaleString()})</span>
        <button class="edit-comment" onclick="editComment(${comment.id})">Edit</button>
      </p>
      <p class="comment-text" id="comment-text-${comment.id}">${comment.comment}</p>
      <div class="edit-form" id="edit-form-${comment.id}" style="display: none;">
        <textarea id="edit-input-${comment.id}">${comment.comment}</textarea>
        <button onclick="updateComment(${comment.id})">Save</button>
        <button onclick="cancelEdit(${comment.id})">Cancel</button>
      </div>
    </div>
  `;
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
