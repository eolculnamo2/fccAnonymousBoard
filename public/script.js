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
    if(document.getElementById('new-thread-board').value) {
        url += document.getElementById('new-thread-board').value;
    }  

    fetch(url,
    {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      })
}