// --- 1. SELECTING ALL ELEMENTS ---
const writeBtn = document.getElementById('writeBtn');
const cancelBtn = document.getElementById('cancelBtn');
const publishBtn = document.getElementById('publishBtn');
const editorSection = document.getElementById('editorSection');
const blogFeed = document.getElementById('blogFeed');

const titleInput = document.getElementById('postTitle');
const contentInput = document.getElementById('postContent');

// New: Footer Scroll Button
const scrollToTopBtn = document.getElementById('scrollToTop');


// --- 2. DATA MANAGEMENT (STORIES) ---
// This looks into your browser's memory to find saved stories. 
// If it finds none, it starts with an empty list [].
let stories = JSON.parse(localStorage.getItem('myStories')) || [];


// --- 3. FUNCTIONS ---

// Function to display stories on the website
function renderStories() {
    blogFeed.innerHTML = ''; // Clear the screen first
    
    // We reverse the list so the newest story is at the top
    const sortedStories = [...stories].reverse();

    sortedStories.forEach((story) => {
        const post = document.createElement('article');
        post.className = 'post-card';
        post.innerHTML = `
            <span class="post-date">${story.date}</span>
            <h2 class="post-title">${story.title}</h2>
            <p>${story.content}</p>
        `;
        blogFeed.appendChild(post);
    });
}


// --- 4. EVENT LISTENERS (CLICK ACTIONS) ---

// Show the editor when "Write a Story" is clicked
writeBtn.addEventListener('click', () => {
    editorSection.classList.toggle('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hide the editor when "Cancel" is clicked
cancelBtn.addEventListener('click', () => {
    editorSection.classList.add('hidden');
    titleInput.value = '';
    contentInput.value = '';
});

// Logic for the "Publish Story" button
publishBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const content = contentInput.value;

    // Check if user actually wrote something
    if (title.trim() === '' || content.trim() === '') {
        alert("Please write something before publishing.");
        return;
    }

    // Create a Story Object
    const newStory = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        })
    };

    // Save to our array and update Browser Storage
    stories.push(newStory);
    localStorage.setItem('myStories', JSON.stringify(stories));

    // Reset UI
    titleInput.value = '';
    contentInput.value = '';
    editorSection.classList.add('hidden');

    // Refresh the list on the screen
    renderStories();
});

// --- 5. NEW: FOOTER BACK-TO-TOP LOGIC ---
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- 6. INITIALIZE ---
// This runs the moment the page opens
renderStories();