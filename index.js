import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    // constructor(props) {
    //     super(props);

    //     // THIS IS THE ONLY TIME we do direct assignment
    //     // to this.state
    //     this.state = { lat: null, errorMessage: '' };
    // }

    // this is equivalent to the constructor above
    state = { lat: null, errorMessage: '' };

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }
        
        return <Spinner message="Please accept location request" />
        // return <Spinner  />
    }

    render() {
        return (
            // no real red border, but this allows a single div here instead of three divs in renderContent()
            <div className="border red">
                {this.renderContent()}
            </div>
        )        
    }
}

ReactDOM.render(
    <App />, 
    document.querySelector('#root')
);
