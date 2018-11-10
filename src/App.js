import React from 'react'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            board: '',
            threads: []
        }
        this.callThreads();
    }

    callThreads() {
        let path = window.location.pathname.split('/');

        let board;
        if(path.length > 0 && path[1] === 'b') {
            board = path[2] ? path[2] : 'general';
        }
        else {
            board = 'general';
        }

        let url = '/api/threads/'+board;
        fetch(url)
        .then( res => res.json() )
        .then( data => {
            if(data && data[0]) {
                this.setState({board: data[0].board, threads: data});
            }
            else {
                this.setState({board: 'No Current Threads'})
            }
        })
    }

    reportThread(id){
       let url = '/api/threads/'+this.state.board;

       let payload = {
           id: id
       }

        fetch(url,
            {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            })
    }

    reportReply (threadId, replyId){
        let url = '/api/replies/'+this.state.board;
 
        let payload = {
            threadId: threadId,
            replyId: replyId
        }
 
         fetch(url,
             {
                 method: "PUT",
                 body: JSON.stringify(payload),
                 headers: { "Content-Type": "application/json" }
             })
     }

     showAllReplies(id, threadIndex) {
        let url = '/api/replies/'+this.state.board + '?thread_id='+id

        fetch(url)
        .then( res => res.json())
        .then( data => {
            let newThreadArr = this.state.threads;
            newThreadArr[threadIndex] = data;
            console.log(newThreadArr);
            this.setState({threads: newThreadArr});
        })
     }

     deleteReply (threadId, replyId){
        let url = '/api/replies/'+this.state.board;
        let password = prompt("Enter delete password");

        let payload = {
            threadId: threadId,
            replyId: replyId,
            password: password
        }
 
         fetch(url,
             {
                 method: "DELETE",
                 body: JSON.stringify(payload),
                 headers: { "Content-Type": "application/json" }
             })
     }

    deleteThread(id) {
        let url = '/api/threads/'+this.state.board;
        let pw = prompt("Enter Delete Password")
        
        let payload = {
            id: id,
            password: pw
        }

        fetch(url,
            {
                method: "DELETE",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            })
        .then( res => res.json())
        .then( data => {
            if(data.success) {
                alert("Deleted");
                location.reload();
            }
            else {
                alert("Incorrect Password");
            }            
        })
    }

    postReply(id, i) {
        let url = '/api/replies/'+this.state.board;
        let password = prompt("Enter delete password")
        let payload = {
            id: id,
            reply: {
                text: document.getElementById('textarea-'+i).value,
                delete_password: password,
                reported: false
            }
        }
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            })
        .then( res => res.json())
        .then( data => {
            location.reload();
        })
    }
    render(){
        return(
            <div>
                <h1>{this.state.board}</h1>
               {this.state.threads.map((x,i) => {
                   return(
                    <div key={'x'+i} style={{padding: '1em', border: '1px solid #333'}}>
                        <div>ID: <b>{x._id}</b></div>
                        <div>Created On: {x.created_on}</div>
                        <div>Last Updated: {x.bumped_on}</div>
                        <div>Reported: {x.reported ? 'Reported' : 'Not Reported'}</div>
                        <button type="button" onClick={this.reportThread.bind(this, x._id)}>Report Thread</button><br/>
                        <button type="button" onClick={this.deleteThread.bind(this, x._id)}>Delete Thread</button>
                        <p>{x.text}</p>
                        <b>Post Reply</b><br/>
                        <textarea id={"textarea-"+i} /><br/>
                        <button onClick={this.showAllReplies.bind(this,x._id, i)} style={{display: x.replies.length > 2 ? 'block' : 'none'}}>Show All Replies</button>
                        <button onClick={this.postReply.bind(this, x._id, i)}>REPLY</button><br/>
                        {x.replies.map((y,j) => {
                            return(<div key={'y'+j}  style={{padding: '1em', border: '1px solid #333'}}>
                            <em>ID: {y.id}</em><br/>
                            <em>Reported: {y.reported ? 'Reported' : 'Not Reported'}</em><br/>
                            <button onClick={this.reportReply.bind(this, x._id, y.id)}>Report Reply</button>
                            <button onClick={this.deleteReply.bind(this, x._id, y.id)}>Delete Reply</button>
                            <p>{y.text}</p>
                            </div>)
                        })}
                   </div>
                )
               })}
            </div>
        )
    }
}

export default App