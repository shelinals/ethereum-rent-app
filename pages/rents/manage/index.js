import React, { Component } from 'react';
import factory from '../../../ethereum/factory';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { Card, Dimmer, Loader, Divider, Header, Button, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';

class RentalManage extends Component {

    state = {
        rents: [],
        borrowed: [],
        rentalNames: [],
        borrowedNames: [],
        rentalStatus: [],
        borrowedStatus: [],
        rentalOpenDispute: [],
        borrowedOpenDispute: [],
        loader: true,
        popup: false
    };

    //client-side
    async componentDidMount() { //uses static to make initial data fetching easier, no need for rendering
        const deployedRents = await factory.methods.getDeployedRentals().call();
        const accounts = await web3.eth.getAccounts();
        let rents = [];
        let borrowed = [];

        for (let i=0; i<deployedRents.length; i++){
            if(await Rental(deployedRents[i]).methods.owner().call() === accounts[0] && 
                await Rental(deployedRents[i]).methods.getState().call() !== 'DELETED'){
                rents.push(deployedRents[i]);
            } else if (await Rental(deployedRents[i]).methods.renter().call() === accounts[0] &&
                await Rental(deployedRents[i]).methods.getState().call() !== 'DELETED' && 
                await Rental(deployedRents[i]).methods.getState().call() !== 'IDLE' &&
                await Rental(deployedRents[i]).methods.getState().call() !== 'PUBLISHED'){
                borrowed.push(deployedRents[i]);
            }
        }
        
        const rentalNames = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.productName().call();
            })
        );

        const rentalStatus = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.getState().call();
            })
        );

        const rentalOpenDispute = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.openDispute().call();
            })
        );

        const borrowedNames = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.productName().call();
            })
        );

        const borrowedStatus = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.getState().call();
            })
        );

        const borrowedOpenDispute = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.openDispute().call();
            })
        );

        this.setState({ rents, borrowed, rentalNames, borrowedNames, rentalStatus, 
            borrowedStatus, rentalOpenDispute, borrowedOpenDispute, loader: false });
    }

    onRemove = async (event, address) => {
        event.preventDefault();

        const rent = Rental(address);

        this.setState({ loader: true, popup: false });

        try{
            const accounts = await web3.eth.getAccounts();
            await rent.methods.deleted().send({
                from: accounts[0]
            });

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    onSubmit = async (event, isIDLE, address) => {
        event.preventDefault();

        const rent = Rental(address);

        this.setState({ loader: true, popup: false });

        try{
            const accounts = await web3.eth.getAccounts();

            if(isIDLE) {
                await rent.methods.publish().send({
                    from: accounts[0]
                });
            } else {
                await rent.methods.cancelled().send({
                    from: accounts[0]
                });
            } 

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    onViewQR = (event, address) => {
        event.preventDefault();
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/rents/${address}`;
        window.open(url, '_blank'); 
    }
    
    renderRents() {
        const items = this.state.rents.map((address, i) => {
            const isIDLE = this.state.rentalStatus[i] == 'IDLE' ? true : false;
            const notRented = this.state.rentalStatus[i] == 'IDLE' || this.state.rentalStatus[i] == 'PUBLISHED';
            return (
                <Card fluid>
                    <Card.Content>
                        <Button primary floated='right' onClick={(e) => this.onViewQR(e, address)}>View QR Code</Button>
                        <Card.Header>
                            {this.state.rentalNames[i]}
                            {this.state.rentalOpenDispute[i] && 
                                <Button style={{marginLeft: '10px'}} basic color='orange' size='tiny' compact
                                    onClick={() => Router.pushRoute(`/rents/${address}/dispute`)}
                                >
                                    Ongoing dispute
                                </Button>}
                        </Card.Header>
                        <Card.Meta>{"Item Status: " + this.state.rentalStatus[i]}</Card.Meta>
                        <Card.Description>
                            <Link route={`/rents/${address}`}> 
                                <a>Manage Item</a> 
                            </Link>
                        </Card.Description>
                    </Card.Content>
                    { notRented &&
                        <Card.Content>
                            <Button.Group>
                                <Button onClick={(e) => this.onRemove(e, address)}>Remove</Button>
                                <Button.Or />
                                <Button positive onClick={(e) => this.onSubmit(e, isIDLE, address)}>{isIDLE ? 'Publish' : 'Withdraw'}</Button>
                            </Button.Group>
                        </Card.Content> 
                    }
                </Card>
            );
        });

        return <Card.Group>{items}</Card.Group>;
    }

    renderBorrowed() {
        const items = this.state.borrowed.map((address, i) => {
            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {this.state.borrowedNames[i]}
                            {this.state.borrowedOpenDispute[i] && 
                                <Button style={{marginLeft: '10px'}} basic color='orange' size='tiny' compact
                                    onClick={() => Router.pushRoute(`/rents/${address}/dispute`)}
                                >
                                    Ongoing dispute
                                </Button>}    
                        </Card.Header>
                        <Card.Meta>{"Item Status: " + this.state.borrowedStatus[i]}</Card.Meta>
                        <Card.Description>
                            <Link route={`/rents/${address}`}> 
                                <a>Manage Item</a> 
                            </Link>
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        });

        return <Card.Group>{items}</Card.Group>;
    }

    render() {
        const itemsRented = this.state.rents? this.state.rents.length : 0;
        const itemsBorrowed = this.state.rents? this.state.borrowed.length : 0;

        return(
            <Layout>
                <div>
                    <Divider horizontal style={{marginTop:40}}>
                        <Header as='h4'>
                            Rented Items
                        </Header>
                    </Divider>

                    {this.renderRents()}

                    <div style={{ marginTop: 20 }}>You have rented {itemsRented} Item(s).</div>
                </div>

                <div>
                    <Divider horizontal style={{marginTop:40}}>
                        <Header as='h4'>
                            Borrowed Items
                        </Header>
                    </Divider>

                    {this.renderBorrowed()}

                    <div style={{ marginTop: 20 }}>You have borrowed {itemsBorrowed} Item(s).</div>
                </div>

                <Divider hidden /> 

                <Dimmer active={this.state.loader} inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Layout>
        );
    }
}

export default RentalManage;