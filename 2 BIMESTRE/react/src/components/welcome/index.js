import React from "react"

class Welcome extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: "Hello World!"
        }
    }

    render(){
        return <h1 style={{color: this.props.color}}> {this.state.message} </h1>
    }
}

export default Welcome