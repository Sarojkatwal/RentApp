import React, { Component } from 'react'
import Stufflist from './src/Screens/Stufflist'
export default class Find extends Component {

    render() {
        return (
            <Stufflist {...this.props} />
        )
    }
}