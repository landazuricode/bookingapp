import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useHotelAPI from "../hooks/useApi";
import { calculateDaysDifference } from "../utils/date";
import ModalReviews from "./modalReviews";

export default function Reservations() {
  const [bookings, setbookings] = useState([]);
  const { getBookings, deleteBooking } = useHotelAPI();
  const [showModal, setshowModal] = useState(false);
  const [itemModal, setitemModal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let res = await getBookings();
      setbookings(res);
    }
    fetchData();
  }, []);

  const handleDeleteBooking = async (id) => {
    await deleteBooking(id);
    setbookings(await getBookings());
  }

  return (
    <>
      <div className="reservations">
        <h2 className="reservations__title">Reservations</h2>
        <ModalReviews show={showModal} setshow={setshowModal} data={itemModal} />
        <div className="reservations__container">
          {bookings?.map((itm, idx) => (
            <article key={idx} className="reserve">
              <header className="reserve__header">
                <img
                  className="reserve__img"
                  src={itm?.hotel?.images[0]?.url}
                  alt=""
                />
              </header>
              <section className="reserve__info">
                <h3 className="reserve__name">
                  {itm?.hotel?.name}
                </h3>
                <div className="reserve__location">{itm?.hotel?.city?.name}, {itm?.hotel?.city?.country}</div>
                <div className="reserve__comment" onClick={()=>{
                  setshowModal(true);
                  setitemModal(itm);
                }}>
                  Rate and comment this visit...
                </div>
              </section>
              <section className="reserve__days__price">
                <div className="reserve__days">
                  <span className="reserve__days__label">Reservation Days</span>
                  <span className="reserve__days__value">{calculateDaysDifference(itm?.checkIn, itm?.checkOut)}</span>
                </div>
                <div className="reserve__subtotal">
                  <span className="reserve__subtotal__label">subtotal Price</span>
                  <span className="reserve__subtotal__value">{itm?.hotel?.price}</span>
                </div>
              </section>
              <button onClick={() => handleDeleteBooking(itm?.id)} className="reserve__delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
