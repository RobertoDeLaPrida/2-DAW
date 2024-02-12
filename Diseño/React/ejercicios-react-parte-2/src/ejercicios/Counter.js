import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  };

  render() {
    const { count } = this.state;
    let message;
    if (count === 0) {
      message = 'El contador está en cero';
    } else if (count % 2 === 0) {
      message = 'El contador es un número par';
    } else {
      message = 'El contador es un número impar';
    }
    return (
      <div>
        <p>Contador: {count}</p>
        <button onClick={this.handleIncrement}>Incrementar</button>
        <button onClick={this.handleDecrement}>Decrementar</button>
        <p>{message}</p>
      </div>
    );
  }
}

 

export default Counter;