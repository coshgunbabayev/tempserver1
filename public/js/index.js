const posts = document.getElementById("posts");

async function getposts() {
    let res = await fetch("/api/post", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    console.log(res.posts);

    if (res.success) {
        if (res.posts.length) {
            res.posts.reverse();
            accommodatePosts(posts, res.posts);
        } else {
            posts.innerHTML = `
                <div class="card">
                    <div class="card-body">

                        <p class="card-title">
                            Not found. Be the first to note!
                        </p>

                    </div>
                </div>
            `;
        }
    };
}; getposts();

async function deleteNote(id) {
    let res = await fetch(`/api/note/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })

    res = await res.json();

    if (res.success) {
        getposts();
    } else if (res.message) {
        alert(res.message);
    };
};