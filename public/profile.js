document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.querySelector(".edit-btn");
    const saveBtn = document.querySelector(".save-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const logoutBtn = document.querySelector(".logout-btn");

    const editSection = document.getElementById("edit-section");
    const nameField = document.getElementById("edit-name");
    const emailField = document.getElementById("edit-email");

    editBtn.addEventListener("click", () => {
        editSection.style.display = "block";
        editBtn.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
        editSection.style.display = "none";
        editBtn.style.display = "block";
    });

    saveBtn.addEventListener("click", async () => {
        const newName = nameField.value;
        const newEmail = emailField.value;

        try {
            const response = await fetch("/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName, email: newEmail })
            });

            const result = await response.json();
            alert(result.message);

            if (result.success) {
                document.getElementById("user-name").innerText = newName;
                document.getElementById("user-email").innerText = newEmail;
                editSection.style.display = "none";
                editBtn.style.display = "block";
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    });

    logoutBtn.addEventListener("click", () => {
        window.location.href = "/logout";
    });
});
