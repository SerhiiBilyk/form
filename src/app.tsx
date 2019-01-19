import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class App extends Component<any,any>{
     render(){
        return <p><Link to="hello">To </Link></p>
    }
}