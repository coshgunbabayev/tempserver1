async function postSbmt(event, url) {
    event.preventDefault()
    const keys = ["text"];

    keys.forEach(key => {
        document.getElementById(key).style.borderColor = "#ced4da";
        document.getElementById(`${key}error`).innerText = "";
    });

    const form = document.getElementById("postform");
    const formData = new FormData(form);

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: formData.get('text')
        })
    });

    res = await res.json();
    console.log(res)
    if (res.success) {
        window.location.reload();
    } else {
        Object.keys(res.errors).forEach(key => {
            if (key !== 'username') {
                document.getElementById(`${key}`).style.borderColor = "rgb(255, 0, 0)";
            }
            document.getElementById(`${key}error`).innerText = res.errors[key];
        });
    };
};