import { useEffect } from "react";
import useHotelAPI from "../hooks/useApi";

export default function Filters({
  handleFilterCity,
  handleFilterPrice,
  setFormData,
  formData,
  cities,
  setcities,
}) {
  const { getCities } = useHotelAPI();

  useEffect(() => {
    async function fetchData() {
      setcities(await getCities());
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="filters">
      <h2 className="filters__title">Filters</h2>
      <form className="price" onSubmit={handleFilterPrice}>
        <h3 className="price__title">Price</h3>
        <div className="price__field">
          <label className="price__label" htmlFor="from">
            From
          </label>
          <input
            className="price__input"
            name="from"
            type="number"
            id="from"
            defaultValue={formData.from}
            onChange={handleChange}
          />
        </div>
        <div className="price__field">
          <label className="price__label" htmlFor="to" onChange={handleChange}>
            To
          </label>
          <input
            className="price__input"
            name="to"
            defaultValue={formData.to}
            type="number"
            id="to"
            onChange={handleChange}
          />
        </div>
        <button className="price__btn">Search</button>
      </form>
      <section className="filter-country">
        <h3 className="filter-country__title">Cities</h3>
        <ul className="filter-country__list">
          <li
            onClick={() => handleFilterCity("all")}
            className="filter-country__item"
          >
            All Cities
          </li>
          {cities?.map((itm, idx) => (
            <li
              key={idx}
              onClick={() => handleFilterCity(itm?.id)}
              className="filter-country__item"
            >
              {itm?.name}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
