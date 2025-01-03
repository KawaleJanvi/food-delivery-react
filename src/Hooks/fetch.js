
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

    useEffect(() => {
        async function fetchMeal() {
            try {
                let response = await fetch("http://localhost:3000/meals", { method: 'GET' }).then(res => res.json());
                setMeals(response);
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchMeal();
    }, [])

    return meals;
}

export function usePostOrders() {
     const post =   async function fetchOrders(requestBody) {
            try {
              await fetch("http://localhost:3000/orders",
                 { method: 'POST', 
                    body: JSON.stringify(
                        requestBody
                    ), 
                    headers: { 'Content-Type' : 'application/json'}})
                    .then(res => res.json());
            }
            catch (err) {
                console.error(err)
            }           
        }
    return { post }
}