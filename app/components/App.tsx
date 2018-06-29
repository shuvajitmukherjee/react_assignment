import * as React from 'react';
import { ShowNames } from './ShowNames';
import { AddName } from './AddName';

export class App extends React.Component {

    state: {
        username?: string,
        dataList?: string[]
    };
    props: {
        toPass?: string
    };

    constructor(props: any) {
        super(props);

        this.state = {
            username: 'sdeb',
            dataList: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.addName = this.addName.bind(this);
    }

    handleChange(eve: any) {
        this.setState({
            username: eve.target.value
        });
    }

    addName(eve: string) {
        this.setState((state: {
            dataList: string[]
        }) => ({
            dataList: state.dataList.concat(eve)
        }));
    }

    render() {
        return (
            <div> Hi {this.state.username}
                <br />
                Change Name: <input className="input-txt" type="text" value={this.state.username} onChange={this.handleChange} />
                <br />
                {this.props.toPass}
                <br />
                <AddName addNew={this.addName} />
                <ShowNames names={this.state.dataList} />
            </div>
        );
    }
}