import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { ethers } from 'ethers';
import { Router } from '../routes';

class DisputeRowDesktop extends Component {

    render() {
        const { Row, Cell } = Table;
        const { address, dispute, addressIndex } = this.props;
        const incentives = ethers.utils.formatUnits(dispute.incentives, "ether") + ' ETH';
        const status = dispute.complete? 'Voting Closed' : 'Voting Open';
        const button = dispute.complete? 'Details' : 'Vote';
        return (
            <Row negative={dispute.complete} positive={!dispute.complete}>
                <Cell>{address}</Cell>
                <Cell>{dispute.disputer}</Cell>
                <Cell>{incentives}</Cell>
                <Cell>{dispute.approvalCount}</Cell>
                <Cell>{dispute.rejectionCount}</Cell>
                <Cell>
                    <Button primary
                            onClick={() => Router.pushRoute(`/disputes/${address}/${addressIndex}`)}>
                            {button}
                    </Button>
                </Cell>
                <Cell>{status}</Cell>
            </Row>
        );
    }
}

class DisputeRowMobile extends Component {

    render() {
        const { Row, Cell } = Table;
        const { address, dispute, addressIndex } = this.props;
        const incentives = ethers.utils.formatUnits(dispute.incentives, "ether") + ' ETH';
        const status = dispute.complete? 'Voting Closed' : 'Voting Open';
        const button = dispute.complete? 'Details' : 'Vote';
        return (
            <React.Fragment>
                <Row>
                    <Cell colSpan='2'>
                        <div style={{whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                            <span style={{ fontWeight: 'bold' }}>Product ID: {address}</span>
                        </div>
                    </Cell>
                </Row>
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Disputer</Cell>
                    <Cell>{dispute.disputer}</Cell>
                </Row>
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Total Incentives Left</Cell>
                    <Cell>{incentives}</Cell>
                </Row>
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Approval Count</Cell>
                    <Cell>{dispute.approvalCount}</Cell>
                </Row>
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Rejection Count</Cell>
                    <Cell>{dispute.rejectionCount}</Cell>
                </Row>    
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Vote</Cell>
                    <Cell>
                        <Button primary
                                onClick={() => Router.pushRoute(`/disputes/${address}/${addressIndex}`)}>
                                {button}
                        </Button>
                    </Cell>
                </Row>
                <Row negative={dispute.complete} positive={!dispute.complete}>
                    <Cell>Remarks</Cell>
                    <Cell>{status}</Cell>
                </Row>
            </React.Fragment>
        );
    }
}

export {
    DisputeRowDesktop,
    DisputeRowMobile
};