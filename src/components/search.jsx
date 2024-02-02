export default function Search({ handleFilterSearch }) {
  return (
    <form className="search" onSubmit={handleFilterSearch}>
      <input className="search__input" type="text" name="search" />
      <button className="search__btn">Search</button>
    </form>
  );
}
