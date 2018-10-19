import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const receips = [
  { name: "Yolo1", ingredients: ["eggs"] },
  { name: "Yolo2", ingredients: ["eggs", "cheeese"] },
  { name: "Yolo3", ingredients: ["eggs", "cheeese", "bla"] },
  { name: "Yolo4", ingredients: ["eggs", "cheeese"] },
  { name: "Yolo5", ingredients: ["eggs", "cheeese"] }
];

const InputIngredient = props => (
  <div>
    <input
      type="text"
      className="input"
      value={props.value}
      onChange={props.onChange}
    />
    <button onClick={props.onDelete}> Supprimer Ingredient </button>
  </div>
);

class ListIng extends React.Component {
  constructor() {
    super();
    this.state = {
      newItemInput: "",
      listing: ["Lait", "oeuf"],
      newInputReceips: "",
      receips: [{ name: "Quiche", ingredients: ["eggs", "Lait"] }],
      ingredientsInputs: []
    };
  }

  render() {
    const matchingReceips = this.state.receips.filter(receip => {
      if (receip.ingredients.length === this.state.listing.length) {
        return true;
      }
      return false;
    });

    return (
      <div className="panels">
        {/* Div Ingredients*/}
        <div className="panel">
          <div className="card">
            <input
              value={this.state.newItemInput}
              className="input"
              onChange={event =>
                this.onNewItemInputChange(event, "newItemInput")
              }
            />
            <button className="button" onClick={this.addNewItem}>
              Ajouter Ingredient
            </button>
            <button className="button" onClick={this.resetItem}>
              Reset The List{" "}
            </button>
            <ul className="list">
              {this.state.listing.map((element, index) => <li>{element}</li>)}
            </ul>
            <div className="list">
              {matchingReceips.map(receip => <div>{receip.name}</div>)}
            </div>
          </div>
        </div>
        {/* Div Receips*/}
        <div className="panel">
          <div className="card">
            <input
              value={this.state.newInputReceips}
              className="input"
              onChange={event =>
                this.onNewItemInputChange(event, "newInputReceips")
              }
            />
            <button className="button" onClick={this.onAddReceips}>
              {" "}
              Valider un Receip
            </button>
            <button className="button" onClick={this.onAddIngredient}>
              {" "}
              Ajouter Ingredient
            </button>

            <div>
              {this.state.ingredientsInputs.map((element, index) => (
                <InputIngredient
                  value={element}
                  onChange={event => this.onIngredientInputChange(event, index)}
                  onDelete={event => this.onDeleteIngredient(index)}
                />
              ))}
            </div>

            <div>
              <h1>Les Recettes Enregistrées</h1>
              <ul>
                {this.state.receips.map((element, index) => (
                  <li>{element.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAddIngredient = () => {
    this.setState(prevState => ({
      ingredientsInputs: [...prevState.ingredientsInputs, ""]
    }));
  };

  onDeleteIngredient = index => {
    this.setState(prevState => {
      const copy = [...prevState.ingredientsInputs];
      copy.splice(index, 1);
      return { ingredientsInputs: copy };
    });
  };

  onNewItemInputChange = (event, name) => {
    this.setState({ [name]: event.target.value });
    //[name] = evalue la valeur de name
  };

  onIngredientInputChange = (event, ingredientsIndex) => {
    const value = event.target.value;
    this.setState(prevState => {
      const clone = [...prevState.ingredientsInputs];
      clone[ingredientsIndex] = value;
      return { ingredientsInputs: clone };
    });
  };

  addNewItem = () => {
    console.log(this.state);
    this.setState(prevState => {
      if (prevState.newItemInput.trim() === "") {
        return null;
      }
      return {
        listing: [...this.state.listing, this.state.newItemInput],
        newItemInput: ""
      };
    });
  };
  onAddReceips = () => {
    this.setState(prevState => {
      return {
        receips: [
          ...prevState.receips,
          {
            name: prevState.newInputReceips,
            ingredients: [...prevState.ingredientsInputs]
          }
        ],
        newInputReceips: "",
        ingredientsInputs: []
      };
    });
  };

  resetItem = () => {
    this.setState({
      listing: [],
      newItemInput: ""
    });
  };
}

ReactDOM.render(<ListIng />, document.getElementById("root"));
