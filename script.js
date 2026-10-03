document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const successMessage = document.getElementById('successMessage');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get the user's name
        const nameInput = document.getElementById('name').value;
        
        // Hide form and show success message with animation
        form.classList.add('hidden');
        
        // Set the name and display the message
        userNameDisplay.textContent = nameInput;
        successMessage.classList.remove('hidden');
        
        // Scroll to top of the container
        window.scrollTo({
            top: document.querySelector('.container').offsetTop - 20,
            behavior: 'smooth'
        });
    });

    resetBtn.addEventListener('click', () => {
        // Reset form
        form.reset();
        
        // Hide success message and show form
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });
});
