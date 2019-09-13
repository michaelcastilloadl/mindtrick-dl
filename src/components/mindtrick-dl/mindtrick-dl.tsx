import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'mindtrick-dl',
    styleUrl: 'mindtrick-dl.css'
})
export class MindtrickDl {

    @Prop() first: string;
    @Prop() last: string;

    render() {
        return (
            <p>
                Hello, my name is {this.first} {this.last}
            </p>
        );
    }
}
