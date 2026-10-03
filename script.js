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
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                // Obtener nombre del usuario y mostrar pantalla de éxito
                const nameInput = document.getElementById('name').value;
                form.classList.add('hidden');
                userNameDisplay.textContent = nameInput;
                successMessage.classList.remove('hidden');

                window.scrollTo({
                    top: document.querySelector('.container').offsetTop - 20,
                    behavior: 'smooth'
                });
            } else {
                alert('Aviso: ' + (result.message || 'Verifica tu Access Key de Web3Forms.'));
            }
        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Hubo un error de conexión al enviar la encuesta. Inténtalo nuevamente.');
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
