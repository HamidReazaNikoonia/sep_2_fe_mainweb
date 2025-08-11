import { Star } from 'lucide-react';
import React, { useState } from 'react';

type RatingProps = {
  defaultValue: number;
  size?: number;
  disabled?: boolean;
  onChange?: (rating: number) => void; // Callback function to return selected rating
};

const Rating: React.FC<RatingProps> = ({ onChange, defaultValue = 0, size = 24, disabled = false }) => {
  const [selectedRating, setSelectedRating] = useState(defaultValue); // State to store the selected rating

  const handleRating = (rating: number) => {
    setSelectedRating(rating); // Update the selected rating
    onChange && onChange(rating); // Call the onChange callback with the selected rating
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'row-reverse' }}>
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        return (
          <Star
            key={starIndex}
            strokeWidth={1}
            size={size}
            fill={starIndex <= selectedRating ? 'gold' : 'gray'} // Fill based on selection
            stroke="black"
            {...(!disabled && { onClick: () => handleRating(starIndex) })}
            style={{ cursor: !disabled ? 'pointer' : 'default' }} // Add pointer cursor for interactivity
          />
        );
      })}
    </div>
  );
};

export default Rating;
