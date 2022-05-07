import React from 'react'
import "./RecipeTile.css"
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