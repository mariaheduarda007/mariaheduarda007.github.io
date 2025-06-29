import { render } from "@testing-library/react"
import React from "react"

export default class Mega extends React.Component {

    state = {
        title: 'Sorteando...',
        numbers: []
    }

    componentDidUpdate() {
        for (let i = 0; i < 6; i++) {
            for (let j = i + 1; j < 6; j++) {
                if (this.state.numbers[i] == this.state.numbers[j]) {
                    this.setState({
                        numbers: this.generateRandNumbers(),
                    });
                    i = j = 7;
                }
            }
        }
    }

    generateRandNumbers() {
        let arr = []

        for (let i = 0; i < 6; i++) {
            arr[i] = {
                id: 1,
                value: (Math.random() * 60).toFixed(0)
            }
        }

        return arr

    }
    componentDidMount() {

        setTimeout(() => {
            this.setState({
                title: 'Numeros sorteados:',
                numbers: this.generateRandNumbers()
            })
        }, 3000);

    }

    render() {
        return (
            <div>
                <h1> {this.state.title} </h1>
                {
                    this.state.numbers.map(num => 
                        <h5 key={num.id} style={{ display: 'inline' }}>
                            {num.value} &nbsp; </h5>

                    )
                }               

            </div>
        )
    }
}


