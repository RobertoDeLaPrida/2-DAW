import * as React from 'react';
import { Component } from 'react';


class Contador extends Component {
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
      return (
        <div>
          <p>Count: {this.state.count}</p>
          <button onClick={this.handleIncrement}>Increment</button>
          <button onClick={this.handleDecrement}>Decrement</button>
          {this.state.count === 0 ? (
            <p>El contador está en cero.</p>
          ) : this.state.count % 2 === 0 ? (
            <p>El contador es par.</p>
          ) : (
            <p>El contador es impar.</p>
          )}
        </div>
      );
    }
  }
  export default Contador;