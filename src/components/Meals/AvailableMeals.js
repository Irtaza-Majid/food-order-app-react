import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import Spinner from '../UI/Spinner';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];
const AvailableMeals = () => {
  const [meals, setMeals] = useState(null)


  const getData = (data) => {
    const loadData = []

    for (const key in data) {
      loadData.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
      })
    }
    setMeals(loadData);
  }

  const { error, loading } = useAxios({ url: '/meals.json' }, getData);


  const mealList = error ? <Modal>{error.message}</Modal> : loading ? <Modal><Spinner /></Modal> :
    meals.map(meal => {
      return <MealItem
        key={meal.id}
        id={meal.id}
        meal={meal}
      />
    })

  return (
    <section className={classes.meals}>
      <Card>
        <ul >
          {mealList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
