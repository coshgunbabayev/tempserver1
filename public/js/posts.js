function accommodatePosts(tag, posts) {
    // function owner(post) {
    //     return post.isOwner ?
    //         `
    //         <div class="d-flex justify-content-between align-items-center">
    //             <h6 class="card-subtitle text-muted">${post.date}</h6>
    //             <button type="button" class="btn btn-danger btn-sm" onclick="deleteNote('${post._id}')">Delete</button>
    //         </div>
    //         ` :
    //         `
    //         <div class="d-flex justify-content-between align-items-center">
    //             <h6 class="card-subtitle text-muted">${post.date}</h6>
    //         </div>`;
    // };

    tag.innerHTML = ""
    for (post of posts) {
        tag.innerHTML += `
     <div class="card">
        <a href="/post/${post._id}">
            <div class="card-body">

                <h5 class="card-title">${post.user.name} ${post.user.surname}</h5>

                <h6 class="card-subtitle text-muted"
                onclick="event.preventDefault(); window.location.href = '/user/${post.user.username}'"
                style="display: inline-block;">
                    @${post.user.username}
                </h6>

                <p class="card-text">${post.text}</p>
                
            </div>
        </a>
    </div>  
        `;
    };
};