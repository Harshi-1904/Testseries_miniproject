document.getElementById("signup").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input fields
    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    // Send data to backend
})