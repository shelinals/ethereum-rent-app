import React, { Component } from 'react';
import { Form, Message, Card, Grid, Button, Modal, Icon, Divider, Rating, Label } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import factory from '../../../ethereum/factory';
import Rental from '../../../ethereum/rental';
import Profile from '../../../ethereum/profile';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RentalShow extends Component {
    state = {
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
        showInputRating: false,
    }

    static async getInitialProps(props) { //uses static to make initial data fetching easier, no need for rendering
        const rent = Rental(props.query.address);
        const summary = await rent.methods.getSummary().call();
        const profile = await factory.methods.getProfile(summary[5]).call();
        const totalFee = await rent.methods.calculateFee().call();
        const allowOverdue = await rent.methods.allowOverdue().call();
        const inState = await rent.methods.getState().call();
        const openDispute = await rent.methods.openDispute().call();
        return { 
            inRent: props.query.manage === "rent",
            address: props.query.address,
            totalFee: web3.utils.fromWei(totalFee, 'ether'),
            inState: inState,
            allowOverdue: allowOverdue,
            productName: summary[0],
            description: summary[1],
            rentalFee: web3.utils.fromWei(summary[2], 'ether'),
            deposit: web3.utils.fromWei(summary[3], 'ether'),
            maxDuration: summary[4],
            owner: summary[5],
            profile: profile,
            openDispute: openDispute
        };
    }

    onSubmitPayment = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);
        const successMessage = this.props.inRent? "Action successful. Awaiting payment from renter." : 
                                                  "Transaction successful."

        this.setState({ loadingPayment: true, errorMessagePayment: '', errorMessageOverdue: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            if(this.props.inRent) {
                await rent.methods.reclaimItem().send({
                    from: accounts[0]
                });
            } else {
                let totalFee = await rent.methods.totalRentingFee().call();
                let payableFee = web3.utils.toWei(totalFee,'ether');
                await rent.methods.returnItem().send({
                    from: accounts[0],
                    value: payableFee
                });
            }
            this.setState({ disabledPayment: true, disabledOverdue: true, successMessagePayment: successMessage, inputRatingButton: true, showInputRating: true });
        } catch (err) {
            this.setState({ errorMessagePayment: err.message });
        }

        this.setState({ loadingPayment: false });
    }


    onSubmitOverdue = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingPayment: true, errorMessagePayment: '', errorMessageOverdue: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.chargeOverdueItem().send({
                from: accounts[0]
            });

            this.setState({ disabledOverdue: true, disabledPayment: true, successMessageOverdue: "Action successful. Deposit received. This item will be deleted." });
        } catch (err) {
            this.setState({ errorMessageOverdue: err.message });
        }

        this.setState({ loadingOverdue: false });
    }

    onSubmitRating = async (event) => {
        event.preventDefault();

        const profile = Profile(this.props.profile);
        const {rating, rateDescription} = this.state;

        this.setState({ loadingRating: '', errorRating: ''});

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
            owner
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
                description: 'The owner created the contract and specified the details of the rent',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: ((rentalFee * 60 * 60).toFixed(5)).toString(),
                meta: 'Rental Fee (ether per hour)',
                description: 'The rental fee per hour. The total rental fee will be automatically calculated per second basis'
            },
            {
                header: deposit,
                meta: 'Deposit (ether)',
                description: 'The borrower need to pay the specified amount of deposit fee to the contract. The deposit will be credited back to the borrower after the item is returned'
            },
            {
                header: (parseInt(maxDuration) / 60 / 60).toString(),
                meta: 'Maximum Duration to Rent (hour(s))',
                description: 'The maximum hour(s) available to rent. The deposit will be released to the owner if the borrower fails to return the item before the specified hours'
            }
        ];

        return <Card.Group centered items={items} />;
    }

    showSummary() {
        const totalFee = this.props.totalFee;
        return(
            <Message
                icon="file alternate outline"
                header="Here is the summary of the rent"
                content={"Payable : ~" + parseInt(totalFee).toFixed(2) + " ether"}
            />
        );
    }

    renderOptions(){
        if((this.props.inState === "RENTED" || this.props.inState === "AWAITPAYMENT") && this.props.inRent){
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
                                <label>Retrieve deposit from overdue item</label>
                                <Button primary loading={this.state.loadingOverdue} disabled={this.state.disabledOverdue? this.state.disabledOverdue : this.props.allowOverdue}>
                                    Claim Overdue Item
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessageOverdue}/>
                            <Message success header="Success!" content={this.state.successMessageOverdue}/>
                        </Form>
                    </Grid.Row>
                </React.Fragment>
            );
        }else if(this.props.inState === "AWAITPAYMENT" && !this.props.inRent){
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
                        <Button color='yellow' loading={this.state.loadingRating} onClick={() => this.setState({ showInputRating: true })}>
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
    }

    showRatingModal(){

        return(
            <Modal
                size="small"
                open={this.state.showInputRating}
                onClose={() => this.setState({ showInputRating: false })}
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
                    <Button positive loading={this.state.loadingRating} onClick={(e) => this.onSubmit(e, true)}>
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

    render() {

        const showSummary = !this.props.inRent && this.props.inState === "AWAITPAYMENT";
        const createDispute = !this.props.inRent && this.props.inState === "RENTED" && !this.props.openDispute;

        return(
            <Layout>

                {createDispute && <Button primary  floated='right' onClick={() => Router.pushRoute(`/rents/${this.props.address}/borrow/dispute/new`)}>Create Dispute</Button>}
                {this.props.openDispute && <Button as='div' labelPosition='left' floated='right' onClick={() => Router.pushRoute(`/rents/${this.props.address}/borrow/dispute/new`)}>
                    <Label basic color='red' pointing='right'>
                        View ongoing dispute
                    </Label>
                    <Button color='red'>
                        <Icon name='warning circle' />
                        Open Dispute
                    </Button>
                </Button>}
                
                <h3>Product Details</h3>
                <Divider hidden/>
                <Grid>
                    <Grid.Row>
                        {this.renderCards()}
                    </Grid.Row>

                    {showSummary && <Grid.Row centered>
                        {this.showSummary()}
                    </Grid.Row>}

                    {this.renderOptions()}
                </Grid>
            </Layout> 
        );
    }
}

export default RentalShow;