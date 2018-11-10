function newThread() {
    let text, password;

    if(document.getElementById('new-thread-text')){
        text = document.getElementById('new-thread-text').value;
    }
    if(document.getElementById('new-thread-pw')){
        password = document.getElementById('new-thread-pw').value;
    }

    let payload = {
        text: text,
        password: password
    }
    
    let url = '/api/threads/';
    let board = 'general'
    if(document.getElementById('new-thread-board').value) {
        board = document.getElementById('new-thread-board').value;
    }
    url+=board;

    fetch(url,
    {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      })
    .then(()=> window.location.replace("http://localhost:3000/b/"+board));
} 