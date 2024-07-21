document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (name && email && message) {
            // Create a JSON object from form data
            const formData = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString() // Store timestamp as ISO string
            };

            // Log the JSON data to the console
            console.log(JSON.stringify(formData, null, 2));

            // Save JSON data to Firestore
            try {
                await db.collection('contactMessages').add(formData);
                
                // Clear the form
                form.reset();
                
                alert('Thank you for your message! We will get back to you soon.');
            } catch (error) {
                console.error('Error writing document: ', error);
                alert('There was an error. Please try again later.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    });
});
