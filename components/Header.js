import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return(
        <Menu inverted stackable>
            <Menu.Item header>
                Ethereum Rent
            </Menu.Item>

            <Link route="/">
                <a className = "item">
                    Home
                </a>
            </Link>

            <Menu.Menu position ="right">
                <Link route="/rents/lend">
                    <a className = "item">
                        Add Rent Items
                    </a>
                </Link>

                <Link route="/rents/manage">
                    <a className = "item">
                        Manage Items
                    </a>
                </Link>
                
                <Link route="/rents/scancode">
                    <a className = "item">
                        Scan QR Code
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};