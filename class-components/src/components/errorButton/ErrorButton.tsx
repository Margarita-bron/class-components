import { Component, type ReactNode } from 'react';
import type { ErrorButtonState } from '../../types/error-button-types';
import './error-button.css';

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
