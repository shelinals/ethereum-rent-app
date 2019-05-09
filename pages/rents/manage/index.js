import React, { Component } from 'react';
import moment from 'moment';
import factory from '../../../ethereum/factory';
import Rental from '../../../ethereum/rental';
import Profile from '../../../ethereum/profile';
import web3 from '../../../ethereum/web3';
import { Card, Dimmer, Loader, Divider, Header, Button, Message, Icon, Modal, Form, Rating } from 'semantic-ui-react';
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
        rentalOpenDisputeR: [],
        rentalOpenDisputeO: [],
        borrowedOpenDisputeR: [],
        borrowedOpenDisputeO: [],
        history: [],
        historyProduct: [],
        historyOwner: [],
        historyRenter: [],
        historyRated: [],
        profileAddress: null, 
        showRatingModal: false,
        loadingRating: false,
        loader: true,
        popup: false
    };

    //client-side
    async componentDidMount() { //uses static to make initial data fetching easier, no need for rendering
        const deployedRents = await factory.methods.getDeployedRentals().call();
        const accounts = await web3.eth.getAccounts();

        const hasProfile = await factory.methods.hasProfile(accounts[0]).call();
        let history = [];
        let historyProduct = [];
        let historyOwner = [];
        let historyRenter = [];
        let historyRated = [];
        if(hasProfile) {
            var profileAddress = await factory.methods.getProfile(accounts[0]).call();
            var profile = Profile(profileAddress);
            var historyCount = await profile.methods.getHistoryCount().call();
            history = await Promise.all(
                Array(parseInt(historyCount))
                    .fill()
                    .map((element, index) => {
                        return profile.methods.historyRental(index).call();
                })
            );

            historyProduct = await Promise.all(
                Array(parseInt(historyCount))
                    .fill()
                    .map((element, index) => {
                        return Rental(history[index].productId).methods.productName().call();
                })
            );

            historyOwner = await Promise.all(
                Array(parseInt(historyCount))
                    .fill()
                    .map((element, index) => {
                        return factory.methods.getProfile(history[index].owner).call();
                })
            );

            historyRenter = await Promise.all(
                Array(parseInt(historyCount))
                    .fill()
                    .map((element, index) => {
                        return factory.methods.getProfile(history[index].renter).call();
                })
            );

            historyRated = Array(parseInt(historyCount))
                            .fill()
                            .map((element, index) => {
                                return history[index].hasRated;
                            });
        }

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

        const rentalOpenDisputeR = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.openDisputeRenter().call();
            })
        );

        const rentalOpenDisputeO = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.openDisputeOwner().call();;
            })
        );

        const rentalBorrower = await Promise.all(
                rents
                .map((address) => {
                return Rental(address).methods.renter().call();
            })
        );

        const rentalBorrowerP = await Promise.all(
                rentalBorrower
                .map((address, idx) => {
                return  (rentalStatus[idx] == 'RENTED' || rentalStatus[idx] == 'AWAITPAYMENT')? 
                            factory.methods.getProfile(address).call() : "0";
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

        const borrowedOpenDisputeR = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.openDisputeRenter().call();
            })
        );

        const borrowedOpenDisputeO = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.openDisputeOwner().call();
            })
        );

        const borrowedOwner = await Promise.all(
                borrowed
                .map((address) => {
                return Rental(address).methods.owner().call();
            })
        );

        const borrowedOwnerP = await Promise.all(
                borrowedOwner
                .map((address) => {
                return factory.methods.getProfile(address).call();;
            })
        );

        this.setState({ rents, borrowed, rentalNames, borrowedNames, rentalStatus, 
            borrowedStatus, rentalOpenDisputeR, rentalOpenDisputeO, rentalBorrower, 
            rentalBorrowerP, borrowedOpenDisputeR, borrowedOpenDisputeO, borrowedOwner, 
            borrowedOwnerP, history, historyProduct, historyOwner, historyRenter, historyRated, 
            loader: false });
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
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ethereum-rent-app.herokuapp.com/rents/${address}`;
        window.open(url, '_blank'); 
    }

    onSubmitRating = async (event) => {
        event.preventDefault();
        const {
            rating,
            rateDescription,
            selProductId,
            selOwner,
            selRenter,
            selIndex
        } = this.state;
        this.setState({ loadingRating: true, errorRating: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            if(accounts[0] == selRenter) {
                let profileOwner= await factory.methods.getProfile(selOwner).call();
                let profileRenter= await factory.methods.getProfile(selRenter).call();
                const role = web3.utils.asciiToHex('Renter',8);
                profileOwner = Profile(profileOwner);
                await profileOwner.methods.inputRating(rating, rateDescription, role, selProductId, profileRenter, selIndex).send({
                    from: accounts[0]
                 });
            } else if(accounts[0] == selOwner) {
                let profileRenter= await factory.methods.getProfile(selRenter).call();
                let profileOwner= await factory.methods.getProfile(selOwner).call();
                const role = web3.utils.asciiToHex('Owner',8);
                profileRenter = Profile(profileRenter);
                await profileRenter.methods.inputRating(rating, rateDescription, role, selProductId, profileOwner, selIndex).send({
                    from: accounts[0]
                 });
            }
            const newRatedArray = this.state.historyRated.slice();
            newRatedArray[selIndex] = true;
            this.setState({successRating: "Thank you for your rating!", showRatingModal: false, historyRated: newRatedArray});
        } catch (err) {
            this.setState({ errorRating: err.message });
        }
        this.setState({ loadingRating: false });
    }

    showRatingModal(){
        const {
            selProductName,
        } = this.state;
        return(
            <Modal
                size="small"
                open={this.state.showRatingModal}
                onClose={() => this.setState({ showRatingModal: false })}
            >
                <Modal.Header>Rate Transaction</Modal.Header>
                <Modal.Content>
                    <Form>
                        <h4>{selProductName}</h4>
                        <Divider/>
                        <Rating 
                            onRate={(e, {rating} ) => this.setState({rating})} 
                            icon='star' 
                            defaultRating={0} 
                            maxRating={5} 
                            size='massive'/>
                        <Divider />
                        <Form.TextArea
                            label='Comments' 
                            placeholder='Leave a review..'
                            onChange={event => this.setState({ rateDescription: event.target.value })} 
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive loading={this.state.loadingRating} 
                        onClick={(e) => this.onSubmitRating(e)}>
                        <Icon name='upload' />
                        Submit
                    </Button>
                </Modal.Actions>
                {this.state.errorRating && <Message attached='bottom' color='red'>
                    <Icon name='warning sign'/>
                    {this.state.errorRating}
                </Message>}
            </Modal>
        );
    }

    
    renderRents() {
        const items = this.state.rents.map((address, i) => {
            const isIDLE = this.state.rentalStatus[i] == 'IDLE' ? true : false;
            const notRented = this.state.rentalStatus[i] == 'IDLE' || this.state.rentalStatus[i] == 'PUBLISHED';
            const isRented = this.state.rentalStatus[i] == 'RENTED' || this.state.rentalStatus[i] == 'AWAITPAYMENT';
            const openDispute = this.state.rentalOpenDisputeR[i] || this.state.rentalOpenDisputeO[i];
            return (
                <Card fluid centered color='olive'>
                    <Card.Content>
                        <Button color='olive' floated='right' onClick={(e) => this.onViewQR(e, address)}>View QR Code</Button>
                        <Card.Header>
                            {this.state.rentalNames[i]}
                            {openDispute && 
                                <Button style={{marginLeft: '5px'}} basic color={this.state.rentalOpenDisputeR[i] ? 'orange' : 'brown'} 
                                    size='tiny' compact onClick={() => Router.pushRoute(`/rents/${address}/dispute`)}
                                >
                                    Ongoing dispute
                                </Button>}
                        </Card.Header>
                        <Card.Meta>
                            {"Item Status: " + this.state.rentalStatus[i]}
                            {isRented &&
                                <div style={{whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                    <span>Borrowed by</span> 
                                    <Link route={`/profile/${this.state.rentalBorrowerP[i]}`}> 
                                        <a>
                                            {this.state.rentalBorrower[i]}
                                        </a> 
                                    </Link>
                                </div>
                            }
                        </Card.Meta>
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
                                <Button color='green' onClick={(e) => this.onSubmit(e, isIDLE, address)}>{isIDLE ? 'Publish' : 'Withdraw'}</Button>
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
            const isBorrowed = this.state.borrowedStatus[i] == 'RENTED' || this.state.borrowedStatus[i] == 'AWAITPAYMENT';
            const openDispute = this.state.borrowedOpenDisputeR[i] || this.state.borrowedOpenDisputeO[i];
            return (
                <Card fluid centered color='green'>
                    <Card.Content>
                        <Card.Header>
                            {this.state.borrowedNames[i]}
                            {openDispute && 
                                <Button style={{marginLeft: '10px'}} basic color={this.state.borrowedOpenDisputeR[i] ? 'orange' : 'brown'}  
                                        size='tiny' compact onClick={() => Router.pushRoute(`/rents/${address}/dispute`)}
                                >
                                    Ongoing dispute
                                </Button>}    
                        </Card.Header>
                        <Card.Meta>
                            {"Item Status: " + this.state.borrowedStatus[i]}
                            {isBorrowed &&
                                <div style={{whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                    <span>Lent by</span> 
                                    <Link route={`/profile/${this.state.borrowedOwnerP[i]}`}> 
                                        <a>
                                            {this.state.borrowedOwner[i]}
                                        </a> 
                                    </Link>
                                </div>
                            }
                        </Card.Meta>
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

    renderHistory(){
        const items = this.state.history.map((history, index) => {
            const start = moment.unix(history.start).format('lll');
            const end = moment.unix(history.end).format('lll');
            return(
                <Card fluid centered color ='teal'>
                    <Card.Content>
                    <Button color='teal' floated='right' onClick={() => Router.pushRoute(`/rents/${history.productId}`)}>View Product Live</Button>
                        <Card.Header>
                            {this.state.historyProduct[index]}
                        </Card.Header>
                        <Card.Meta>
                            <div>{history.isOwner ? 
                                    (<React.Fragment>
                                        <span style={{whiteSpace: 'nowrap'}}> Borrowed by</span> 
                                        <Link route={`/profile/${this.state.historyRenter[index]}`}> 
                                            <a><span style={{display: 'block', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                                {history.renter}</span>
                                            </a> 
                                        </Link>
                                    </React.Fragment>)                   
                                    : (<React.Fragment>
                                        <span style={{whiteSpace: 'nowrap'}}>Lent by</span> 
                                        <Link route={`/profile/${this.state.historyOwner[index]}`}> 
                                            <a><span style={{display: 'block', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                                {history.owner}</span>
                                            </a> 
                                        </Link>
                                    </React.Fragment>)}
                            </div>
                            <div><span>{'Borrowed on ' + start + ', '}</span> 
                                 <span>{'Returned / Settled on ' + end}</span>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            {!this.state.historyRated[index] ? 
                                <Button color='yellow' loading={this.state.loadingRating} 
                                    onClick={(e) => 
                                        this.setState({showRatingModal: true, 
                                            selProductId: history.productId, 
                                            selProductName: this.state.historyProduct[index], 
                                            selOwner: history.owner, 
                                            selRenter: history.renter, 
                                            selIndex: index })
                                    }>
                                    <Icon name='star'/>
                                    {history.isOwner? 'Rate Renter' : 'Rate Owner'}
                                </Button>
                                : (<span style={{color: 'green'}}>You have rated this item.</span>)
                            }
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        });

        return <Card.Group>{items}</Card.Group>;
    }

    render() {
        const itemsRented = this.state.rents? this.state.rents.length : 0;
        const itemsBorrowed = this.state.borrowed? this.state.borrowed.length : 0;
        const itemsHistory = this.state.history? this.state.history.length : 0;

        return(
            <Layout>
                <div>
                    <Divider horizontal style={{marginTop:20}}>
                        <Header as='h4'>
                            Rented Items
                        </Header>
                    </Divider>

                    {this.renderRents()}

                    <Divider hidden /> 

                    <div style={{ marginTop: 20 }}>You are renting {itemsRented} Item(s).</div>
                </div>

                <Divider hidden /> 

                <div>
                    <Divider horizontal style={{marginTop:40}}>
                        <Header as='h4'>
                            Borrowed Items
                        </Header>
                    </Divider>

                    {this.renderBorrowed()}

                    <Divider hidden /> 

                    <div style={{ marginTop: 20 }}>You are borrowing {itemsBorrowed} Item(s).</div>
                </div>

                <Divider hidden /> 

                {(this.state.history.length > 0) && <div>
                    <Divider horizontal style={{marginTop:40}}>
                        <Header as='h4'>
                            Transaction History
                        </Header>
                    </Divider>

                    {this.renderHistory()}

                    <Divider hidden /> 

                    <div style={{ marginTop: 20 }}>You have borrowed / rented {itemsHistory} Item(s).</div>
                </div>}

                {this.showRatingModal()}

                <Divider hidden /> 
                <Divider hidden /> 

                <Dimmer active={this.state.loader} inverted style={{ position: 'fixed' }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Layout>
        );
    }
}

export default RentalManage;