import React from 'react'
import "./RecipeTile.css"
export default function RecipeTile({recipe}) {
  return (
    recipe["recipe"]["image"].match(/\.(jpeg|jpg|gif|png)$/)
    != null && ( <div className="recipeTile">
        <a href={recipe["recipe"]["shareAs"]}  target="_blank">
        <img className="recipeTile__img" src={recipe["recipe"]["image"]} />
        </a>

       <p className="recipeTile__name">{recipe["recipe"]["label"]}</p>
        </div>
    )
  );
}
