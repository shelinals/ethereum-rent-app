import React, { Component } from 'react';
import {
    Form, 
    Message, 
    Card, 
    Grid, 
    Button, 
    Header, 
    Icon, 
    Segment, 
    Divider, 
    Rating, 
    Label,
    Modal, 
    GridColumn
} from 'semantic-ui-react';
import moment from 'moment';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import Rental from '../../ethereum/rental';
import Profile from '../../ethereum/profile';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class RentalShow extends Component {

    state = {
        errorMessagePublish: '',
        successMessagePublish: '',
        loadingPublish: false,
        disabledPublish: false,
        errorMessageWithdraw: '',
        successMessageWithdraw: '',
        loadingWithdraw: false,
        disabledWithdraw: false,
        errorMessageRent: '',
        successMessageRent: '',
        loadingRent: false,
        disabledRent: false,
        errorMessagePayment: '',
        successMessagePayment: '',
        loadingPayment: false,
        disabledPayment: false,
        errorMessageOverdue: '',
        successMessageOverdue: '',
        loadingOverdue: false,
        disabledOverdue: false,
        successRating: '',
        errorRating: '',
        loadingRating: false,
        inputRatingButton: false,
        showRatingModal: false,
        loading: true,
        isOwner: false,
        isRenter: false
    };

    static async getInitialProps(props) {
        const rent = Rental(props.query.address);
        const inState = await rent.methods.getState().call();
        const summary = await rent.methods.getSummary().call();
        const time = await rent.methods.getTime().call();
        const profile = await factory.methods.getProfile(summary[5]).call();
        const totalFee = await rent.methods.totalRentingFee().call();
        const allowOverdue = await rent.methods.allowOverdue().call();
        const openDispute = await rent.methods.openDispute().call();
        return { 
            address: props.query.address,
            inState: inState,
            productName: summary[0],
            description: summary[1],
            rentalFee: web3.utils.fromWei(summary[2], 'ether'),
            deposit: web3.utils.fromWei(summary[3], 'ether'),
            maxDuration: summary[4],
            owner: summary[5],
            renter: summary[6],
            time: time,
            profile: profile,
            totalFee: web3.utils.fromWei(totalFee, 'ether'),
            allowOverdue: allowOverdue,
            openDispute: openDispute
        };
    }


    // state = {
    //     errorMessage: '',
    //     successMessage: '',
    //     loading: false,
    //     disabled: false,
    //     isOwner: false
    // }

    // static async getInitialProps(props) { //uses static to make initial data fetching easier, no need for rendering
    //     const rent = Rental(props.query.address);
    //     const summary = await rent.methods.getSummary().call();
    //     const profile = await factory.methods.getProfile(summary[5]).call();
    //     return { 
    //         address: props.query.address,
    //         productName: summary[0],
    //         description: summary[1],
    //         rentalFee: web3.utils.fromWei(summary[2], 'ether'),
    //         deposit: web3.utils.fromWei(summary[3], 'ether'),
    //         maxDuration: summary[4],
    //         owner: summary[5],
    //         profile: profile
    //      };
    // }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        if(accounts[0] == this.props.owner){
            this.setState({ isOwner: true });
        }else if(accounts[0] == this.props.renter){
            this.setState({ isRenter :true });
        }

        this.setState({ loading:false });
    }

    onSubmitPublish = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingPublish: true, errorMessagePublish: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.publish().send({
                from: accounts[0]
            });

            this.setState({ disabledPublish: true, 
                successMessagePublish: "You have published the item. You can manage your item(s) in the 'Manage Items' tab" });
        } catch (err) {
            this.setState({ errorMessagePublish: err.message });
        }
        this.setState({ loadingPublish: false });
    }

    onSubmitWithdraw = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingWithdraw: true, errorMessageWithdraw: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.cancelled().send({
                from: accounts[0]
            });

            this.setState({ disabledWithdraw: true, 
                successMessageWithdraw: "You have withdrawn the item. You can manage your item(s) in the 'Manage Items' tab" });
        } catch (err) {
            this.setState({ errorMessageWithdraw: err.message });
        }
        this.setState({ loadingWithdraw: false });
    }

    onSubmitRent = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingRent: true, errorMessageRent: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.rentItem().send({
                from: accounts[0],
                value: web3.utils.toWei(this.props.deposit, 'ether')
            });

            this.setState({ disabledRent: true, 
                successMessageRent: "You have borrowed the item. You can manage your item(s) in the 'Manage Items' tab" });
        } catch (err) {
            this.setState({ errorMessageRent: err.message });
        }
        this.setState({ loadingRent: false });
    }

    onSubmitPayment = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);
        const successMessage = this.state.isOwner? "Action successful. Awaiting payment from renter." : 
                                                  "Transaction successful."

        this.setState({ loadingPayment: true, errorMessagePayment: '', errorMessageOverdue: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            if(this.state.isOwner) {
                await rent.methods.reclaimItem().send({
                    from: accounts[0]
                });
            } else {
                let payableFee = web3.utils.toWei(this.props.totalFee,'ether');
                await rent.methods.returnItem().send({
                    from: accounts[0],
                    value: payableFee
                });
                this.setState({ inputRatingButton: true, showRatingModal: true });
            }
            this.setState({ disabledPayment: true, successMessagePayment: successMessage });
        } catch (err) {
            this.setState({ errorMessagePayment: err.message });
        }
        this.setState({ loadingPayment: false });
    }

    onSubmitOverdue = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingOverdue: true, errorMessagePayment: '', errorMessageOverdue: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.chargeOverdueItem().send({
                from: accounts[0]
            });

            this.setState({ disabledOverdue: true, disabledPayment: true, 
                successMessageOverdue: "Action successful. Deposit received. This item will be deleted." });
        } catch (err) {
            this.setState({ errorMessageOverdue: err.message });
        }
        this.setState({ loadingOverdue: false });
    }

    onSubmitRating = async (event) => {
        event.preventDefault();

        const profile = Profile(this.props.profile);
        const {rating, rateDescription} = this.state;

        this.setState({ loadingRating: true, errorRating: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await profile.methods.inputRating(rating, accounts[0], rateDescription, this.props.address).send({
               from: accounts[0]
            });

            this.setState({successRating: "Thank you for your rating!", inputRatingButton: false, showRatingModal: false})
        } catch (err) {
            this.setState({ errorRating: err.message });
        }
        this.setState({ loadingRating: false });
    }

    renderCards() {
        const {
            address,
            productName,
            description,
            rentalFee,
            deposit,
            maxDuration,
            owner,
            profile
        } = this.props;

        const items = [
            {
                header: productName,
                meta: 'Product Name',
                description: description,
            },
            {
                header: address,
                meta: 'Product ID',
                description: 'A unique product ID attached to this product',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: owner,
                meta: 'Address of Owner',
                description: (
                    <React.Fragment>
                        <Link route={`/profile/${profile}`}> 
                            <a>View Profile</a> 
                        </Link>
                        <p>The owner created the contract and specified the details of the rent</p>
                    </React.Fragment>
                ),
                style: { overflowWrap: 'break-word' }
            },
            {
                header: ((rentalFee * 60 * 60).toFixed(4)).toString(),
                meta: 'Rental Fee (ether per hour)',
                description: 'The rental fee per hour. The total rental fee will be automatically calculated per second basis'
            },
            {
                header: deposit,
                meta: 'Deposit (ether)',
                description: 'The borrower need to pay the specified amount of deposit fee to the contract. The deposit will be credited back to the borrower after the item is returned'
            },
            {
                header: (parseFloat(maxDuration) / 60 / 60).toFixed(2).toString(),
                meta: 'Maximum Duration to Rent (hour(s))',
                description: 'The maximum hour(s) available to rent. The deposit will be released to the owner if the borrower fails to return the item before the specified hours'
            }
        ];

        return <Card.Group centered items={items} />;
    }

    renderOptions(){
        const isOwner = this.state.isOwner;
        const isRenter = this.state.isRenter;
        const { inState } = this.props;

        if(inState === 'IDLE'){
            if(isOwner) {
                return(
                    <Grid.Row centered>
                        <Form onSubmit={this.onSubmitPublish} error={!!this.state.errorMessagePublish} success={!!this.state.successMessagePublish}>
                            <Form.Field>
                                <label>You are the owner of this item.</label>
                                <Button primary loading={this.state.loadingPublish} disabled={this.state.disabledPublish}>
                                    Publish This Item
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessagePublish}/>
                            <Message success header="Success!" content={this.state.successMessagePublish}/>
                        </Form>
                    </Grid.Row>
                );
            }
        }else if(inState === 'PUBLISHED'){
            if(isOwner) {
                return(
                    <Grid.Row centered>
                        <Form onSubmit={this.onSubmitWithdraw} error={!!this.state.errorMessageWithdraw} success={!!this.state.successMessageWithdraw}>
                            <Form.Field>
                                <label>You are the owner of this item.</label>
                                <Button primary loading={this.state.loadingWithdraw} disabled={this.state.disabledWithdraw}>
                                    Withdraw This Item
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessageWithdraw}/>
                            <Message success header="Success!" content={this.state.successMessageWithdraw}/>
                        </Form>
                    </Grid.Row>
                );
            } else {
                return(
                    <Grid.Row centered>
                        <Form onSubmit={this.onSubmitRent} error={!!this.state.errorMessageRent} success={!!this.state.successMessageRent}>
                            <Form.Field>
                                <label>The deposit of {this.props.deposit} ether will be deducted from your account.</label>
                                <Button primary loading={this.state.loadingRent} disabled={this.state.disabledRent}>
                                    Borrow This Item
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessageRent}/>
                            <Message success header="Success!" content={this.state.successMessageRent}/>
                        </Form>
                    </Grid.Row>
                );
            }
        }else if(inState === 'RENTED' || inState === 'AWAITPAYMENT'){
            if(isOwner) {
                const overdueMessage1 = this.props.allowOverdue ? 'Retrieve deposit from overdue item' : 'You cannot claim the item yet';
                const timeToOverdue = moment.unix(parseInt(this.props.time[0]) + parseInt(this.props.time[2])).fromNow(true);
                const overdueMessage2 = this.props.openDispute ? 'A dispute is ongoing' : 
                                             ( <React.Fragment>Please try again in <span style={{color: 'red'}}>{timeToOverdue.toUpperCase()}</span></React.Fragment>);
                return(
                    <React.Fragment>
                        <Grid.Row centered>
                            <Form onSubmit={this.onSubmitPayment} error={!!this.state.errorMessagePayment} success={!!this.state.successMessagePayment}>
                                <Form.Field>
                                    <label>Received item from borrower and request for payment</label>
                                    <Button primary loading={this.state.loadingPayment} disabled={this.state.disabledPayment || this.props.inState === "AWAITPAYMENT"}>
                                        Item Received
                                    </Button>
                                </Form.Field>

                                <Message error header="Oops!" content={this.state.errorMessagePayment}/>
                                <Message success header="Success!" content={this.state.successMessagePayment}/>
                            </Form>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Form onSubmit={this.onSubmitOverdue} error={!!this.state.errorMessageOverdue} success={!!this.state.successMessageOverdue}>
                                <Form.Field>
                                    <label>
                                        {overdueMessage1}
                                        {!this.props.allowOverdue && 
                                            <div>{overdueMessage2}</div>
                                        }
                                    </label>
                                    <Button primary loading={this.state.loadingOverdue} disabled={this.state.disabledOverdue? this.state.disabledOverdue : !this.props.allowOverdue}>
                                        Claim Overdue Item
                                    </Button>
                                </Form.Field>

                                <Message error header="Oops!" content={this.state.errorMessageOverdue}/>
                                <Message success header="Success!" content={this.state.successMessageOverdue}/>
                            </Form>
                        </Grid.Row>
                    </React.Fragment>
                );
            } else if(inState === 'AWAITPAYMENT' && isRenter){
                return(
                    <React.Fragment>
                        <Grid.Row centered>
                            <Form onSubmit={this.onSubmitPayment} error={!!this.state.errorMessagePayment} success={!!this.state.successMessagePayment}>
                                <Form.Field>
                                    <label>Pay rent fees and retrieve deposit</label>
                                    <Button primary loading={this.state.loadingPayment} disabled={this.state.disabledPayment}>
                                        Pay Rent
                                    </Button>
                                </Form.Field>

                                <Message error header="Oops!" content={this.state.errorMessagePayment}/>
                                <Message success header="Success!" content={this.state.successMessagePayment}/>
                            </Form>
                        </Grid.Row>

                        {this.showRatingModal()}

                        {this.state.inputRatingButton && <Grid.Row centered>
                            <Button color='yellow' loading={this.state.loadingRating} onClick={() => this.setState({ showRatingModal: true })}>
                                <Icon name='star' />
                                Input Rating
                            </Button>
                        </Grid.Row>}

                        <Grid.Row centered>
                            {this.state.successRating && <Message color='yellow' size='large'><Icon name='checkmark'/>{this.state.successRating}</Message>}
                            {this.state.errorRating && <Message color='red' size='large'><Icon name='warning sign'/>{this.state.errorRating}</Message>}
                        </Grid.Row>
                    </React.Fragment>
                );
            }
        }else if(inState === 'DELETED'){
            return(
                <Grid.Row centered>
                    <Message color='red' compact
                        icon="remove circle"
                        header="This item is no longer available"
                    />
                </Grid.Row>
            );
        }
    }

    showRatingModal(){

        return(
            <Modal
                size="small"
                open={this.state.showRatingModal}
                onClose={() => this.setState({ showRatingModal: false })}
            >
                <Modal.Header>Rate Item</Modal.Header>
                <Modal.Content>
                    <Form>
                        <h4>{this.props.productName}</h4>
                        <Divider />
                        <Rating 
                            onRate={(e, {rating} ) => this.setState({rating})} 
                            icon='star' 
                            defaultRating={0} 
                            maxRating={5} 
                            size='massive'/>
                        <Divider />
                        <Form.TextArea 
                            label='Comments' 
                            placeholder='Tell us more about the item'
                            onChange={event => this.setState({ rateDescription: event.target.value })} 
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive loading={this.state.loadingRating} onClick={(e) => this.onSubmitRating(e)}>
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

    showSummary() {
        return(
            <Message compact
                header="Here is the summary of the rent"
                content={"Payable : ~" + parseFloat(this.props.totalFee).toFixed(4) + " ether"}
            />  
        );
    }
    
    render() {
        console.log('totalRentingFee ' + this.props.totalFee);
        const showSummary = this.state.isRenter && this.props.inState === "AWAITPAYMENT";
        const createDispute = this.state.isRenter && this.props.inState === "RENTED" && !this.props.openDispute;
        const showTimeDetails = this.props.inState === "RENTED" || this.props.inState === "AWAITPAYMENT";
        const borrowedSince = moment.unix(this.props.time[0]).format('dddd, Do MMMM YYYY, h:mm:ss a');
        const overdueTime = moment.unix(parseInt(this.props.time[0]) + parseInt(this.props.time[2])).format('dddd, Do MMMM YYYY, h:mm:ss a');

        return(
            <Layout>
                {createDispute && <Button primary floated='right' onClick={() => Router.pushRoute(`/rents/${this.props.address}/dispute/new`)}>Create Dispute</Button>}
                {this.props.openDispute && <Button as='div' labelPosition='left' floated='right' onClick={() => Router.pushRoute(`/rents/${this.props.address}/dispute`)}>
                    <Label basic color='red' pointing='right'>
                        View ongoing dispute
                    </Label>
                    <Button color='red'>
                        <Icon name='warning circle' />
                        Open Dispute
                    </Button>
                </Button>}

                <h3>Product Details</h3>

                {showTimeDetails && <Grid>
                    <Grid.Row columns='2' verticalAlign='middle'>
                        <Grid.Column>
                            Borrowed since {borrowedSince}
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            <Message color='yellow' compact size='tiny'
                                header={'Overdue Time: ' + overdueTime}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>}

                <Divider hidden/>

                <Segment placeholder>
                    <Header icon>
                    <Icon name='images outline' />
                        No photos for this item.
                    </Header>
                </Segment>

                <Divider hidden/>

                <Grid>
                    <Grid.Row>
                        {this.renderCards()}
                    </Grid.Row>

                    <Divider hidden/>

                    {showSummary && <Grid.Row centered>
                        {this.showSummary()}
                    </Grid.Row>}

                    <Divider hidden/>

                    {this.renderOptions()}
                </Grid>

                <Divider hidden/>
            </Layout> 
        );
    }
}

export default RentalShow;