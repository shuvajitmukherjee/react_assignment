import * as React from 'react';

export class App extends React.Component {
    state: {
        username?: string
    };
    props: {
        toPass?: string
    };

    constructor(props: any) {
        super(props);

        this.state = {
            username: 'sdeb'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(eve: any) {
        this.setState({
            username: eve.target.value
        });
    }

    render() {
        return (
            <div> Hi {this.state.username}
                <br />
                Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
                <br/>
                {this.props.toPass}
            </div>
        );
    }
}