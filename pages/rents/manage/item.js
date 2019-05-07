import React, { Component } from 'react';
import { Form, Message, Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { ethers } from 'ethers';
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
        totalFee: ''
    }

    static async getInitialProps(props) { //uses static to make initial data fetching easier, no need for rendering
        const rent = Rental(props.query.address);
        const summary = await rent.methods.getSummary().call();
        const totalFee = await rent.methods.calculateFee().call();
        const inState = await rent.methods.getState().call();
        return { 
            manage: props.query.manage,
            address: props.query.address,
            totalFee: totalFee,
            inState: inState,
            productName: summary[0],
            description: summary[1],
            rentalFee: ethers.utils.formatUnits(summary[2], "ether"),
            deposit: ethers.utils.formatUnits(summary[3], "ether"),
            maxDuration: summary[4],
            owner: summary[5]
         };
    }

    onSubmitPayment = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);
        const inRent = this.props.manage === "rent" ?  true : false;
        const successMessage = inRent? "Action successful. Awaiting payment from renter." : "Transaction successful."

        this.setState({ loadingPayment: true, errorMessagePayment: '', errorMessageOverdue: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            let totalFee = await rent.methods.calculateFee().call();
            let payableFee = web3.utils.toWei('0.01','ether'); //temporary set

            if(inRent) {
                await rent.methods.reclaimItem().send({
                    from: accounts[0]
                });
            } else {
                await rent.methods.returnItem().send({
                    from: accounts[0],
                    value: payableFee
                });
            }
            this.setState({ totalFee: totalFee, disabledPayment: true, disabledOverdue: true, successMessagePayment: successMessage });
        } catch (err) {
            this.setState({ errorMessagePayment: err.message });
        }

        this.setState({ loadingPayment: false });
    }


    onSubmitOverdue = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loadingOverdue: true, errorMessageOverdue: '', errorMessagePayment: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.chargeOverdueItem().send({
                from: accounts[0]
            });

            this.setState({ disabledOverdue: true, disabledPayment: true, successMessageOverdue: "Action successful. Deposit received" });
        } catch (err) {
            this.setState({ errorMessageOverdue: err.message });
        }

        this.setState({ loadingOverdue: false });
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
        const totalFee = this.state.totalFee ? this.state.totalFee : this.props.totalFee;
        <Message
            icon="file alternate outline"
            header="Here is the summary of the rent"
            content={"Payable : " + totalFee}
      />
    }

    render() {

        const inRent = this.props.manage === "rent" ? true : false;
        const notPublished = this.props.inState !== "PUBLISHED" ? true : false;
        const message = inRent ? "Received item from borrower and request for payment" : "Pay rent fees and retrieve deposit";
        const buttonMessage = inRent? "Item Received" : "Pay Rent";
        const overdue = "Retrieve deposit from overdue item";
        const buttonOverdue = "Overdue Item";
        let showSummary = false;
        if(this.state.totalFee !== '') {
            showSummary = true
        } else if (!inRent && this.props.inState === "AWAITPAYMENT") {
            showSummary = true 
        }

        return(
            <Layout>
                <h3>Product Details</h3>
                <Grid>
                    <Grid.Row>
                        {this.renderCards()}
                    </Grid.Row>

                    {showSummary && <Grid.Row>
                        {this.showSummary()}
                    </Grid.Row>}

                    {notPublished && <Grid.Row centered>
                        <Form onSubmit={this.onSubmitPayment} error={!!this.state.errorMessagePayment} success={!!this.state.successMessagePayment}>
                            <Form.Field>
                                <label>{message}</label>
                                <Button primary loading={this.state.loadingPayment} disabled={this.state.disabledPayment || (inRent && this.props.inState !== "RENTED")}>
                                    {buttonMessage}
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessagePayment}/>
                            <Message success header="Success!" content={this.state.successMessagePayment}/>
                        </Form>
                    </Grid.Row>}

                    {inRent && notPublished &&
                    <Grid.Row centered>
                        <Form onSubmit={this.onSubmitOverdue} error={!!this.state.errorMessageOverdue} success={!!this.state.successMessageOverdue}>
                            <Form.Field>
                                <label>{overdue}</label>
                                <Button primary loading={this.state.loadingOverdue} disabled={this.state.disabledOverdue || (this.props.inState !== "RENTED")}>
                                    {buttonOverdue}
                                </Button>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessageOverdue}/>
                            <Message success header="Success!" content={this.state.successMessageOverdue}/>
                        </Form>
                    </Grid.Row>}
                </Grid>
            </Layout> 
        );
    }
}

export default RentalShow;