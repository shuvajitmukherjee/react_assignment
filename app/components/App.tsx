import * as React from 'react';

export interface Demo {
    compiler: string,
    framework: string
}

export class App extends React.Component<Demo, {}> {
    render() {
        return <h1>{this.props.compiler} and {this.props.framework} </h1>;
    }
}