document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const keys = ["username", "password"]

    keys.forEach(key => {
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("form");
    const formData = new FormData(form);

    let res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
        })
    });

    res = await res.json()

    if (res.success) {
        window.location.href = "/";
    } else {
        Object.keys(res.errors).forEach(key => {
            document.getElementById(`${key}error`).innerText = res.errors[key]
        });
    }
});