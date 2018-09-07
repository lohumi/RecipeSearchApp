import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY="d38e14255963af6eb7156687c88cb806";

class App extends Component {
  /* No need to create constructor function in React version 16 */
  // constructor(props);{
  // super(props);
  // }
  state={
    recipes:[]
  }

  getRecipe = async(e)=>{
    const recipeName=e.target.elements.recipeName.value;
    e.preventDefault();
    //append heroku cors url at the beigning to prevent CORS error.
    const api_call= await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`); 

    const data=await api_call.json();
    this.setState({recipes:data.recipes});
    // console.log(data.recipes[0]);

  }
  componentDidMount(){
    const jsonData=localStorage.getItem("recipes");
    const recipes=JSON.parse(jsonData);
    this.setState({recipes:recipes});
  }
  componentDidUpdate(){
    const recipes=JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes",recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>

      </div>
    );
  }
}

export default App;
