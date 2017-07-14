import React from 'react'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMyReviews, deleteReview } from '../redux/actions'

class MyReviews extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch, userId } = this.props
    dispatch(fetchMyReviews(userId))
  }

  render() {
    const { reviews, userId, dispatch } = this.props
    return (
      <section>
        {
          reviews.slice().reverse().map((r, i) => {
            const formattedDate = dateFormat(new Date(r.date), 'mmm d, yyyy')
            return (
              <article key={i}>
                <header>
                  <h1>{formattedDate} | {r.coffeeShop.name}</h1>
                  <h2>{r.reviewer.email}</h2>
                </header>
                <p>{r.rating}&#9733; - {r.comments}</p>
                {
                  !!userId &&
                  <div className="actions">
                    <Link role="button" to={`edit-review/${r.id}`}>Edit</Link>
                    <button onClick={e => dispatch(deleteReview(r.id))}>Delete</button>
                  </div>
                }
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
    reviews: (!!reviews && !!reviews.items) ? reviews.items : [],
    userId: state.userInfo.userId
  }
}

export default connect(mapStateToProps)(MyReviews)
