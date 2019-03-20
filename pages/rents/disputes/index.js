import React, { Component } from 'react';
import { Divider, Segment, Header, Icon, Grid, Message, 
        Statistic, Button, Label, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import Layout from '../../../components/Layout';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class DisputeShow extends Component {
    state = {
        hasVoted : false,
        completed: false,
        errorMessage: '',
        successFinalize: '',
        errorFinalize: '',
        loading: true,
        isRenter: false,
        isOwner: false,
        currentApprove: this.props.openDispute.approvalCount,
        currentReject: this.props.openDispute.rejectionCount
    };

    async componentDidMount() {
        const { address } = this.props;
        const accounts = await web3.eth.getAccounts();
        //console.log('address ' + address + 'open dispute' + this.props.openDispute.approvals);
        if(await Rental(address).methods.owner().call() === accounts[0]){
            this.setState({ isOwner: true });
        }else if(await Rental(address).methods.renter().call() === accounts[0]){
            this.setState({ isRenter: true });
        }
        if(await Rental(address).methods.hasVoted(accounts[0]).call()){
            this.setState({ hasVoted: true });
        }
        this.setState({ loading: false });
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        const rent = Rental(address);
        const disputeCounts = await rent.methods.disputeCounts().call();
        const index = disputeCounts - 1;
        const openDispute = await rent.methods.disputes(index).call();
        const productName = await rent.methods.productName().call();
        return { address, index, openDispute, productName };
    }

    onApprove = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loading: true, errorMessage: '', errorFinalize: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.approveDispute(this.props.index).send({
                from: accounts[0]
            });
            
            this.setState({ hasVoted: true, currentApprove: parseInt(this.state.currentApprove) + 1 });

        } catch (err) {
            this.setState({ errorMessage: err.message }); 
        }

        this.setState({ loading: false });
    }

    onReject = async(event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loading: true, errorMessage: '', errorFinalize: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await rent.methods.rejectDispute(this.props.index).send({
                from: accounts[0]
            });
            
            this.setState({ hasVoted: true, currentReject: parseInt(this.state.currentReject) + 1 });

        } catch (err) {
            this.setState({ errorMessage: err.message }); 
        }

        this.setState({ loading: false });

    }

    onFinalize = async(event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loading: true, errorFinalize: '', errorMessage: '' });

        try{
            const accounts = await web3.eth.getAccounts();
            await rent.methods.finalizeRequest(this.props.index).send({
                from: accounts[0]
            });

            this.setState({ completed: true, 
                successFinalize: 'The transactions has been finalized' });
        } catch(err) {
            this.setState({ errorFinalize: err.message });
        }

        this.setState({ loading: false });
    }

    render() {
        //finalize only after one week
        //after one week check if rejection and approval is the same

        const { complete, 
                title, 
                description, 
                disputer, 
                imageHash, 
                approvalCount, 
                rejectionCount, 
                startTime 
        } = this.props.openDispute;

        const hasVoted = this.state.hasVoted;
        //const hasVoted = false;
        const completed = this.state.completed? this.state.completed : complete;
        const showFinalize = ((this.state.isOwner || this.state.isRenter) && !completed);
        const status = completed ? 'Closed' : 'Open';
        const timeOpened = moment.unix(startTime).format('dddd, Do MMMM YYYY, h:mm:ss a');
        const timeToFinalize = moment.unix(startTime).add(1, 'weeks').fromNow(true);
        const allowFinalize = moment.unix(startTime).add(1, 'weeks').isSameOrBefore(moment(), 'second');
        const productName = this.props.productName;
        const productId = this.props.address;
        return(
            <Layout>
                <Dimmer active={this.state.loading} inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>

                <h3>Dispute Details</h3>
                <Message color={completed ? 'red' : 'green'} compact style={{marginTop: 0}}>{'Status: ' + status}</Message>

                {showFinalize && <Button as='div' labelPosition='left' floated='right' disabled={!allowFinalize}
                    onClick={this.onFinalize}>
                    <Label basic color='blue' pointing='right'>
                        {allowFinalize? 'finalize now' : 'finalize in ' + timeToFinalize}
                    </Label>

                    <Button primary>
                        <Icon name='flag' />
                        Finalize Dispute
                    </Button>
                </Button>}

                {this.state.errorFinalize && 
                    <Message error style={{textAlign: 'center'}} header="Oops!" content={this.state.errorFinalize}/>}
                {this.state.successFinalize && 
                    <Message success style={{textAlign: 'center'}} header="Success!" content={this.state.successFinalize}/>}

                <Header as='h2'>
                    <Icon name='clipboard' />
                    <Header.Content>
                        {title}
                        <Header.Subheader>
                            <div style={{wordBreak: 'break-word'}}>
                                {'Opened: ' + timeOpened + ' by ' + disputer}
                            </div>
                        </Header.Subheader>
                    </Header.Content>
                </Header>

                <Grid columns='equal' divided>
                    <Grid.Row>
                        <Grid.Column textAlign='right'>
                            <Statistic>
                                <Statistic.Value>
                                    {this.state.currentApprove? this.state.currentApprove : approvalCount}
                                </Statistic.Value>
                                <Statistic.Label>
                                <Icon name='check circle outline' color='green' size='large'/>
                                    Approvals
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic>
                                <Statistic.Value>
                                    {this.state.currentReject? this.state.currentReject : rejectionCount}
                                </Statistic.Value>
                                <Statistic.Label>
                                    <Icon name='times circle outline' color='red' size='large'/>
                                    Rejections
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        {!hasVoted && !completed &&
                            <React.Fragment> 
                                <Grid.Column textAlign='right'>
                                    <Button positive onClick={this.onApprove}>Approve</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button negative onClick={this.onReject}>Reject</Button>
                                </Grid.Column>
                            </React.Fragment>}

                        {hasVoted && !completed &&
                            <Grid.Column textAlign='center'>
                                <Message compact success
                                    header='Thank you for voting!'
                                    content='Your vote has been recorded'
                                />
                            </Grid.Column>}

                        {completed && 
                            <Grid.Column textAlign='center'>
                                <Message compact negative
                                    header='This voting has been closed'
                                />
                            </Grid.Column>}
                    </Grid.Row>
                    {this.state.errorMessage && <Grid.Row centered>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                    </Grid.Row>}
                </Grid>

                <Divider hidden />

                <Header as='h2'>
                    <Header.Content>
                        {productName}
                    </Header.Content>
                    <Header.Subheader>
                        <div style={{wordBreak: 'break-word'}}>{'Product ID: ' + productId}</div>
                    </Header.Subheader>
                </Header>

                <Button primary onClick={() => Router.pushRoute(`/rents/${this.props.address}`)}>View Product</Button>

                <Divider hidden />

                <h2>Description</h2>

                <div style={{fontSize:'17px', textAlign: 'justify' }}>{description}</div>

                <Divider hidden />

                <h2>Attachment</h2>

                <Segment placeholder>
                    <Header icon>
                    <Icon name='images outline' />
                        No photos for this item.
                    </Header>
                </Segment>

                <Divider hidden />
            </Layout>
        );
    }
}

export default DisputeShow;