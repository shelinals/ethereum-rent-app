import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Segment, Icon, Header, Image, Divider, Select } from 'semantic-ui-react';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { ethers } from 'ethers';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import { getIpfsHash } from '../../../utils/ipfs';

class DisputeNew extends Component {
    state = {
        title: '',
        description: '',
        incentives: '',
        penaltyFee: 0,
        errorMessage: '',
        loading: false,
        imageUrl: '',
        buffer: null
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        const rent = Rental(address);
        const inState = await rent.methods.getState().call();
        let deposit = await rent.methods.deposit().call();
        deposit = ethers.utils.formatUnits(deposit, "ether");
        const byOwner = inState === 'AWAITPAYMENT';
        return { address, byOwner, deposit };
    }

    onSubmit = async event => {
        event.preventDefault();

        const rent = Rental(this.props.address);
        const { title, description, incentives, penaltyFee } = this.state;

        this.setState({ loading: true, errorMessage: '' })

        try {
            const imageHash = this.state.buffer ? (await getIpfsHash(this.state.buffer)).substring(2) : '0';
            const accounts = await web3.eth.getAccounts();

            if(this.props.byOwner) {
                await rent.methods
                    .createDisputeOwner(title, description, imageHash, penaltyFee)
                    .send({ from: accounts[0], value: web3.utils.toWei(incentives, 'ether') });
            } else {
                await rent.methods
                    .createDisputeRenter(title, description, imageHash)
                    .send({ from: accounts[0], value: web3.utils.toWei(incentives, 'ether') });
            }

            Router.pushRoute(`/rents/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    onFileSelected = () => {

        const reader = new FileReader();
        const reader2 = new FileReader();

        const file = this.fileInput.files[0];

        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            }); 
        }

        reader.readAsDataURL(file);

        reader2.onloadend = () => {
            this.setState({ buffer: Buffer.from(reader2.result)});
        }

        reader2.readAsArrayBuffer(file);
    }

    onFileRemoved = () => {
        this.setState({
            imageUrl: '',
            buffer: null
        });
    }

    renderImage() {
        const {imageUrl} = this.state;

        if(imageUrl){
            return(
                <Segment padded placeholder>
                    <Image 
                        centered
                        size='medium'
                        src={imageUrl}
                        label={{ as: 'a', icon: {name: 'remove', fitted: true} , 
                                circular: true, floating: true, size: 'large',
                                onClick: () => this.onFileRemoved() }}
                    />
                </Segment>   
            );
        } else {
            return(
                <Segment placeholder>
                    <Header icon>
                    <Icon name='images outline' />
                        No photos are uploaded for this item.
                    </Header>
                    <input 
                        style={{ display: 'none' }} 
                        type='file' 
                        onChange={() => this.onFileSelected()}
                        ref={fileInput => this.fileInput = fileInput}/>
                    <Button primary onClick={() => this.fileInput.click()}>Add Photos</Button>
                </Segment> 
            );
        }
    }

    render() {
        const options = [
            { key: '0', text: '0.01 ETH', value: '0.01' },
            { key: '1', text: '0.03 ETH', value: '0.03' },
            { key: '2', text: '0.06 ETH', value: '0.06' },
            { key: '3', text: '0.1 ETH', value: '0.1' },
            { key: '4', text: '0.15 ETH', value: '0.15' },
            { key: '5', text: '0.2 ETH', value: '0.2' }
        ];

        return(
            <Layout>
                <h3>Create a Dispute</h3>
                <Form error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Title</label>
                        <Input 
                            placeholder='Enter Title'
                            onChange = {event => 
                                this.setState({ title: event.target.value })}
                        />
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Description</label>
                        <TextArea 
                            placeholder='Enter Description'
                            onChange = {event => 
                                this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    {this.props.byOwner && <Form.Field>
                        <label>Penalty Fee (percentage of deposit)</label>
                        <label style={{ color: 'red' }}>Deposit stored: {parseFloat(this.props.deposit).toFixed(2)} ETH</label>
                        <input type='range' min={0} max={100} value={this.state.penaltyFee} step={10}
                               onChange={(event) => this.setState({ penaltyFee: event.target.value })} />
                        <div>Penalty: {this.state.penaltyFee} %</div>
                    </Form.Field>}

                    <Form.Field>
                        <label>Incentives</label>
                        <Select
                            placeholder='Select Incentives'
                            options={options}
                            onChange = {(event,{value}) => 
                                this.setState({ incentives: value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        {this.renderImage()}
                    </Form.Field>
                    
                    <Button primary loading={this.state.loading} onClick={(e) => this.onSubmit(e) }>Submit</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form>
                <Divider hidden />
            </Layout>
        );
    }
}

export default DisputeNew;