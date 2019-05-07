import React, { Component } from 'react';
import { Menu, Segment, Container, Icon, Header, Grid, Input, Button, Sticky, Rail, Sidebar } from 'semantic-ui-react';
import { Link, Router } from '../routes';

class HeaderMobile extends Component {
    state = {};

    render() {
        const { 
            handleSidebarHide, 
            handleToggle,
            sidebarOpened,
            children
        } = this.props;

        return(
            <React.Fragment>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        inverted
                        onHide={handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                        width='thin'
                        icon='labeled'
                        style={{backgroundColor: '#1F5846'}}
                    >
                        <Menu.Item header>
                            <h3>Ethereum Rent</h3>
                        </Menu.Item>

                        <Link route="/">
                            <a className = "item">
                                <Icon name='home'/>
                                Home
                            </a>
                        </Link>

                        <Link route="/rents/lend">
                            <a className = "item">
                                <Icon name='plus circle'/>
                                Lend An Item
                            </a>
                        </Link>

                        <Link route="/rents/manage">
                            <a className = "item">
                                <Icon name='edit'/>
                                Manage Items
                            </a>
                        </Link>
                        
                        <Link route="/rents/scancode">
                            <a className = "item">
                                <Icon name='qrcode'/>
                                Scan QR Code
                            </a>
                        </Link>

                        <Link route="/profile/user">
                            <a className = "item">
                                <Icon name='user'/>
                                Profile
                            </a>
                        </Link>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={sidebarOpened} style={{minHeight: '100vh'}}>
                        <Rail
                            internal
                            position="left"
                            attached
                            style={{ top: "auto", height: "auto", width: "100%" }}
                        >
                            <Sticky context={this.props.contextRef}>
                                <Segment inverted vertical style={{ backgroundColor: '#1F5846', minHeight: 50 , padding: '1em 0em 0em 0em', textAlign: 'flex-end'}}>
                                    <Menu inverted style={{backgroundColor: '#1F5846'}}fixed='top' size='large' secondary>
                                        <Container>
                                            <Menu.Item onClick={handleToggle}>
                                                <Icon name='sidebar' />
                                            </Menu.Item>

                                            <Menu.Item header style={{padding: 0}}>
                                                <Icon name='ethereum' style={{float: 'left'}}/>
                                                Ethereum Rent
                                            </Menu.Item>

                                            <Menu.Item position='right'>
                                                <Button as='a' inverted onClick={() => Router.pushRoute(`/rents/scancode`)}>
                                                    Scan QR Code
                                                </Button>
                                            </Menu.Item>
                                        </Container>
                                    </Menu>
                                    <Container style={{marginTop: '40px'}}>
                                        <Grid inverted style={{padding: '0em 0.7em 0em 1.5em'}} verticalAlign='bottom'>
                                            <Grid.Row>
                                                <Menu secondary inverted fluid>
                                                    <Menu.Item>
                                                        <Input icon={<Icon name='search' inverted circular link />} placeholder='Search Items...' size='mini' /> 
                                                    </Menu.Item>

                                                    <Menu.Item position='right' fitted>
                                                        <Button color='grey' size='mini' onClick={() => Router.pushRoute(`/disputes`)}>
                                                            <Icon name='warning circle'/>Disputes
                                                        </Button>
                                                    </Menu.Item>
                                                </Menu>
                                            </Grid.Row>
                                        </Grid>
                                    </Container>
                                </Segment>
                            </Sticky>
                        </Rail>
                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </React.Fragment>
        );
    }
}

export default HeaderMobile;

