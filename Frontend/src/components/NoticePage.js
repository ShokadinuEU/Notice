import React from 'react';
import NoticeItem from './NoticeItem'

class NoticePage extends React.Component{

    constructor(props){

        super(props);
        this.state={

            notices: [],
            name: ''
        }

        this.logOut = this.logOut.bind(this)

    }

    logOut(){

        let url = "/"
        fetch(url,{

            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: new Headers({'Content-Type': 'application/json'})
        },{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{

            console.log(res.status)
            this.props.history.push('/')
        })
    }
    

    fetchNotice(){

        
        var url = "/notice"
        fetch(url,{ credentials: 'include'})
        .then(res => res.json())
        .then(res =>{
            if(res.logIn === ''){

                this.props.history.push('/')
                return false;
            }else{

                this.setState({
              
                    notices: res.data,
                    name: res.name
                }, function(){

                    console.log("NAME",this.state.name)
                })
            }
        })
    }

    componentDidMount(){

        this.fetchNotice()

    }

    render(){

        const noticeItems = this.state.notices.map((notice, i) => {

            return(

                <NoticeItem key={notice._id} item={notice}/>
            )
        })

        return(
          
            <div>
                <button onClick={this.logOut} className="btn blue right" type="submit" >Log out</button>
                <h4>Hello, {this.state.name}</h4>
                <h1 className="center">Notice</h1>
                   <ul className="collection">

                        {noticeItems}
                   </ul>
                   <a href="/notice/addnotice"className="btn-floating btn-large red"><i className="fa fa-plus"></i></a>
            </div>
                    
        )
    }
}

export default NoticePage

