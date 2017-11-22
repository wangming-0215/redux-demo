import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.input.value.trim()) {
      return;
    }
    this.props.submit(this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            ref={input => {
              this.input = input;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
