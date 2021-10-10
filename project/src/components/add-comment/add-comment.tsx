import React from 'react';

class AddComment extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      rating: '',
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  handleMessageChange(evt) {
    this.setState({value: evt.target.value});
  }

  handleChangeRating(evt) {
    this.setState({rating: evt.currentTarget.value});
  }

  render() {
    return (
      <form action="#" className="add-review__form" onSubmit={(evt) => evt.preventDefault()} >
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-10" type="radio" name="rating" value="10" checked={this.state.rating === '10'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" id="star-9" type="radio" name="rating" value="9" checked={this.state.rating === '9'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-8" type="radio" name="rating" value="8" checked={this.state.rating === '8'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-7" type="radio" name="rating" value="7" checked={this.state.rating === '7'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-6" type="radio" name="rating" value="6" checked={this.state.rating === '6'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={this.state.rating === '5'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={this.state.rating === '4'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={this.state.rating === '3'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={this.state.rating === '2'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={this.state.rating === '1'} onChange={this.handleChangeRating}/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={this.handleMessageChange}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    );
  }
}

export default AddComment;
