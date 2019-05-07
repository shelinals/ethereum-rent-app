import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';
import { Button, Table, Divider, Responsive } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import Rental from '../ethereum/rental';
import { DisputeRowDesktop, DisputeRowMobile } from '../components/DisputeRow';
import { getWidthFactory } from '../utils/device';

class DisputeList extends Component {

    static async getInitialProps({ req }) {
        const deployedRents = await factory.methods.getDeployedRentals().call();
        let openDispute = [];
        let openAddress = [];
        let openAddressIdx = [];
        let closeDispute = [];
        let closeAddress = [];
        let closeAddressIdx = [];
        let disputeCounts = 0;
        for (let i=0; i<deployedRents.length; i++) {
            const disputeCount = await Rental(deployedRents[i]).methods.disputeCounts().call();
            const currentlyOpenRenter = await Rental(deployedRents[i]).methods.openDisputeRenter().call();
            const currentlyOpenOwner = await Rental(deployedRents[i]).methods.openDisputeOwner().call();
            const rent = Rental(deployedRents[i]);
            if(currentlyOpenRenter || currentlyOpenOwner){
                const index = disputeCount - 1;
                const open = await rent.methods.disputes(index).call();
                openDispute.push(open);
                openAddress.push(deployedRents[i]);
                openAddressIdx.push(index);

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
                    const closedAddressIdx = Array.from(new Array(disputeCount - 1), (val,index) => index);                   
                    closeDispute = [ ...closeDispute, ...closed ];
                    closeAddressIdx = [ ...closeAddressIdx, ...closedAddressIdx];
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
                const closedAddressIdx = Array.from(new Array(disputeCount - 1), (val,index) => index); 
                closeDispute = [ ...closeDispute, ...closed ];
                closeAddressIdx = [ ...closeAddressIdx, ...closedAddressIdx];
                closeAddress = [ ...closeAddress, ...closedAddress ];
            }
            disputeCounts += parseInt(disputeCount);
        }

        let isMobileFromSSR = false;

        if(req){
            const device = req.headers["user-agent"];
            const md = new MobileDetect(device);
            isMobileFromSSR = !!md.mobile();
        }

        return { openDispute, closeDispute, openAddress, closeAddress, openAddressIdx, 
                closeAddressIdx, disputeCounts, isMobileFromSSR };
    }

    renderRowOpenD() {
        return this.props.openDispute.map((dispute, index) => {
            return <DisputeRowDesktop
                key={index}
                index={index}
                dispute={dispute}
                addressIndex={this.props.openAddressIdx[index]}
                address={this.props.openAddress[index]}
            />
        });
    }

    renderRowClosedD() {
        return this.props.closeDispute.map((dispute, index) => {
            return <DisputeRowDesktop
                key={index}
                index={index}
                dispute={dispute}
                addressIndex={this.props.closeAddressIdx[index]}
                address={this.props.closeAddress[index]}
            />
        });
    }

    renderTableDesktop() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <React.Fragment>
                { this.props.disputeCounts ? 
                <Responsive fireOnMount as={Table} getWidth={getWidthFactory(this.props.isMobileFromSSR)} 
                            minWidth={Responsive.onlyTablet.minWidth} fixed unstackable>
                    <Header>
                        <Row>
                            <HeaderCell>Product ID</HeaderCell>
                            <HeaderCell>Disputer</HeaderCell>
                            <HeaderCell>Total Incentives Left</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Rejection Count</HeaderCell>
                            <HeaderCell>Vote</HeaderCell>
                            <HeaderCell>Remarks</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRowOpenD()}
                        {this.renderRowClosedD()}
                    </Body>
                </Responsive> : null}
            </React.Fragment>
        );
    }

    renderRowOpenM() {
        return this.props.openDispute.map((dispute, index) => {
            return <DisputeRowMobile
                key={index}
                index={index}
                dispute={dispute}
                addressIndex={this.props.openAddressIdx[index]}
                address={this.props.openAddress[index]}
            />
        });
    }

    renderRowClosedM() {
        return this.props.closeDispute.map((dispute, index) => {
            return <DisputeRowMobile
                key={index}
                index={index}
                dispute={dispute}
                addressIndex={this.props.closeAddressIdx[index]}
                address={this.props.closeAddress[index]}
            />
        });
    }

    renderTableMobile() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <React.Fragment>
                { this.props.disputeCounts ? 
                <Responsive fireOnMount as={Table} getWidth={getWidthFactory(this.props.isMobileFromSSR)} 
                            maxWidth={Responsive.onlyMobile.maxWidth} fixed unstackable structured>
                    <Body>
                        {this.renderRowOpenM()}
                        {this.renderRowClosedM()}
                    </Body>
                </Responsive> : null}
            </React.Fragment>
        );
    }

    render() {

        return(
            <Layout>
                <h3>Dispute List</h3>
                
                {this.renderTableDesktop()}
                {this.renderTableMobile()}

                <Divider hidden/>
                <div>Found {this.props.disputeCounts} dispute(s).</div>
                <Divider hidden/>
            </Layout>
        );
    }
}

export default DisputeList;