function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    sendToServer({ name, email, message })
    .then(() => {
        alert('Submitted');
    })
    .catch(() => {
        alert('Error submitting form - Try again');
    });
}

async function sendToServer(data) {
    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error submitting form');
    }
}

// Listens for the event of the contact form being submitted, then it calls the function.
document.getElementById('contact-form').addEventListener('submit', submitContactForm);




