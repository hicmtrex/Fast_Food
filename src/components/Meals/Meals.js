import React, { Fragment}from 'react'
import MealsSummary from './MealsSummary'
import AvaliableMeals from './AvaliableMeals'

export default function Meals() {
    return (
        <Fragment>
            <MealsSummary />
            <AvaliableMeals/>
        </Fragment>
    )
}
