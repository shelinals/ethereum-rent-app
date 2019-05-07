import React, { Component } from 'react';
import { Menu, Segment, Container, Icon, Header, Grid, Input, Button, Sticky, Rail } from 'semantic-ui-react';
import { Link, Router } from '../routes';

class HeaderDesktop extends Component {

    render() {
        return(
            <React.Fragment>
                <Rail
                    internal
                    position="left"
                    attached
                    style={{ top: "auto", height: "auto", width: "100%" }}
                >
                    <Sticky context={this.props.contextRef}>
                        <Segment inverted vertical style={{ backgroundColor: '#1F5846' ,minHeight: 100, padding: '1em 0em 0em 0em', textAlign: 'flex-end'}}>
                            <Menu inverted style={{ backgroundColor: '#1F5846' }} stackable fixed='top' size='large'>
                                <Container>
                                    <Link route="/">
                                        <a className = "item">
                                            Home
                                        </a>
                                    </Link>

                                    <Menu.Menu position ="right">
                                        <Link route="/rents/lend">
                                            <a className = "item">
                                                Lend An Item
                                            </a>
                                        </Link>

                                        <Link route="/rents/manage">
                                            <a className = "item">
                                                Manage Items
                                            </a>
                                        </Link>
                                        
                                        <Link route="/rents/scancode">
                                            <a className = "item">
                                                Scan QR Code
                                            </a>
                                        </Link>

                                        <Link route="/profile/user">
                                            <a className = "item">
                                                Profile
                                            </a>
                                        </Link>
                                    </Menu.Menu>
                                </Container>
                            </Menu>
                            <Container style={{marginTop: '40px'}}>
                                <Grid inverted style={{padding: '0em 1em'}} relaxed verticalAlign='bottom'>
                                    <Grid.Column width={4}>
                                        <Header as='h3' inverted>
                                            <Icon name='ethereum' style={{float: 'left'}}/>Ethereum Rent
                                        </Header>
                                    </Grid.Column >
                                    <Grid.Column width={7} textAlign='center'>
                                        <Input icon={<Icon name='search' inverted circular link />} placeholder='Search Items...' size='small' fluid/>
                                    </Grid.Column>
                                    <Grid.Column width={5} textAlign='right'>
                                        <Button color='grey' onClick={() => Router.pushRoute(`/disputes`)}>
                                            <Icon name='warning circle'/>View List of Disputes
                                        </Button>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </Segment>
                    </Sticky>
                </Rail>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default HeaderDesktop;

