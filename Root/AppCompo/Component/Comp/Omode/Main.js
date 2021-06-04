import React, { Component } from 'react'
import Stufflist from './src/Screens/Stufflist'

export default class Main extends Component {
    render() {
        return (
            < Stufflist {...this.props} />
        )
    }
}
