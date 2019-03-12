import React, { Component } from 'react';
import { Statistic, Header, Icon, Comment , Rating, Button, Form, Divider } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Profile from '../ethereum/profile';
import Rental from '../ethereum/rental';
import { Link } from '../routes';


class ProfileShow extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const profile = Profile(address);
        const ratingCount = await profile.methods.ratingCounts().call();
        const sumRating = await profile.methods.getSumRating().call();
        const owner = await profile.methods.owner().call();

        const ratings = await Promise.all(
            Array(parseInt(ratingCount))
                .fill()
                .map((element, index) => {
                    return profile.methods.ratings(index).call();
            })
        );

        const productName = await Promise.all(
            Array(parseInt(ratingCount))
                .fill()
                .map((element, index) => {
                    return Rental(ratings[index].productId).methods.productName().call();
            })
        );

        return { address, ratings, ratingCount, sumRating, owner, productName };
    }

    renderComments() {
        return this.props.ratings.map((rating, index) => {
            return (
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author><div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {rating.rater}</div>
                        </Comment.Author>
                        <Comment.Metadata>
                                {'Has borrowed '} 
                                <Link route={`/rents/${rating.productId}`}> 
                                    <a>{this.props.productName[index]}</a> 
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

    render() {
        const avgRate = this.props.ratingCount? (Math.round(this.props.sumRating / this.props.ratingCount)) : 0;

        return(
            <Layout>
                <h3>Owner Profile</h3>

                <Header as='h2' icon textAlign='center'>
                    <Icon name='user' circular />
                    <Header.Content>USER ID</Header.Content>
                    <Header.Subheader>
                        <div style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.props.owner}</div>
                        <div>
                            <Statistic>
                                <Statistic.Value>
                                    <Rating maxRating={5} rating={avgRate} icon='star' size='small' disabled/>
                                </Statistic.Value>
                                <Statistic.Label>Average rating of {this.props.ratingCount} user(s)</Statistic.Label>
                            </Statistic>
                        </div>
                    </Header.Subheader>
                </Header>

                <Comment.Group style={{ marginTop: 50 }} size='large'>
                    <Header as='h3' dividing>
                        Comments
                    </Header>

                    {this.renderComments()}

                </Comment.Group>
                
                <div style={{ marginTop: 50 }}>Found {this.props.ratingCount} Comment(s).</div>
                <Divider hidden/>
            </Layout>
        );
    }
}

export default ProfileShow;