import useHotelAPI from "../hooks/useApi";
import { calculateDaysDifference } from "../utils/date";

export default function ModalReviews({ show, setshow, data }) {
  const { createReview } = useHotelAPI();
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      let formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      formValues = { ...formValues, hotelId: data?.hotelId };
      await createReview(formValues);
      setshow(false);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`reviews ${!show && "reviews__close"}`}>
      <form className="reviews__form" onSubmit={handleSubmitForm}>
        <div className="reviews__x" onClick={() => setshow(false)}>
          x
        </div>
        <h3 className="reviews__title">Reviews</h3>
        <article className="reserveSelected">
          <header className="reserveSelected__header">
            <img
              className="reserveSelected__img"
              src={data?.hotel?.images[0]?.url}
              alt=""
            />
          </header>
          <section className="reserveSelected__info">
            <h3 className="reserveSelected__name">{data?.hotel?.name}</h3>
            <div className="reserveSelected__location">
              {data?.hotel?.city?.name}, {data?.hotel?.city?.country}
            </div>
          </section>
          <section className="reserveSelected__days__price">
            <div className="reserveSelected__days">
              <span className="reserveSelected__days__label">Reservation Days</span>
              <span className="reserveSelected__days__value">
                {calculateDaysDifference(data?.checkIn, data?.checkOut)}
              </span>
            </div>
            <div className="reserveSelected__subtotal">
              <span className="reserveSelected__subtotal__label">
                subtotal Price
              </span>
              <span className="reserveSelected__subtotal__value">
                {data?.hotel?.price}
              </span>
            </div>
          </section>
        </article>
        <label className="reviews__label reviews__label__rating">
          <span className="reviews__label__name">Rating</span>
          <select className="reviews__rating" name="rating">
            <option defaultValue="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option defaultValue="4">⭐️⭐️⭐️⭐️</option>
            <option defaultValue="3">⭐️⭐️⭐️</option>
            <option defaultValue="2">⭐️⭐️</option>
            <option defaultValue="1">⭐️</option>
          </select>
        </label>
        <label className="reviews__label">
          <span className="reviews__label__name">Comments</span>
          <textarea
            className="reviews__value reviews__comment__value"
            name="comment"
          ></textarea>
        </label>
        <button className="reviews__btn">Submit</button>
      </form>
    </div>
  );
}
