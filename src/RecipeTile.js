import React, { useState } from 'react'
import "./RecipeTile.css"
//import {} from "./firebasefirestore";
import {saveRecipe} from "./App"
import { db } from './firebase-config'
import { collection, addDoc} from 'firebase/firestore';
import { async } from '@firebase/util';

export default function RecipeTile({recipe ,minCalorie,maxCalorie,healthLabel,dishType}) {

  const urlCollectionRef = collection(db, "saveUrl");
  
  const saveUrl = async () =>{
    await addDoc(urlCollectionRef,{Recipe: recipe["recipe"]["shareAs"], itemName:recipe["recipe"]["label"], Photo:recipe["recipe"]["image"] })
}


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
       <button className = "button1" onClick = {saveUrl}> Save Button </button>
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
           <button className = "button1" onClick = {saveUrl}> Save Button</button>
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
             <button className = "button1" onClick = {saveUrl}> Save Button</button>
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
                 <button className = "button-3" onClick = {saveUrl} > Save Button</button>
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

