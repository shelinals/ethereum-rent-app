import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';
import { Container, Responsive, Sidebar } from 'semantic-ui-react';
import Head from 'next/head';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { getWidthFactory } from '../utils/device';

class DesktopContainer extends Component {
    state = {}

    render() {
        const { getWidth, contextRef, children } = this.props;

        return(
            <Responsive fireOnMount getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <HeaderDesktop contextRef={contextRef}>
                    <Container style={{ paddingTop: "10em" }}>
                        {children} 
                    </Container> 
                </HeaderDesktop>
            </Responsive>
        );
    }
}

class MobileContainer extends Component {
    state = { sidebarOpened: false };

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { getWidth, contextRef, children } = this.props;

        return(
            <Responsive fireOnMount as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
                <HeaderMobile contextRef={contextRef} 
                            handleSidebarHide={this.handleSidebarHide} 
                            handleToggle={this.handleToggle}
                            sidebarOpened={this.state.sidebarOpened}>
                    <Container style={{ paddingTop: "10em" }}>
                        {children} 
                    </Container> 
                </HeaderMobile>
            </Responsive>
        );
    }
}

class Layout extends Component {
    state = {};

    static async getInitialProps({ req }) {
        let isMobileFromSSR = false;

        if(req){
            const device = req.headers["user-agent"];
            const md = new MobileDetect(device);
            isMobileFromSSR = !!md.mobile();
        }

        return { isMobileFromSSR };
    }

    handleContextRef = contextRef => this.setState({ contextRef });

    render(){
        return(
            <React.Fragment>
                <Head>
                    <link 
                        rel="stylesheet" 
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <div ref={this.handleContextRef}>
                    <DesktopContainer contextRef={this.state.contextRef} getWidth={getWidthFactory(this.props.isMobileFromSSR)}>
                        {this.props.children} 
                    </DesktopContainer>

                    <MobileContainer contextRef={this.state.contextRef} getWidth={getWidthFactory(this.props.isMobileFromSSR)}>
                        {this.props.children}
                    </MobileContainer>
                </div>     
            </React.Fragment>
        );
    }
}

export default Layout;