import React from 'react'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            threads: []
        }
        this.callThreads();
    }

    callThreads() {
        let path = window.location.pathname.split('/');
        let board;
        if(path.length > 0 && path[0] === 'b') {
            board = path[1] ? path[1] : 'general';
        }
        else {
            board = 'general';
        }

        let url = '/api/threads/'+board;
        fetch(url)
        .then( res => res.json() )
        .then( data => {
            if(data) {
                this.setState({threads: data});
            }
        })
    }

    render(){
        return(
            <div>
               {this.state.threads.map( x => {
                   return(<h1>{x.board}</h1>)
               })}
            </div>
        )
    }
}

export default App