import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import Routers from './router/Router';
import MyNav from './components/nav'

class App extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Router>
                        <div>
                            <MyNav/>
                            <Routers/>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
