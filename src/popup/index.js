
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Button from 'antd/es/button';
// import App from './app';
import './index.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                {/* <Button type="primary">Button</Button> */}
                hello
                <Button type="primary">Button</Button>
        </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById("root"));