import React from 'react'

const AllReviews = ({ reviews }) => (
  <section>
    {
      reviews.slice().reverse().map(r => (
        <article>
          <header>
            <h1>{r.date} | {r.coffeeShop.name}</h1>
            <h2>{r.reviewer.email}</h2>
          </header>
          <p>{r.rating}&#9733; - {r.comments}</p>
        </article>
      ))
    }
  </section>
)

export default AllReviews
