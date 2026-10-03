document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const successMessage = document.getElementById('successMessage');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando respuestas...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch('https://formsubmit.co/ajax/jorgemunoz@unimayor.edu.co', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            const result = await response.json();

            // Si es exitoso o si fue el primer envío de activación
            const nameInput = document.getElementById('name').value;
            form.classList.add('hidden');
            userNameDisplay.textContent = nameInput;
            successMessage.classList.remove('hidden');

            window.scrollTo({
                top: document.querySelector('.container').offsetTop - 20,
                behavior: 'smooth'
            });

            if (result.message && result.message.includes('Activation')) {
                alert('¡Formulario conectado! Revisa tu correo jorgemunoz@unimayor.edu.co y haz clic en "Activate Form" para activar las entregas.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Si el fetch da error de red, intentar enviar de forma tradicional
            form.submit();
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            successMessage.classList.add('hidden');
            form.classList.remove('hidden');
        });
    }
});
