import React, { Component } from 'react';
import Layout from '../../components/Layout';
if (typeof window != 'undefined') {
    var QrReader  = require('react-qr-reader');
}

class ScanCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enable: false,
          delay: 300,
          result: "No result"
        };
    }

    componentDidMount(){
        this.setState({ enable: true });
    }

    handleScan(data) {
        if (data) {
          window.location.href = data;
          this.setState({
            result: data
          });
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
                            <p>{this.state.result}</p>
                        </div>) :
                        <p>{this.state.result}</p>
                    }
                </div>
            </Layout>
        );
    }
}

export default ScanCode;