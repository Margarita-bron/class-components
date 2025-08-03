import { Component, type ReactNode } from 'react';
import './error-button.css';

export type ErrorButtonState = {
  throwError: boolean;
};

export class ErrorButton extends Component<object, ErrorButtonState> {
  state = { throwError: false };

  handleClick = (): void => {
    this.setState({ throwError: true });
  };

  render(): ReactNode {
    if (this.state.throwError) {
      throw new Error('Test error');
    }

    return (
      <button className="error-button" onClick={this.handleClick}>
        CALL ERROR
      </button>
    );
  }
}
