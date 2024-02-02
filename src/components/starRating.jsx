const StarRating = ({ rating }) => {
  const renderStars = () => {
    const roundedRating = Math.round(rating * 2) / 2; 
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<Star key={i} filled />);
      } else if (i - 0.5 === roundedRating) {
        stars.push(<Star key={i} half />);
      } else {
        stars.push(<Star key={i} />);
      }
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

const Star = ({ filled, half }) => {
  return (
    <svg
      stroke="currentColor"
      fill={filled ? "currentColor" : "none"}
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {half ? (
        <>
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
        </>
      ) : (
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
      )}
    </svg>
  );
};

export default StarRating;
