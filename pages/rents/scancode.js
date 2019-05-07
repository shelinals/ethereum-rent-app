import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
if (typeof window != 'undefined') {
    var QrReader  = require('react-qr-reader');
}

class ScanCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enable: false,
          delay: 300
        };
    }

    componentDidMount(){
        this.setState({ enable: true });
    }

    handleScan(data) {
        if (data) {
          const address = data.replace("https://ethereum-rent-app.herokuapp.com/rents/","");
          Router.pushRoute(`/rents/${address}`);
        }
    }

    handleError(err) {
        console.log(err);
    }

    render() {
        return (
            <Layout>
                <h3>
                    Scan Code
                </h3>
                <div>
                    {this.state.enable ? 
                        (<div>
                            <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan.bind(this)}
                            style={{ maxWidth: '500px', margin: 'auto' }}
                            />
                        </div>) : null
                    }
                </div>
            </Layout>
        );
    }
}

export default ScanCode;