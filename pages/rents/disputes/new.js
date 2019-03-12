import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Segment, Icon, Header, Image, Divider } from 'semantic-ui-react';
import Rental from '../../../ethereum/rental';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import { getIpfsHash } from '../../../utils/ipfs';

class DisputeNew extends Component {
    state = {
        title: '',
        description: '',
        errorMessage: '',
        loading: false,
        imageUrl: '',
        buffer: null
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        const rent = Rental(this.props.address);
        const { title, description } = this.state;

        this.setState({ loading: true, errorMessage: '' })

        try {
            const ipfsHash = this.state.buffer ? await getIpfsHash(this.state.buffer) : 0;
            const accounts = await web3.eth.getAccounts();
            await rent.methods
                    .createDispute(title, description, ipfsHash.toString())
                    .send({ from: accounts[0] });

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
            this.setState({ buffer: Buffer(reader.result)});
            console.log(this.state.buffer);
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
        return(
            <Layout>
                <Link route={`/rents/${this.props.address}`}>
                    <a>Back</a>
                </Link>
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