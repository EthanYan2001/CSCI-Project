import React from 'react'
import "./RecipeTile.css"
//import {} from "./firebasefirestore";
//import {saveRecipe} from "./App"
export default function RecipeTile({recipe ,minCalorie,maxCalorie,healthLabel,dishType}) {


if(recipe['recipe']['calories'] >= minCalorie){
  if(recipe['recipe']['calories']<= maxCalorie){
if(recipe['recipe']['healthLabels'].includes(healthLabel) == true){


if(recipe['recipe']['dishType'].includes(dishType) == true){

 return (
    
  <div className="recipeTile">
    
        <a href={recipe["recipe"]["shareAs"]}  target="_blank">
        <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
        </a>
       <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
       <button onClick = {saveRecipe}> Save Button</button>

        </div>
    
  );
}else{
  if(dishType == ''){
    return (
    
      <div className="recipeTile">
       
            <a href={recipe["recipe"]["shareAs"]}  target="_blank">
            <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
            </a>
           
           <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
           <button onClick> Save Button</button>
            </div>
        
      );
  }else{
    return null;
  }
}









  }else{
    if(healthLabel == ''){
      if(recipe['recipe']['dishType'].includes(dishType) == true){
      return (
    
        <div className="recipeTile">
        
              <a href={recipe["recipe"]["shareAs"]}  target="_blank">
              <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
              </a>
              
             <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
             <button onClick> Save Button</button>
              </div>
          
        );
      }else{
        if(dishType == ''){
          return (
    
            <div className="recipeTile">
             
                  <a href={recipe["recipe"]["shareAs"]}  target="_blank">
                  <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
                  </a>
                
                 <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
                 <button onClick> Save Button</button>
                  </div>
              
            );
        }else{
          return null;
        }
      }



    }else{
      return null;
    }







  }












  }else{
    return null;
  }

  }else{
    return null;
  }
}
