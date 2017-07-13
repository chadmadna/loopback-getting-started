import React from 'react'
import { capitalize } from 'lodash'
import { connect } from 'react-redux'
import { changeReviewAction, addReview, editReview, fetchCoffeeShops } from '../redux/actions'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: null,
      comments: '',
      selectedShop: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const action = capitalize(location.pathname.split('-', 1)[0].replace(/\//g, ''))
    dispatch(changeReviewAction(action))
    if (action !== 'Edit') {
      dispatch(fetchCoffeeShops())
    }
  }

  handleSubmit(event) {
    const { dispatch, action, routeParams, publisherId } = this.props
    const selectedShop = event.target.elements['selectedShop'].value
    const rating = document.querySelector('input[name="rating"]:checked').value
    const comments = event.target.elements['comments'].value
    if (action === 'Add') {
      dispatch(addReview(selectedShop, rating, comments, publisherId))
    } else if (action === 'Edit') {
      dispatch(editReview(selectedShop, rating, comments, routeParams.id, publisherId))
    }
    event.preventDefault()
  }

  handleChange(event) {
    if (event.target.name === 'rating') {
      this.setState({ ...this.state, rating: event.target.value })
    } else if (event.target.name === 'selectedShop') {
      this.setState({ ...this.state, selectedShop: event.target.value })
    }
  }

  render() {
    const { action, coffeeShops } = this.props
    return (
      <section>
        <form name="form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>{action} review form</legend>

            <div className="form-group">
              <label>Coffee shop name</label>
              <select
                name="selectedShop"
                disabled={this.props.action === 'Edit'}
                onChange={this.handleChange}>
                {
                  coffeeShops.map((shop, i) => (
                    <option key={i} value={shop.id}>{shop.name}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input type="radio" name="rating" onChange={this.handleChange} value="1" />1&#9733;
              <input type="radio" name="rating" onChange={this.handleChange} value="2" />2&#9733;
              <input type="radio" name="rating" onChange={this.handleChange} value="3" />3&#9733;
              <input type="radio" name="rating" onChange={this.handleChange} value="4" />4&#9733;
              <input type="radio" name="rating" onChange={this.handleChange} value="5" />5&#9733;
            </div>

            <div className="form-group">
              <label>Comments</label>
              <textarea name="comments"></textarea>
            </div>

            <div className="actions">
              <label></label>
              <button>{action} review</button>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

const mapStateToProps = state => {
  const coffeeShops = state.loopbackStore.CoffeeShops
  return {
    action: state.reviewForm.action,
    coffeeShops: (!!coffeeShops && !!coffeeShops.items) ? coffeeShops.items : [],
    publisherId: state.userInfo.userId
  }
}

export default connect(mapStateToProps)(ReviewForm)
