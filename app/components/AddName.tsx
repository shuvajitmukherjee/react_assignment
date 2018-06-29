import * as React from 'react';

export class AddName extends React.Component {

    state: {
        newName: string
    };
    props: {
        addNew?: Function
    };

    constructor(props: any) {
        super(props);

        this.state = {
            newName: ''
        };
        this.updateName = this.updateName.bind(this);
        this.handleAddName = this.handleAddName.bind(this);
    };

    updateName(eve: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            newName: eve.target.value
        })
    }

    handleAddName() {
        this.props.addNew(this.state.newName);
        this.setState({
            newName: ''
        });
    }

    render() {
        return (
            <div>
                <h2>Add Name Component</h2>
                <br />
                <input type="text" id="addName" value={this.state.newName} onChange={this.updateName} />
                <br />
                <button onClick={this.handleAddName}>Add</button>
            </div>
        )
    }
}