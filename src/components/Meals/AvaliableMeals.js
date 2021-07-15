import React, { useEffect,useState } from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvalibleMeals.module.css'

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

export default function AvaliableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(() => {
    const fetchMeals = async () => {
      
     const response = await fetch('https://react-http-8ca7a-default-rtdb.europe-west1.firebasedatabase.app/meals.json') 
      if (!response.ok) {
          throw new Error('something went wrong!')
        }
      const respinseData = await response.json();
      console.log(respinseData);

      const loadedMeals = [];

      for (const key in respinseData) {
        loadedMeals.push({
          id: key,
          name: respinseData[key].name,
          description: respinseData[key].description,
          price: respinseData[key].price
        });
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

  
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message) 
       }); 
   
  },[])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
    </section>
    )
  }
    const mealsList = meals.map((meal) => (
        <MealItem
        key={meal.id}
        id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ));
    return (
        <section className={classes.meals}>
            <Card> 
            <ul>
            {mealsList}
                </ul>
                </Card>
        </section>
    )
}
