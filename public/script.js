function newThread() {
    let payload = {
        text: document.getElementById('new-thread-text').value,
        password: document.getElementById('new-thread-pw').value
    }
    
    let url = '/api/threads';
    if(document.getElementById('new-thread-board').value) {
        url += document.getElementById('new-thread-board').value;
    }

    fetch('/api/threads' + document.getElementById('new-thread-board').value,
    {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      })
}