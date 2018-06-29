import * as React from 'react';

export class ShowNames extends React.Component {

    props: {
        names: string[]
    };

    render() {
        return (
            <div>
                <h2>Names List:</h2>
                <br />
                <ul>
                    {this.props.names.map((name, index) => {
                        return <li key={'moon' + index} > {name}</li>
                    })}
                </ul>
            </div>
        )
    }
}