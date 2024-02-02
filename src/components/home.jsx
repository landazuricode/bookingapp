import { useEffect, useState } from "react";
import Filters from "./filters";
import Search from "./search";
import useHotelAPI from "../hooks/useApi";
import StarRating from "./starRating";
import { Link } from "react-router-dom";

export default function Home() {
  const [cities, setcities] = useState([]);
  const [hotelsFilters, sethotelsFilters] = useState([]);
  const [hotels, sethotels] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });
  const { getHotels } = useHotelAPI();

  useEffect(() => {
    async function fetchData() {
      let res = await getHotels();
      sethotels(res?.results);
      sethotelsFilters(res?.results);
    }
    fetchData();
  }, []);

  const handleFilterCity = (cityId) => {
    if (cityId === "all") sethotelsFilters(hotels);
    else sethotelsFilters(hotels?.filter((obj) => obj?.city?.id === cityId));
  };

  const handleFilterPrice = (e) => {
    e.preventDefault();
    let from = parseFloat(formData?.from);
    let to = parseFloat(formData?.to);
    const newHotels = hotels?.filter(
      (obj) => parseFloat(obj?.price) >= from &&  parseFloat(obj?.price) <= to
    );
    sethotelsFilters(newHotels);
  };

  const handleFilterSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    const search = formValues['search'];
    const filteredHotels = hotels?.filter(hotel => hotel?.name?.toLowerCase()?.includes(search?.toLowerCase()));
    sethotelsFilters(filteredHotels);
  };
  return (
    <div className="homepage">
      <Filters
        handleFilterCity={handleFilterCity}
        cities={cities}
        setcities={setcities}
        handleFilterPrice={handleFilterPrice}
        setFormData={setFormData}
        formData={formData}
      />
      <Search handleFilterSearch={handleFilterSearch} />
      <div className="homepage__card-container">
        {hotelsFilters?.map((itm, idx) => (
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
                <span className="hotel-card__rating-value">{itm?.rating}</span>
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
    </div>
  );
}
