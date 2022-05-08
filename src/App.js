import './App.css';
import Axios from 'axios';
import { useState, useEffect} from "react"
import RecipeTile from './RecipeTile';
import {collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";


function App() {
  const [dishType,setDishType]=useState('')
  const [maxCalorie,setMaxCalorie]=useState(99999)
  const [minCalorie,setMinCalorie]=useState(0)
  const [query, setQuery] = useState('');  
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabel] = useState('')
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const[newLogin, setNewLogin] = useState("");
  const[newPass, setNewPass] = useState("");

  var url = 'https://api.edamam.com/search?q='+query+'&app_id=e809220e&app_key=ba152795aeafa6ba51f27de259ed2d4b';

  async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data)
  }

  const createUser = async () => {
    await addDoc(usersCollectionRef, {Login: newLogin, Pass: newPass });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  function calorie(min,max){
    setMinCalorie(min);
    setMaxCalorie(max);
  }


  useEffect(() => {
    const getUsers = async() => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

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
       
       <input placeholder="Login..." 
       onChange={(event) => {
         setNewLogin(event.target.value);
       }}
       />
       <input placeholder="Pass..." 
       onChange={(event) => {
         setNewPass(event.target.value);
       }}
        />
       <button onClick = {createUser}> Create User </button>

       {users.map((user) => {
          return <div>
            <h1>Login: {user.Login} </h1>
            <h1>Pass: {user.Pass} </h1>
          </div>
        })}

       <button onClick={() => calorie(0,500)}>0-500</button>
       <button onClick={() => calorie(501,1000)}>501-1000</button>
       <button onClick={() => calorie(1001,1500)}>1001-1500</button>
       <button onClick={() => calorie(1501,2000)}>1501-2000</button>
       <button onClick={() => calorie(0,99999)}>All</button>




        <button onClick={() => setDishType("alcohol-cocktail")}>Alcohol Cocktail</button>
        <button onClick={() => setDishType("bread")}>Bread</button>
        <button onClick={() => setDishType("cereals")}>Cereals</button>
        <button onClick={() => setDishType("drinks")}>Drinks</button>
        <button onClick={() => setDishType("desserts")}>Desserts</button>
        <button onClick={() => setDishType("main course")}>Main Course</button>
        <button onClick={() => setDishType("preserve")}>Preserve</button>
        <button onClick={() => setDishType("soup")}>Soup</button>
        <button onClick={() => setDishType("starter")}>Starter</button>
        <button onClick={() => setDishType("salad")}>Salad</button>
        <button onClick={() => setDishType("")}>Reset</button>





        <button onClick={() => sethealthLabel("Alcohol-Free")}>Alcohol Free</button>
        <button onClick={() => sethealthLabel("Dairy-Free")}>Dairy Free</button>
        <button onClick={() => sethealthLabel("Gluten-Free")}>Gluten Free</button>
        <button onClick={() => sethealthLabel("Keto-Friendly")}>Keto Friendly</button>
        <button onClick={() => sethealthLabel("Kosher")}>Kosher</button>
        <button onClick={() => sethealthLabel("Low-Fat-Abs")}>Low Fat Abs</button>
        <button onClick={() => sethealthLabel("No-Oil-Added")}>No Oil Added</button>
        <button onClick={() => sethealthLabel("Low-Sugar")}>Low Sugar</button>
        <button onClick={() => sethealthLabel("Peanut-Free")}>Peanut Free</button>
        <button onClick={() => sethealthLabel("Pecatarian")}>Pecatarian</button>
        <button onClick={() => sethealthLabel("Red-Meat-Free")}>Red Meat Free</button>
        <button onClick={() => sethealthLabel("Shellfish-Free")}>Shellfish Free</button>
        <button onClick={() => sethealthLabel("Soy-Free")}>Soy Free</button>
        <button onClick={() => sethealthLabel("Tree-Nut-Free")}>Tree Nut Free</button>
        <button onClick={() => sethealthLabel("Vegan")}>Vegan</button>
        <button onClick={() => sethealthLabel("Vegetarian")}>Vegetarian</button>
        <button onClick={() => sethealthLabel("Wheat-Free")}>Wheat Free</button>
        <button onClick={() => sethealthLabel("")}>Reset</button>
       

     </form>
     <div className='app__recipes'>
      {recipes.map((recipe) =>{
         return  <RecipeTile recipe={recipe} minCalorie={minCalorie} maxCalorie={maxCalorie} healthLabel={healthLabel} dishType={dishType}/>;
      })}
     </div>
    </div>
  );
}

export default App;
