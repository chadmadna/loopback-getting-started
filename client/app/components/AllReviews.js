import React from 'react'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import { fetchAllReviews } from '../redux/actions'

class AllReviews extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props
    dispatch(fetchAllReviews())
  }

  render() {
    const { reviews } = this.props
    return (
      <section>
        {
          !!reviews && reviews.slice().reverse().map((r, i) => {
            const formattedDate = dateFormat(new Date(r.date), 'mmm d, yyyy')
            return (
              <article key={i}>
                <header>
                  <h1>{formattedDate} | {r.coffeeShop.name}</h1>
                  <h2>{r.reviewer.email}</h2>
                </header>
                <p>{r.rating}&#9733; - {r.comments}</p>
              </article>
            )
          })
        }
      </section>
    )
  }
}

const mapStateToProps = state => {
  const reviews = state.loopbackStore.Reviews
  return {
    reviews: (!!reviews && !!reviews.items) ? reviews.items : []
  }
}

export default connect(mapStateToProps)(AllReviews)
