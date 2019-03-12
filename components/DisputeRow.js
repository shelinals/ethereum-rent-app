import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Router } from '../routes';

class DisputeRow extends Component {
    onApprove = async () => {
        const rent = Rental(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await rent.methods.approveDispute(this.props.index).send({
            from: accounts[0]
        });
    };

    onReject = async () => {
        const rent = Rental(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await rent.methods.rejectDispute(this.props.index).send({
            from: accounts[0]
        });
    };

    render() {
        const { Row, Cell } = Table;
        const { address, dispute } = this.props;
        const status = dispute.complete? 'Voting Closed' : 'Voting Open';
        return (
            <Row disabled={dispute.complete} positive={!dispute.complete}>
                <Cell>{address}</Cell>
                <Cell>{dispute.disputer}</Cell>
                <Cell>{dispute.approvalCount}</Cell>
                <Cell>{dispute.rejectionCount}</Cell>
                <Cell>
                    <Button primary 
                            onClick={() => Router.pushRoute(`/disputes/${address}`)}>
                            Vote
                    </Button>
                </Cell>
                <Cell>{status}</Cell>
            </Row>
        );
    }
}

export default DisputeRow;