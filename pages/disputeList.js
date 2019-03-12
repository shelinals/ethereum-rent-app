import React, { Component } from 'react';
import { Button, Table, Divider } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import Rental from '../ethereum/rental';
import DisputeRow from '../components/DisputeRow';

class DisputeList extends Component {

    static async getInitialProps() {
        const deployedRents = await factory.methods.getDeployedRentals().call();
        let openDispute = [];
        let openAddress = [];
        let closeDispute = [];
        let closeAddress = [];
        let disputeCounts = 0;
        for (let i=0; i<deployedRents.length; i++) {
            const disputeCount = await Rental(deployedRents[i]).methods.disputeCounts().call();
            const currentlyOpen = await Rental(deployedRents[i]).methods.openDispute().call();
            const rent = Rental(deployedRents[i]);
            if(currentlyOpen){
                const index = disputeCount - 1;
                const open = await rent.methods.disputes(index).call();
                openDispute.push(open);
                openAddress.push(deployedRents[i]);

                if(disputeCount > 1){
                    const closed = await Promise.all(
                        Array(parseInt(disputeCount - 1))
                            .fill()
                            .map((element, index) => {
                            return rent.methods.disputes(index).call();
                        })
                    );
                    const closedAddress = Array(parseInt(disputeCount - 1))
                                        .fill(deployedRents[i]);
                    closeDispute = [ ...closeDispute, ...closed ];
                    closeAddress = [ ...closeAddress, ...closedAddress ];
                }
            } else if(disputeCount > 0) {
                const closed = await Promise.all(
                    Array(parseInt(disputeCount))
                        .fill()
                        .map((element, index) => {

                        return rent.methods.disputes(index).call();
                    })
                );
                const closedAddress = Array(parseInt(disputeCount))
                                    .fill(deployedRents[i]);
                closeDispute = [ ...closeDispute, ...closed ];
                closeAddress = [ ...closeAddress, ...closedAddress ];
            }
            disputeCounts += parseInt(disputeCount);
        }

        return { openDispute, closeDispute, openAddress, closeAddress, disputeCounts };
    }

    renderRowOpen() {
        return this.props.openDispute.map((dispute, index) => {
            return <DisputeRow
                key={index}
                index={index}
                dispute={dispute}
                address={this.props.openAddress[index]}
            />
        });
    }

    renderRowClosed() {
        return this.props.closeDispute.map((dispute, index) => {
            return <DisputeRow
                key={index}
                index={index}
                dispute={dispute}
                address={this.props.closeAddress[index]}
            />
        });
    }

    render() {

        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3>Dispute List</h3>
                { this.props.disputeCounts ? <Table fixed unstackable>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Disputer</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Rejection Count</HeaderCell>
                            <HeaderCell>Vote</HeaderCell>
                            <HeaderCell>Remarks</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRowOpen()}
                        {this.renderRowClosed()}
                    </Body>
                </Table> : null}
                <Divider hidden/>
                <div>Found {this.props.disputeCounts} dispute(s).</div>
                <Divider hidden/>
            </Layout>
        );
    }
}

export default DisputeList;