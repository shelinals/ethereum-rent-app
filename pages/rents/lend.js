import React, { Component } from 'react';
import { Form, Button, TextArea, Input, Message, 
        Modal, Header, Segment, Icon, Image, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { getIpfsHash } from '../../utils/ipfs';

class RentalNew extends Component {
    state = {
        productName: '',
        description: '',
        rentalFee: '',
        deposit: '',
        maxDuration: '',
        errorMessage: '',
        successMessage: '',
        loading: false,
        disabled: false,
        popup: false,
        imageUrl: '',
        buffer: null
    };

    onSubmit = async (event, publish) => {
        event.preventDefault();

        const { productName, description, rentalFee, deposit, maxDuration } = this.state;

        this.setState({ loading: true, popup: false, errorMessage: '' });

        try{
            const ipfsHash = this.state.buffer ? await getIpfsHash(this.state.buffer) : 0;
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createRental(productName, 
                                description, 
                                Math.round(web3.utils.toWei(rentalFee, 'ether') / 60 / 60), 
                                web3.utils.toWei(deposit, 'ether'), 
                                parseFloat(maxDuration) * 60 * 60,
                                publish,
                                ipfsHash.toString())
                .send({
                    from: accounts[0]
                });

            this.setState({ disabled: true, 
                successMessage: "You have submitted the item. You can manage your item(s) in the 'Manage Items' tab" });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    }

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
        
        return (
            <Layout>
                <h3>Lend an Item</h3>
                <Form error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Form.Field>
                        <label>Product Name</label>
                        <Input 
                            placeholder="Enter Product Name"
                            value={this.state.productName}
                            onChange={event => this.setState({ productName: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product Description</label>
                        <TextArea 
                            placeholder="Enter Description"
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Rental Fee</label>
                        <Input
                            placeholder="Rental Fee per hour" 
                            label="ether" 
                            labelPosition="right"
                            value={this.state.rentalFee}
                            onChange={event => this.setState({ rentalFee: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Deposit</label>
                        <Input 
                            label="ether" 
                            labelPosition="right"
                            value={this.state.deposit}
                            onChange={event => this.setState({ deposit: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Maximum Rental Duration</label>
                        <Input 
                            label="hour(s)" 
                            labelPosition="right"
                            value={this.state.maxDuration}
                            onChange={event => this.setState({ maxDuration: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        {this.renderImage()}
                    </Form.Field>
                    <Button loading={this.state.loading} primary disabled={this.state.disabled} onClick={() => this.setState({ popup: true })}>Submit</Button>
                    <Message error header="Oops! Something went wrong" content={this.state.errorMessage} />
                    <Message success header="Success!" content={this.state.successMessage} />
                </Form>

                <Divider hidden />

                <Modal
                    size="small"
                    open={this.state.popup}
                    onClose={() => this.setState({ popup: false })}
                >
                    <Modal.Header>Do you want to publish this item?</Modal.Header>
                    <Modal.Content>
                        <p>
                            Item not published will be held IDLE and will not be available for rent yet. You can publish this item later in the "Manage Items" tab.  
                            Note that additional transaction fee applies when you publish this item later.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.setState({ popup: false })}>
                            <Icon name='cancel' />
                            Cancel
                        </Button>
                        <Button color='yellow' onClick={(e) => this.onSubmit(e, false)}>
                            <Icon name='save' />
                            Save and Publish Later
                        </Button>
                        <Button positive onClick={(e) => this.onSubmit(e, true)}>
                            <Icon name='upload' />
                            Submit and Publish Now
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Layout>
        );
    }
}

export default RentalNew;