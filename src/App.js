import './App.css';
import Axios from 'axios';
import { useState } from "react"
import RecipeTile from './RecipeTile';
function App() {
  const [query, setQuery] = useState('');  
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabel] = useState("vegan")
  var url = 'https://api.edamam.com/search?q='+query+'&app_id=e809220e&app_key=ba152795aeafa6ba51f27de259ed2d4b&health='+healthLabel;

  async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }


  return (
    <div className="app">
     <h1>High End Secret Recipes ✔️</h1>
     <form className="app__searchForm" onSubmit={onSubmit}>
       <input 
       type="text" 
       className="app__input"
       placeholder="Enter Ingredient" 
       value={query}
       onChange={(e) => setQuery(e.target.value)} 
       />
       <input className="app__submit" type="submit" value="Search"/>
          
        <select className="app_healthLabels">
          <option onClick={() => sethealthLabel("vegan")}>
            Vegan
          </option>
          <option  onClick={() => sethealthLabel("vegetarian")}>
            Vegetarian
          </option>
          <option onClick={() => sethealthLabel("paleo")}>
            Paleo
          </option>
          <option onClick={() => sethealthLabel("dairy-free")}>
            Dairy Free
          </option>
          <option onClick={() => sethealthLabel("gluten-free")}>
            Gluten Free
          </option>
          <option onClick={() => sethealthLabel("wheat-free")}>
            Wheat Free
          </option>
          <option onClick={() => sethealthLabel("low-sugar")}>
            Low Sugar
          </option>
          <option onClick={() => sethealthLabel("egg-free")}>
            Egg Free
          </option>
          <option onClick={() => sethealthLabel("peanut-free")}>
            Peanut Free
          </option>
          <option onClick={() => sethealthLabel("tree-nut-free")}>
            Tree Nut Free
          </option>
          <option onClick={() => sethealthLabel("soy-free")}>
            Soy Free
          </option>
          <option onClick={() => sethealthLabel("fish-free")}>
            Fish Free
          </option>
          <option onClick={() => sethealthLabel("sellfish-free")}>
            Shellfish Free
          </option>

        </select>
     </form>
     <div className='app__recipes'>
      {recipes.map((recipe) =>{
         return <RecipeTile recipe={recipe}/>;
      })}
     </div>
    </div>
  );
}

export default App;
