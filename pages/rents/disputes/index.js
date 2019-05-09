import React, { Component } from 'react';
import { Divider, Segment, Header, Icon, Grid, Message, 
        Statistic, Button, Label, Dimmer, Loader, Modal, Image } from 'semantic-ui-react';
import moment from 'moment';
import factory from '../../../ethereum/factory';
import Layout from '../../../components/Layout';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { ethers } from 'ethers';
import { convertToImage, getString } from '../../../utils/ipfs';
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
        incentives: 0,
        finalizePopUp: false,
        currentApprove: this.props.openDispute.approvalCount,
        currentReject: this.props.openDispute.rejectionCount
    };

    async componentDidMount() {
        const { address } = this.props;
        const accounts = await web3.eth.getAccounts();
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
        const { address, addressIdx } = props.query;
        const rent = Rental(address);
        const disputeCounts = await rent.methods.disputeCounts().call();
        let index;
        if(addressIdx){
            index = addressIdx;
        } else {
            index = disputeCounts - 1;
        }
        const openDispute = await rent.methods.disputes(index).call();
        const owner = await rent.methods.owner().call();
        const renter = await rent.methods.renter().call();
        const byOwner = openDispute.disputer == owner;
        const image = openDispute.imageHash == '0' ? 0 : await convertToImage('Qm'+openDispute.imageHash);
        const productName = await rent.methods.productName().call();
        const depositWei = await rent.methods.deposit().call();
        const deposit = ethers.utils.formatUnits(depositWei, "ether");
        const rentFeeWei= byOwner ? await rent.methods.totalRentingFee().call()  
                        : await rent.methods.finalizeDisputeFee(index).call();
        const rentFee = ethers.utils.formatUnits(rentFeeWei, "ether");
        const profileOwner = await factory.methods.getProfile(owner).call();
        const profileRenter = await factory.methods.getProfile(renter).call();
        return { address, index, openDispute, byOwner, productName, image, 
                    deposit, rentFee, owner, renter, profileOwner, profileRenter };
    }

    onApprove = async (event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ loading: true, errorMessage: '', errorFinalize: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            let incentives = await rent.methods.payoutIncentive(this.props.openDispute.incentives).call();
            incentives = ethers.utils.formatUnits(incentives, "ether");
            await rent.methods.approveDispute(this.props.index).send({
                from: accounts[0]
            });
            
            this.setState({ hasVoted: true, currentApprove: parseInt(this.state.currentApprove) + 1, incentives: incentives });

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
            let incentives = await rent.methods.payoutIncentive(this.props.openDispute.incentives).call();
            incentives = ethers.utils.formatUnits(incentives, "ether");
            await rent.methods.rejectDispute(this.props.index).send({
                from: accounts[0]
            });
            
            this.setState({ hasVoted: true, currentReject: parseInt(this.state.currentReject) + 1, incentives: incentives });

        } catch (err) {
            this.setState({ errorMessage: err.message }); 
        }

        this.setState({ loading: false });

    }

    onFinalize = async(event) => {
        event.preventDefault();

        const rent = Rental(this.props.address);

        this.setState({ finalizePopUp: false, loading: true, errorFinalize: '', errorMessage: '' });

        try{
            const accounts = await web3.eth.getAccounts();

            if(this.props.byOwner){
                await rent.methods.finalizeRequestOwner(this.props.index).send({
                    from: accounts[0]
                });
            } else {
                await rent.methods.finalizeRequestRenter(this.props.index).send({
                    from: accounts[0]
                });
            }

            this.setState({ completed: true, 
                successFinalize: 'The transactions has been finalized' });
        } catch(err) {
            this.setState({ errorFinalize: err.message });
        }

        this.setState({ loading: false });
    }

    renderSummary() {
        //we assume that total payment <= deposit
        const {
            approvalCount, 
            rejectionCount,
            penaltyFee,
        } = this.props.openDispute;

        const approvedDispute = approvalCount >= rejectionCount;
        const approvalMsg = approvedDispute ? 
            'Approval counts are sufficient to approve the dispute. Here is the final summary of the transaction: ' 
            : 'Approval counts are not sufficient to approve the dispute. Due to the number of rejection counts, this dispute is deemed to be invalid.' ;
        let payable = parseFloat(this.props.rentFee)+(penaltyFee/100*parseFloat(this.props.deposit));
        payable = payable > parseFloat(this.props.deposit) ? parseFloat(this.props.deposit) : payable;
        return(
            <Modal
                size="small"
                open={this.state.finalizePopUp}
                onClose={() => this.setState({ finalizePopUp: false })}
            >
                <Modal.Header>Finalize Summary</Modal.Header>
                <Modal.Content>
                    <p>
                        {approvalMsg}
                    </p>
                    {!this.props.byOwner && <Message compact color='yellow'>
                        {approvedDispute ? 
                            (<div>
                            <div>Payable of ~ {parseFloat(this.props.rentFee).toFixed(4)} ETH to the owner</div>
                            <div>This amount will be deducted from the renter's deposit of {parseFloat(this.props.deposit)} ETH </div>
                            <div>The remainder will be credited back to the renter with any additional remaining voting incentives</div>
                            </div>) : <span>Deposit of {parseFloat(this.props.deposit)} ETH will be credited to the owner</span>}
                    </Message>}
                    {this.props.byOwner && <Message compact color='yellow'>
                        {approvedDispute ? 
                            (<div>
                            <div>Payable of ~ {payable.toFixed(4)} ETH to the owner</div>
                            <div>It includes the rental fee of {parseFloat(this.props.rentFee).toFixed(4)} 
                                plus the penalty fee of {penaltyFee} % to the deposit or the deposit itself whichever is higher</div>
                            <div>This amount will be deducted from the renter's deposit of {parseFloat(this.props.deposit)} ETH</div>
                            <div>The payable fee will be credited to the owner with any additional remaining voting incentives</div>
                            <div>The remainder of the deposit will be credited back to the renter</div>
                            </div>) : (<div>
                            <div>Payable of ~ {parseFloat(this.props.rentFee).toFixed(4)} ETH to the owner</div>
                            <div>It includes only the rental fee</div>
                            <div>This amount will be deducted from the renter's deposit of {parseFloat(this.props.deposit)} ETH</div>
                            <div>The payable fee will be credited to the owner with any additional remaining voting incentives</div>
                            <div>The remainder of the deposit will be credited back to the renter</div>
                            </div>)}
                    </Message>} 
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => this.setState({ finalizePopUp: false })}>
                        <Icon name='cancel' />
                        Cancel
                    </Button>
                    <Button positive onClick={(e) => this.onFinalize(e)}>
                        <Icon name='upload' />
                        Submit 
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    renderImage() {
        const { image } = this.props;

        if(parseInt(image) == 0) {
            return(
                <Segment placeholder>
                    <Header icon>
                    <Icon name='images outline' />
                        No photos for this dispute.
                    </Header>
                </Segment>
            );
        } else {
            return(
                <Segment padded placeholder>
                    <Image 
                        centered
                        size='medium'
                        src={image}
                    />
                </Segment>   
            );
        }
    }

    render() {
        //finalize only after one week
        //after one week check if rejection and approval is the same

        const { complete, 
                title, 
                description, 
                disputer,
                approvalCount, 
                rejectionCount,
                penaltyFee, 
                startTime 
        } = this.props.openDispute;

        const hasVoted = this.state.hasVoted;
        const completed = this.state.completed? this.state.completed : complete;
        const showFinalize = ((this.state.isOwner || this.state.isRenter) && !completed);
        const status = completed ? 'Closed' : 'Open';
        const timeOpened = moment.unix(startTime).format('dddd, Do MMMM YYYY, h:mm:ss a');
        const timeToFinalize = moment.unix(startTime).add(1, 'weeks').fromNow(true);
        const allowFinalize = moment.unix(startTime).add(1, 'weeks').isSameOrBefore(moment(), 'second');
        const productName = this.props.productName;
        const productId = this.props.address;
        const byOwner = this.props.byOwner;
        return(
            <Layout>
                <Dimmer active={this.state.loading} inverted style={{ position: 'fixed' }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>

                <h3 style={{ marginTop: 5 }}>Dispute Details</h3>
                <Message color={completed ? 'red' : 'green'} compact style={{marginTop: 0}}>{'Status: ' + status}</Message>

                {this.renderSummary()}
                
                {showFinalize && <Button as='div' labelPosition='left' floated='right' disabled={!allowFinalize}
                    onClick={() => this.setState({ finalizePopUp: true })}>
                    <Label basic color='blue' pointing='right'>
                        {allowFinalize? 'finalize now' : 'in ' + timeToFinalize}
                    </Label>

                    <Button primary>
                        <Icon name='flag' />
                        Finalize
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
                                {'Opened: ' + timeOpened + ' by '}
                                {byOwner ? <Link route={`/profile/${this.props.profileOwner}`}> 
                                        <a>{disputer}</a> 
                                    </Link> 
                                :   <Link route={`/profile/${this.props.profileRenter}`}> 
                                        <a>{disputer}</a> 
                                    </Link>}
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
                        {!hasVoted && !completed && !this.state.isOwner && !this.state.isRenter &&
                            <React.Fragment> 
                                <Grid.Column textAlign='right'>
                                    <Button positive onClick={this.onApprove}>Approve</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button negative onClick={this.onReject}>Reject</Button>
                                </Grid.Column>
                            </React.Fragment>}

                        {this.state.isOwner && !completed && 
                            <Grid.Column textAlign='center'>
                                <Message compact warning
                                    header={byOwner ? 'You are the disputer' : 'You are the disputant'}
                                    content='You cannot take part in this vote'
                                />
                            </Grid.Column>}

                        {this.state.isRenter && !completed &&
                            <Grid.Column textAlign='center'>
                                <Message compact warning
                                    header={byOwner ? 'You are the disputant' : 'You are the disputer'}
                                    content='You cannot take part in this vote'
                                />
                            </Grid.Column>}

                        {hasVoted && !completed && !this.state.isOwner && !this.state.isRenter &&
                            <Grid.Column textAlign='center'>
                                <Message compact success>
                                    <Message.Header>Thank you for voting!</Message.Header>
                                    <Message.Content>
                                        <div>Your vote has been recorded.</div>
                                        { this.state.incentives && <div>Incentives of {this.state.incentives} ETH will be credited to you.</div> }
                                    </Message.Content>
                                </Message>
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

                <h2>Disputer</h2>

                <div style={{fontSize:'17px', textAlign: 'justify', wordBreak: 'break-word' }}>
                    {byOwner ? <Link route={`/profile/${this.props.profileOwner}`}> 
                                    <a>{this.props.owner}</a> 
                                </Link> 
                            :   <Link route={`/profile/${this.props.profileRenter}`}> 
                                    <a>{this.props.renter}</a> 
                                </Link>}
                </div>
                
                <Divider hidden />

                <h2>Disputant</h2>

                <div style={{fontSize:'17px', textAlign: 'justify', wordBreak: 'break-word' }}>
                    {byOwner ? <Link route={`/profile/${this.props.profileRenter}`}> 
                                    <a>{this.props.renter}</a> 
                                </Link> 
                            :   <Link route={`/profile/${this.props.profileOwner}`}> 
                                    <a>{this.props.owner}</a> 
                                </Link>}
                </div>

                <Divider hidden />

                {byOwner && 
                <React.Fragment>
                    <h2>Penalty Fee</h2>

                    <div style={{fontSize:'17px', textAlign: 'justify' }}>
                            A proposed penalty fee of <span style={{ color: 'red' }}>{penaltyFee} % of the initial deposit </span> is to be imposed on the renter.
                            This value is approximately <span style={{ color: 'red' }}>{(penaltyFee*parseFloat(this.props.deposit)/100).toFixed(3)} ETH</span>.
                    </div>
                    <Divider hidden />
                </React.Fragment>}

                <h2>Attachment</h2>

                {this.renderImage()}

                <Divider hidden />
            </Layout>
        );
    }
}

export default DisputeShow;