import React from 'react'
import dateFormat from 'dateFormat'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchMyReviews, deleteReview } from '../redux/actions'

class MyReviews extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props
    dispatch(fetchMyReviews())
  }

  render() {
    const { reviews, user, dispatch } = this.props
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
                  !!user &&
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

const mapStateToProps = state => ({
  reviews: state.reviews.items,
  user: state.userInfo.userId
})

export default connect(mapStateToProps)(MyReviews)
