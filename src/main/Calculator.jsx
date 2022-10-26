import React, { Component } from 'react'
import './Calculator.css'

import Bottun from '../components/Button'
import Display from '../components/Display'


const initeState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    value: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initeState }

    constructor(props) {
        super(props)
        this.addNumero = this.addNumero.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setAc = this.setAc.bind(this)
    }

    addNumero(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const value = [...this.state.value]
            value[i] = newValue
            this.setState({ value })

            console.log(value)
        }

    }
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({
                operation,
                current: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const value = [...this.state.value]
            try {
                value[0] = eval(`${value[0]} ${currentOperation} ${value[1]}`)
            } catch(e) {
                value[0] = this.state.value[0]
            }
            value[1] = 0

            this.setState({
                displayValue: value[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                value
            })
        }
    }
    setAc() {
        this.setState({ ...initeState })
    }


    render() {
        return (
            <div className="calculator">

                <Display value={this.state.displayValue} />
                <Bottun click={this.setAc} label="AC" triple />
                <Bottun click={this.setOperation} label="/" operation />
                <Bottun click={this.addNumero} label="9" />
                <Bottun click={this.addNumero} label="8" />
                <Bottun click={this.addNumero} label="7" />
                <Bottun click={this.setOperation} label="*" operation />
                <Bottun click={this.addNumero} label="6" />
                <Bottun click={this.addNumero} label="5" />
                <Bottun click={this.addNumero} label="4" />
                <Bottun click={this.setOperation} label="-" operation />
                <Bottun click={this.addNumero} label="3" />
                <Bottun click={this.addNumero} label="2" />
                <Bottun click={this.addNumero} label="1" />
                <Bottun click={this.setOperation} label="+" operation />
                <Bottun click={this.addNumero} label="0" double />
                <Bottun click={this.addNumero} label="." />
                <Bottun click={this.setOperation} label="=" operation />

            </div>
        )
    }
}