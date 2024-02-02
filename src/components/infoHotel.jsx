import { Map, Marker } from "pigeon-maps";
import StarRating from "./starRating";
import { Link, useParams } from "react-router-dom";
import useHotelAPI from "../hooks/useApi";
import { useEffect, useState } from "react";

export default function InfoHotel() {
  let { id } = useParams();
  const { getHotel, getHotels, createBooking } = useHotelAPI();
  const [hotel, sethotel] = useState({});
  const [hotels, sethotels] = useState([]);
  const [rating, setrating] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let res = await getHotel(id);
      let newHotels = await getHotels();
      let newRating = 0;
      res?.reviews?.map((itm) => {
        newRating += itm?.rating;
      });
      newRating = (newRating / res?.reviews?.length).toFixed(2);
      newHotels = newHotels?.results?.filter(
        (obj) => obj?.city?.id === res?.city?.id && obj?.id != id
      );
      setrating(newRating);
      sethotel(res);
      sethotels(newHotels);
    }
    fetchData();
  }, [id]);

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      let formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      formValues = {...formValues, hotelId: id};
      const res = await createBooking(formValues);
      if(res){
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="hotel">
        <header className="hotel__name">
          <h2 className="hotel__name__value">{hotel?.name}</h2>
          <StarRating rating={rating} />
        </header>
        <div className="slider-container">
          <div className="slider">
            <button className="slider__btn">&lt;</button>
            <div className="slider__interior__container">
              <div
                className="slider__interior"
                style={{ transform: "translateX(calc(0%)); width: calc(900%)" }}
              >
                {hotel?.images?.map((img, idx) => (
                  <div key={idx} className="slider__img-container">
                    <img className="slider__img" src={img?.url} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <button className="slider__btn slider__btn__next">&gt;</button>
          </div>
          <div className="slider-footer"></div>
        </div>
        <div className="hotel__map">
          <Map
            height={300}
            defaultCenter={[hotel?.lat, hotel?.lon]}
            defaultZoom={11}
          >
            <Marker width={50} anchor={[hotel?.lat, hotel?.lon]} />
          </Map>
        </div>
        <section className="hotel__info">
          <h3 className="hotel__country">
            {hotel?.city?.name}, {hotel?.city?.country}
          </h3>
          <div className="hotel__direction">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M515.664-.368C305.76-.368 128 178.4 128 390.176c0 221.76 206.032 448.544 344.624 607.936.528.64 22.929 25.52 50.528 25.52h2.449c27.6 0 49.84-24.88 50.399-25.52 130.064-149.52 320-396.048 320-607.936C896 178.4 757.344-.368 515.664-.368zm12.832 955.552c-1.12 1.12-2.753 2.369-4.193 3.409-1.472-1.008-3.072-2.288-4.255-3.408l-16.737-19.248C371.92 785.2 192 578.785 192 390.176c0-177.008 148.224-326.56 323.664-326.56 218.528 0 316.336 164 316.336 326.56 0 143.184-102.128 333.296-303.504 565.008zm-15.377-761.776c-106.032 0-192 85.968-192 192s85.968 192 192 192 192-85.968 192-192-85.968-192-192-192zm0 320c-70.576 0-129.473-58.816-129.473-129.408 0-70.576 57.424-128 128-128 70.624 0 128 57.424 128 128 .032 70.592-55.903 129.408-126.527 129.408z"></path>
            </svg>
            <span className="hotel__direction__value">{hotel?.name}</span>
          </div>
          <p className="hotel__description">{hotel?.description}</p>
        </section>
        <section className="hotel__reservation">
          <h3 className="hotel__reservation__title">Reservation</h3>
          <form onSubmit={handleSubmitForm} className="form-reservation">
            <div className="form-reservation__fields">
              <label className="form-reservation__field">
                <span className="form-reservation__label">Check-in</span>
                <input
                  className="form-reservation__input"
                  name="checkIn"
                  type="date"
                  id="checkin"
                />
              </label>
              <label className="form-reservation__field">
                <span className="form-reservation__label">Check-out</span>
                <input
                  className="form-reservation__input"
                  name="checkOut"
                  type="date"
                  id="chackout"
                />
              </label>
            </div>
            <button className="form-reservation__btn">Submit</button>
          </form>
        </section>
        <section className="otherhotel">
          <h3 className="otherhotel__title">
            Other Hotels in{" "}
            <span className="otherhotel__title__country">{hotel?.city?.country}</span>
          </h3>
          <div className="otherhotel__container">
            {hotels?.map((itm, idx) => (
              <article key={idx} className="hotel-card">
                <header className="hotel-card__header">
                  <img
                    className="hotel-card__image"
                    src={itm?.images[0]?.url}
                    alt="hotel"
                  />
                </header>
                <section className="hotel-card__body">
                  <h3 className="hotel-card__name">{itm?.name}</h3>
                  <div className="hotel-card__rating">
                    <StarRating rating={itm?.rating} />
                    <span className="hotel-card__rating-value">
                      {itm?.rating}
                    </span>
                  </div>
                  <div className="hotel-card__country">
                    {itm?.city?.name}, {itm?.city?.country}
                  </div>
                  <p className="hotel-card__price">{itm?.price}</p>
                  <Link to={`/hotels/${itm?.id}`}>
                    <button className="hotel-card__btn">See more...</button>
                  </Link>
                </section>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
