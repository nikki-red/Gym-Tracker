//* --> no longer since we are importing useWorkoutsContext
import React from 'react'
import { useEffect } from 'react'
//* import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { URL } from '../url'

// Import components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


function Home() {
    //* const [workouts, setWorkouts] = useState(null) => instead below
    const {workouts, dispatch} = useWorkoutsContext()
    useEffect(() => {
        const fetchWorkouts = async () => {
            //const response = await fetch(URL+"/api/workouts")
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if(response.ok) {
                //* setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, []) // Empty dependency = this effect runs only once 

  return (
    <div className='home'>
      <div className='workouts'>
        {
            workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))
        }
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home