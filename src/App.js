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
        console.log(path);
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
            data.success === true ? alert("Deleted") : alert("Incorrect Password");
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
                        {x.replies.map((y,j) => {
                            return(<div key={'y'+j}  style={{padding: '1em', border: '1px solid #333'}}>{y.text}</div>)
                        })}
                   </div>
                )
               })}
            </div>
        )
    }
}

/*
{
      "replies": [],
      "_id": "5be50844af1ddd326484edb0",
      "text": "This is my first board post",
      "created_on": "Thu Nov 08 2018 22:08:36 GMT-0600 (CST)",
      "bumped_on": "Thu Nov 08 2018 22:08:36 GMT-0600 (CST)",
      "reported": false,
      "delete_password": "anonymoous",
      "board": "general",
      "__v": 0
   }
*/

export default App