import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';
import { Card, Image, Statistic, Divider, Grid, Responsive, Rating } from 'semantic-ui-react';
import { ethers } from 'ethers';
import factory from '../ethereum/factory';
import Rental from '../ethereum/rental';
import Profile from '../ethereum/profile';
import Layout from '../components/Layout';
import { getWidthFactory } from '../utils/device';
import { convertToImage } from '../utils/ipfs';
import { Link, Router } from '../routes';

class RentalIndex extends Component {

    static async getInitialProps({ req }) { 
        
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

        availableRents.reverse();

        let names = [];
        let owners = [];
        let deposit = [];
        let rentalFee = [];

        const summary = await Promise.all(
                availableRents
                .map((address) => {
                    return Rental(address).methods.getSummary().call();
                })  
        );

        summary.forEach(function(item){
            names.push(item[0]);
            owners.push(item[5]);
            deposit.push(item[3]);
            rentalFee.push(item[2]);
        });

        // const deposit2 = await Promise.all(
        //         availableRents
        //         .map((address) => {
        //         return Rental(address).methods.deposit().call();;
        //     })
        // );

        
        const ownersP = await Promise.all(
                owners
                .map((owner) => {
                return factory.methods.getProfile(owner).call();;
            })
        );

        const itemSumRatings = await Promise.all(
                ownersP
                .map((ownerP) => {
                return Profile(ownerP).methods.getSumRating().call();;
            })
        );

        const ratingCounts = await Promise.all(
                ownersP
                .map((ownerP) => {
                return Profile(ownerP).methods.ratingCounts().call();;
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
                    : convertToImage('Qm' + hash);
            })
        );

        let isMobileFromSSR = false;

        if(req){
            const device = req.headers["user-agent"];
            const md = new MobileDetect(device);
            isMobileFromSSR = !!md.mobile();
        }

        return { deployedRents, availableRents, names, deposit, rentalFee, imageHashes, 
                images, isMobileFromSSR, itemSumRatings, ratingCounts };
    }

    renderRentsDesktop() {
        const items = this.props.availableRents.map((address, i) => {
            const deposit = ethers.utils.formatUnits(this.props.deposit[i], "ether");
            const feeHour = (ethers.utils.formatUnits(this.props.rentalFee[i], "ether") * 60 * 60).toFixed(4);
            const avgRate = this.props.ratingCounts[i]? (Math.round(this.props.itemSumRatings[i] / this.props.ratingCounts[i])) : 0;
            return <Card key={i} link onClick={() => Router.pushRoute(`/rents/${address}`)} color='red'>
                <Image centered src={this.props.images[i]}/>
                <Card.Content>
                    <Card.Header>{this.props.names[i]}</Card.Header>
                    <Card.Description textAlign='center'>
                    <Grid columns='equal' stackable>
                        <Grid.Row>
                            <Grid.Column textAlign='right'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Deposit</Statistic.Label>
                                    <Statistic.Value><span style={{fontSize: 17}}>{deposit} ETH</span></Statistic.Value>
                                 </Statistic>
                            </Grid.Column>
                            <Grid.Column textAlign='left'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Fee/Hour</Statistic.Label>
                                    <Statistic.Value><span style={{fontSize: 17}}>{feeHour} ETH</span></Statistic.Value>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Owner's rating: <Rating maxRating={5} rating={avgRate} icon='star' disabled/>
                </Card.Content>
            </Card>
        });

        return  <Responsive fireOnMount as={Card.Group} getWidth={getWidthFactory(this.props.isMobileFromSSR)} 
                            minWidth={Responsive.onlyTablet.minWidth} itemsPerRow={4} doubling stackable>
                            {items}
                </Responsive>;
    }

    renderRentsMobile() {
        const items = this.props.availableRents.map((address, i) => {
            const deposit = ethers.utils.formatUnits(this.props.deposit[i], "ether");
            const feeHour = (ethers.utils.formatUnits(this.props.rentalFee[i], "ether") * 60 * 60).toFixed(4);
            const avgRate = this.props.ratingCounts[i]? (Math.round(this.props.itemSumRatings[i] / this.props.ratingCounts[i])) : 0;
            return <Card key={i} link onClick={() => Router.pushRoute(`/rents/${address}`)} color='red'>
                <Image centered src={this.props.images[i]}/>
                <Card.Content>
                    <Card.Header>{this.props.names[i]}</Card.Header>
                    <Card.Description textAlign='center'>
                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Deposit</Statistic.Label>
                                    <Statistic.Value>{deposit} ETH</Statistic.Value>
                                 </Statistic>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Statistic size='mini' color='red'>
                                    <Statistic.Label>Fee/Hour</Statistic.Label>
                                    <Statistic.Value>{feeHour} ETH</Statistic.Value>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Owner's rating: <Rating maxRating={5} rating={avgRate} icon='star' size='large' disabled/>
                </Card.Content>
            </Card>
        });

        return <Responsive fireOnMount as={Card.Group} getWidth={getWidthFactory(this.props.isMobileFromSSR)} 
                            maxWidth={Responsive.onlyMobile.maxWidth} stackable doubling>
                            {items}
                </Responsive>;
    }

    render() {
        const itemsLength = this.props.availableRents? this.props.availableRents.length : 0;

        return(
            <Layout>
                <h3>Available Rent Items</h3>
                <Divider hidden/>

                {this.renderRentsDesktop()}
                {this.renderRentsMobile()}

                <Divider hidden/>
                <div style={{ marginTop: 20 }}>Found {itemsLength} Item(s).</div>
                <Divider hidden/>
            </Layout>
        );
    }
}

export default RentalIndex;