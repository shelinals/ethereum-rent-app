import React, { Component } from 'react';
import { Card, Image, Statistic, Divider, Grid } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Rental from '../ethereum/rental';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';
import { isMobileSSR, getWidth } from '../utils/device';
import { convertToImage } from '../utils/ipfs';
import { Link, Router } from '../routes';

class RentalIndex extends Component {

    static async getInitialProps() { //uses static to make initial data fetching easier, no need for rendering
        const deployedRents = await factory.methods.getDeployedRentals().call();
        const status = await Promise.all(
                deployedRents
                .map((address) => {
                return Rental(address).methods.getState().call();
            })
        );

        const availableRents = deployedRents.filter((address, i) => 
            status[i] == "PUBLISHED"
        );

        const names = await Promise.all(
                availableRents
                .map((address) => {
                return Rental(address).methods.productName().call();
            })
        );

        const deposit = await Promise.all(
                availableRents
                .map((address) => {
                return Rental(address).methods.deposit().call();
            })
        );

        const rentalFee = await Promise.all(
                availableRents
                .map((address) => {
                return Rental(address).methods.rentalFee().call();
            })
        );

        const imageHashes = await Promise.all(
                availableRents
                .map((address) => {
                return Rental(address).methods.imageHashes().call();
            })
        );

        const images = await Promise.all(
                imageHashes
                .map((hash) => {
                return hash == '0' ? 
                    'https://react.semantic-ui.com/images/wireframe/white-image.png' 
                    : convertToImage(hash);
            })
        );

        return { deployedRents, availableRents, names, deposit, rentalFee, imageHashes, images };
    }

    renderRents() {
        //transform image here
        const items = this.props.availableRents.map((address, i) => {
            const deposit = web3.utils.fromWei(this.props.deposit[i].toString(), 'ether');
            const feeHour = (web3.utils.fromWei(this.props.rentalFee[i].toString(), 'ether') * 60 * 60).toFixed(4);
            return <Card style={{padding: 20}} key={i} link onClick={() => Router.pushRoute(`/rents/${address}`)}>
                <Image size='medium' verticalAlign='middle' centered src={this.props.images[i]}/>
                <Card.Content>
                    <Card.Header>{this.props.names[i]}</Card.Header>
                    <Card.Description textAlign='center'>
                    <Grid columns='equal' stackable>
                        <Grid.Row>
                            <Grid.Column textAlign='right'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Deposit</Statistic.Label>
                                    <Statistic.Value>{deposit}</Statistic.Value>
                                 </Statistic>
                            </Grid.Column>
                            <Grid.Column textAlign='left'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Fee/Hour</Statistic.Label>
                                    <Statistic.Value>{feeHour}</Statistic.Value>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Card.Description>
                </Card.Content>

            </Card>
        });

        return <Card.Group itemsPerRow={4} doubling stackable> 
                    {items}
                </Card.Group>;
    }

    render() {
        const itemsLength = this.props.availableRents? this.props.availableRents.length : 0;
        console.log('deployed rents' + this.props.deployedRents);

        return(
            <Layout>
                <h3>Available Rent Items</h3>
                <Divider hidden/>

                {this.renderRents()}

                <Divider hidden/>
                <div style={{ marginTop: 20 }}>Found {itemsLength} Item(s).</div>
                <Divider hidden/>
            </Layout>
        );
    }
}

export default RentalIndex;