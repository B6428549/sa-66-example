import React from 'react';
import PropTypes from 'prop-types';

interface RatingProps {
  value: number;
  text: string;
  color?: string;
}

const Rating: React.FC<RatingProps> = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          <i
            style={{ color }}
            className={
              value >= index
                ? 'fas fa-star'
                : value >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
