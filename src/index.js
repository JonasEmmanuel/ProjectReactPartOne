import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class ListIng extends React.Component {
  constructor() {
    super();
    this.state = {
      newItemInput: "",
      listing: ["foo", "bar"]
    };
  }

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.newItemInput}
            onChange={this.onNewItemInputChange}
          />
        </div>

        <button onClick={this.addNewItem}>Ajouter Ingredient</button>

        <div>
          <ul>
            {this.state.listing.map((element, index) => <li>{element}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  onNewItemInputChange = event => {
    this.setState({ newItemInput: event.target.value });
  };

  addNewItem = () => {
    console.log(this.state);
    this.setState(prevState => {
      if (prevState.newItemInput.trim() === "") {
        return null;
      }
      return {
        listing: [...prevState.listing, prevState.newItemInput.trim()],
        newItemInput: ""
      };
    });
  };
}

ReactDOM.render(<ListIng />, document.getElementById("root"));
