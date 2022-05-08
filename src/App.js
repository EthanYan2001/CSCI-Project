import './App.css';
import Axios from 'axios';
import { useState, useEffect} from "react"
import RecipeTile from './RecipeTile';
import {collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { auth } from './firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from '@firebase/auth';
import { async } from '@firebase/util';


function App() {
  const [dishType,setDishType]=useState('')
  const [maxCalorie,setMaxCalorie]=useState(99999)
  const [minCalorie,setMinCalorie]=useState(0)
  const [query, setQuery] = useState('');  
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabel] = useState('')
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  //const saveRecipeCollectionRef = collection(db, "saveRecipe");
  const[newEmail, setNewLogin] = useState("");
  const[newPass, setNewPass] = useState("");
  const[registerEmail, setRegisterEmail] = useState('');
  const[registerPassword, setRegisterPassword] = useState('');
  const[loginEmail, setLoginEmail] = useState('');
  const[loginPassword, setLoginPassword] = useState('');
  
 const [user, setUser] = useState({});
 
//  onAuthStateChanged(auth, (currentUser) => {
//    setUser(currentUser);
//  });

  var url = 'https://api.edamam.com/search?q='+query+'&app_id=e809220e&app_key=ba152795aeafa6ba51f27de259ed2d4b';

  async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    //setNewUrl(result.data.hits[0].recipe.url)
    console.log(result.data)
  }

  function calorie(min,max){
    setMinCalorie(min);
    setMaxCalorie(max);
  }

  // function myOnClickButton() {
  //   document.location.href = "Signup.html";
  // }

  function saveRecipeCollectionRef() {

  }
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  const createUser = async () => {
    await addDoc(usersCollectionRef, {Login: newEmail, Pass: newPass });
    // var popup = document.createElement("span");
    // popup.className = "popup";
    // popup.innerText = "You've signed in";
    // document.querySelector("#root > div > form").appendChild(popup);
  };
  
  useEffect(() => {
    const getUsers = async() => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  //register constant
  const register = async() => {
  try {
    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    console.log(user)
  }catch (error) {
    console.log(error.message);
   }
  };

  //login constant: it would let us know in db that theres an acc and we can use to login
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user)
    }catch (error) {
      console.log(error.message);
     }
  };

  //logout constant: where we can log out
  const logout = async () => {
    await signOut(auth);
  }
  
  return (
    <div className="app">
     <h1></h1>

     <form className="app__searchForm" onSubmit={onSubmit}>
       <input 
       type="text" 
       className="app__input"
       placeholder="What Are You Craving?" 
       value={query}
       onChange={(e) => setQuery(e.target.value)} 
       />
       <input className="app__submit" type="submit" value="Search"/>

<div className='calo'>
       <button className='suus1' onClick={() => calorie(0,500)}>0-500</button>
       <button className='suus2' onClick={() => calorie(501,1000)}>501-1000</button>
       <button className='suus3' onClick={() => calorie(1001,1500)}>1001-1500</button>
       <button className='suus4' onClick={() => calorie(1501,2000)}>1501-2000</button>
       <button className='suus5' onClick={() => calorie(0,99999)}>All</button>
</div>

        <button className='bust1' onClick={() => setDishType("alcohol-cocktail")}>Alcohol Cocktail</button>
        <button className='bust2' onClick={() => setDishType("bread")}>Bread</button>
        <button className='bust3' onClick={() => setDishType("cereals")}>Cereals</button>
        <button className='bust4' onClick={() => setDishType("drinks")}>Drinks</button>
        <button className='bust5' onClick={() => setDishType("desserts")}>Desserts</button>
        <button className='bust6' onClick={() => setDishType("main course")}>Main Course</button>
        <button className='bust7' onClick={() => setDishType("preserve")}>Preserve</button>
        <button className='bust8' onClick={() => setDishType("soup")}>Soup</button>
        <button className='bust9' onClick={() => setDishType("starter")}>Starter</button>
        <button className='bust11' onClick={() => setDishType("salad")}>Salad</button>
        <button className='bust12' onClick={() => setDishType("")}>Reset</button>


        <button className='what1' onClick={() => sethealthLabel("Alcohol-Free")}>Alcohol Free</button>
        <button className='what2'  onClick={() => sethealthLabel("Dairy-Free")}>Dairy Free</button>
        <button className='what3'  onClick={() => sethealthLabel("Gluten-Free")}>Gluten Free</button>
        <button className='what4'  onClick={() => sethealthLabel("Keto-Friendly")}>Keto Friendly</button>
        <button className='what5'  onClick={() => sethealthLabel("Kosher")}>Kosher</button>
        <button className='what6'  onClick={() => sethealthLabel("Low-Fat-Abs")}>Low Fat Abs</button>
        <button className='what7'  onClick={() => sethealthLabel("No-Oil-Added")}>No Oil Added</button>
        <button className='what8'  onClick={() => sethealthLabel("Low-Sugar")}>Low Sugar</button>
        <button className='what9'  onClick={() => sethealthLabel("Peanut-Free")}>Peanut Free</button>
        <button className='what11'  onClick={() => sethealthLabel("Pecatarian")}>Pecatarian</button>
        <button className='what12'  onClick={() => sethealthLabel("Red-Meat-Free")}>Red Meat Free</button>
        <button className='what13'  onClick={() => sethealthLabel("Shellfish-Free")}>Shellfish Free</button>
        <button className='what14'  onClick={() => sethealthLabel("Soy-Free")}>Soy Free</button>
        <button className='what15'  onClick={() => sethealthLabel("Tree-Nut-Free")}>Tree Nut Free</button>
        <button className='what16'  onClick={() => sethealthLabel("Vegan")}>Vegan</button>
        <button className='what17'  onClick={() => sethealthLabel("Vegetarian")}>Vegetarian</button>
        <button className='what18'  onClick={() => sethealthLabel("Wheat-Free")}>Wheat Free</button>
        <button className='what19'  onClick={() => sethealthLabel("")}>Reset</button>
        <button className='signupbutton'  onClick={() => sethealthLabel("")}>Sign Up!</button>
       
      
        { <><input placeholder="Email"
          onChange={(event) => {
            setNewLogin(event.target.value);
          } } /><input placeholder="Password"
            onChange={(event) => {
              setNewPass(event.target.value);
            } } /></>
           
} 
{ <button onClick = {createUser}> Login </button>}

{/* Register button that would allow the button to successfully register with email and password */}
<div>
  <h3> Register </h3>
 <input placeholder = "Email..." onChange = {(event) => {setRegisterEmail(event.target.value);
  }}
 />
 <input placeholder= "Password..."onChange = {(event) => {setRegisterPassword(event.target.value)
  }}
 />
  <button onClick = {register}> Sign Up </button>
</div>

{/* Login button that allows u to login successfully based on the databased saved from registering */}
<div>
  <h3> Login </h3>
  <input placeholder = "Email..." onChange = {(event) => {setLoginEmail(event.target.value);
  }}
 />
 <input placeholder= "Password..."onChange = {(event) => {setLoginPassword(event.target.value)
  }}
 />

 <button onClick = { login }> Login </button>
 </div>

{/* This is just to authenticate that the email has been login and displayed the email.  */}
<h4> User Logged In: </h4>
{user?.email}

{/* Log out button based on the logout constant. it lets you logout from the user based on the login databased above. */}
<button onClick= { logout }> Sign Out </button>




{/* {users.map((user) => {
   return <div>
     <h1>Login: {user.Login} </h1>
     <h1>Pass: {user.Pass} </h1>
   </div>
 })
 } */}


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
