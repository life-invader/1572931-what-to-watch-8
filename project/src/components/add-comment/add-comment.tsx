import {
  useRef,
  useState
} from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { postComment } from '../../store/api-action';
import { getFormLoadingStatus } from '../../store/selectors/user-process';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

function AddComment(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const isFormLoading = useSelector(getFormLoadingStatus);

  const handleMessageChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleChangeRating = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.currentTarget.value);
  };

  const checkForm = () => {
    if (!rating) {
      toast.warn('Поставьте оценку', { position: toast.POSITION.TOP_LEFT, hideProgressBar: false });
      return false;
    }

    if ((comment.length > MAX_COMMENT_LENGTH || comment.length <= MIN_COMMENT_LENGTH)) {
      toast.warn(`Комментарий должен быть не короче ${MIN_COMMENT_LENGTH} символов и не длиннее ${MAX_COMMENT_LENGTH} символов`, { position: toast.POSITION.TOP_LEFT, hideProgressBar: false });
      return false;
    }

    return true;
  };

  const onFormSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!checkForm()) {
      return;
    }

    const commentData = { rating, comment };
    dispatch(postComment(id, commentData));
  };

  return (
    <form action="#" className="add-review__form" ref={formRef} onSubmit={onFormSubmitHandler}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" disabled={isFormLoading} data-testid='star-10' type="radio" name="rating" value="10" checked={rating === '10'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" disabled={isFormLoading} id="star-9" type="radio" name="rating" value="9" checked={rating === '9'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" disabled={isFormLoading} id="star-8" type="radio" name="rating" value="8" checked={rating === '8'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" disabled={isFormLoading} id="star-7" type="radio" name="rating" value="7" checked={rating === '7'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" disabled={isFormLoading} id="star-6" type="radio" name="rating" value="6" checked={rating === '6'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" disabled={isFormLoading} id="star-5" type="radio" name="rating" value="5" checked={rating === '5'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" disabled={isFormLoading} id="star-4" type="radio" name="rating" value="4" checked={rating === '4'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" disabled={isFormLoading} id="star-3" type="radio" name="rating" value="3" checked={rating === '3'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" disabled={isFormLoading} id="star-2" type="radio" name="rating" value="2" checked={rating === '2'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" disabled={isFormLoading} id="star-1" type="radio" name="rating" value="1" checked={rating === '1'} onChange={handleChangeRating} />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" data-testid="comment" disabled={isFormLoading} name="review-text" id="review-text" placeholder="Review text" minLength={MIN_COMMENT_LENGTH} maxLength={MAX_COMMENT_LENGTH} onChange={handleMessageChange} value={comment}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" data-testid='submit-button' disabled={isFormLoading} type="submit" ref={submitButtonRef}>Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddComment;
