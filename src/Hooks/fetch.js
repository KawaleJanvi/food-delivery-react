
// import { useState, useEffect } from "react";

import { useEffect, useState } from "react";

// export function useFetchMeals() {
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     async function fetchMeals() {
//       try {
//         const response = await fetch("http://localhost:3000/meals");
//         const data = await response.json();
//         setMeals(data);
//       } catch (error) {
//         console.error("Error fetching meals:", error);
//       }
//     }

//     fetchMeals();
//   }, []); // Empty dependency array ensures the fetch runs only once

//   return meals; // Return the state directly
// }

export function useFetchMeals() {

    let [meals, setMeals] = useState([]);
    let [error, setError] = useState('')

    useEffect(() => {
        async function fetchMeal() {
            try {
                const response = await fetch("http://localhost:3000/meals", { method: "GET" });

                if (!response.ok) {
                    setError(response.statusText)
                    throw new Error(`Error: ${response.statusText}`);
                }

                const responseData = await response.json();
                setMeals(responseData);
            }
            catch (err) {
                setError(err)
            }

        }
        fetchMeal();
    }, [])

    return { meals, error };
}

export function usePostOrders() {
    let [error, setError] = useState('')
    const post = async function fetchOrders(requestBody) {
        try {
            let response = await fetch("http://localhost:3000/orders",
                {
                    method: 'POST',
                    body: JSON.stringify(
                        requestBody
                    ),
                    headers: { 'Content-Type': 'application/json' }
                })

            if (!response.ok) {
                setError(err)
                throw new Error(err);
            }
        }
        catch (err) {
            console.error(err)
            setError(err)
            throw new Error(err);
        }
    }
    return { post, error }
}