
import React from "react"
import './style.css'

export default class Counter extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    addVal = (v) => {
        this.setState({
            value: parseInt(this.state.value) + v,
        })
    }



    render (){
        return (
            <div>
                <hr/>
                <button className="botao" onClick={() => this.addVal(-1)}> - </button>
                <h1 className="text"> {this.state.value} </h1>
                <button className="botao" onClick={() => this.addVal(+1)}> + </button>
                <hr/>

            </div>
        )
    }
}