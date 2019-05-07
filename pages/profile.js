import React, { Component } from 'react';
import { Statistic, Header, Icon, Comment , Rating, Loader, Divider, Dimmer, Grid, Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Profile from '../ethereum/profile';
import Rental from '../ethereum/rental';
import { Link, Router } from '../routes';


class ProfileShow extends Component {

    state = {
        loader: this.props.loader,
        address: null,
        ratings: this.props.ratings,
        ratingCount: this.props.ratingCount,
        timesRenting: this.props.timesRenting,
        timesBorrowing: this.props.timesBorrowing,
        sumRating: this.props.sumRating,
        user: this.props.user,
        productName: this.props.productName,
        isUser: this.props.isUser
    };

    async componentDidMount() {
        if(this.props.address == 'user'){
            const accounts = await web3.eth.getAccounts();
            const hasAddress = await factory.methods.hasProfile(accounts[0]).call();
            if(!hasAddress){
                this.setState({ address: accounts[0], user: accounts[0], isUser: false, loader: false });
            } else {
                const profileAddress = await factory.methods.getProfile(accounts[0]).call();
                var profile = Profile(profileAddress);
                var ratingCount = await profile.methods.ratingCounts().call();
                var timesRenting = await profile.methods.timesLending().call();
                var timesBorrowing = await profile.methods.timesBorrowing().call();
                var sumRating = await profile.methods.getSumRating().call();
                var user = await profile.methods.user().call();
    
                var ratings = await Promise.all(
                    Array(parseInt(ratingCount))
                        .fill()
                        .map((element, index) => {
                            return profile.methods.ratings(index).call();
                    })
                );
    
                var productName = await Promise.all(
                    Array(parseInt(ratingCount))
                        .fill()
                        .map((element, index) => {
                            return Rental(ratings[index].productId).methods.productName().call();
                    })
                );
    
                var loader = false;
                var isUser = true;

                this.setState({ address: accounts[0], ratings, ratingCount, timesRenting, timesBorrowing, 
                                sumRating, user, productName, loader , isUser });
            }
        }
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        if(address == 'user'){
            var ratings = [];
            var ratingCount = 0;
            var timesRenting = 0;
            var timesBorrowing = 0;
            var sumRating = 0;
            var user = null;
            var productName = null;
            var loader = true;
            var isUser = false;
        } else {
            var profile = Profile(address);
            var ratingCount = await profile.methods.ratingCounts().call();
            var timesRenting = await profile.methods.timesLending().call();
            var timesBorrowing = await profile.methods.timesBorrowing().call();
            var sumRating = await profile.methods.getSumRating().call();
            var user = await profile.methods.user().call();

            var ratings = await Promise.all(
                Array(parseInt(ratingCount))
                    .fill()
                    .map((element, index) => {
                        return profile.methods.ratings(index).call();
                })
            );

            var productName = await Promise.all(
                Array(parseInt(ratingCount))
                    .fill()
                    .map((element, index) => {
                        return Rental(ratings[index].productId).methods.productName().call();
                })
            );

            var loader = false;
            var isUser = true;
        }

        return { address, ratings, ratingCount, timesRenting, timesBorrowing, sumRating, user, productName, loader, isUser };
    }

    renderComments() {
        return this.state.ratings.map((rating, index) => {
            return (
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author><div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {rating.rater}</div>
                        </Comment.Author>
                        <Comment.Metadata>
                                {web3.utils.hexToAscii(rating.role) + ' of '} 
                                <Link route={`/rents/${rating.productId}`}> 
                                    <a>{this.state.productName[index]}</a> 
                                </Link>
                        </Comment.Metadata>
                        <Comment.Text>
                            <Rating maxRating={5} rating={rating.rate} icon='star' size='small' disabled/>
                            <div>
                                {rating.comment ? rating.comment : '-'}
                            </div>
                        </Comment.Text>
                    </Comment.Content>
                    <Divider />
                </Comment>
            );
        });
    }

    renderUser(avgRate){
        const marginSize = this.state.ratingCount != 0? 50 : 10;
        return(
            <React.Fragment>
                <Header as='h2' icon textAlign='center' style={{marginTop: 10}}>
                    <Icon name='user' circular/>
                    <Header.Content>USER ID</Header.Content>
                    <Header.Subheader>
                        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.state.user}</div>
                        <div>
                            <Statistic>
                                <Statistic.Value>
                                    <Rating maxRating={5} rating={avgRate} icon='star' size='tiny' disabled/>
                                </Statistic.Value>
                                <Statistic.Label>Average rating of {this.state.ratingCount} user(s)</Statistic.Label>
                            </Statistic>
                        </div>
                    </Header.Subheader>
                </Header>

                <Divider hidden/>

                <Grid columns='equal' divided>
                    <Grid.Row>
                        <Grid.Column textAlign='right'>
                            <Statistic size='small'>
                                <Statistic.Value>
                                    {this.state.timesRenting}
                                </Statistic.Value>
                                <Statistic.Label>
                                    <span>Times Rented</span>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic size='small'>
                                <Statistic.Value>
                                    {this.state.timesBorrowing}
                                </Statistic.Value>
                                <Statistic.Label>
                                    <span>Times Borrowed</span>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Comment.Group style={{ marginTop: 50 }} size='large'>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    {this.renderComments()}

                </Comment.Group>
                
                <div style={{ marginTop: marginSize }}>Found {this.state.ratingCount} Comment(s).</div>
            </React.Fragment>
        );
    }

    renderNonUser() {
        return(
            <React.Fragment>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='user' circular />
                    <Header.Content>GUEST USER</Header.Content>
                    <Header.Subheader>
                        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.state.address}</div>
                    </Header.Subheader>
                </Header>
                
                <Grid columns='equal' divided>
                    <Grid.Row centered>
                        <Grid.Column textAlign='center'>
                            <Divider hidden/>
                            <h3>Start borrowing and lending at your most convenience!</h3>
                            <Divider hidden/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='right'>
                            <Button primary size='large' onClick={() => Router.push('/')}>Start Borrowing</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary size='large' onClick={() => Router.push('/rents/lend')}>Start Lending</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }

    render() {
        const avgRate = this.state.ratingCount? (Math.round(this.state.sumRating / this.state.ratingCount)) : 0;
        const ownProfile = this.props.address == 'user' && this.state.address;
        const whichProfile = ownProfile ? 'Your Profile' : 'User Profile';
        return(
            <Layout>
                <h3>{whichProfile}</h3>
                {ownProfile && <Message color='green' compact style={{marginTop: 0, padding: 10}}>
                    <Icon name='check circle'/>
                    Your profile is verified
                </Message>}

                {this.state.isUser? this.renderUser(avgRate) : this.renderNonUser()}
                
                <Divider hidden/>

                <Dimmer active={this.state.loader} inverted style={{ position: 'fixed' }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Layout>
        );
    }
}

export default ProfileShow;