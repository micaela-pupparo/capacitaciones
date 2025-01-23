import React, { useState } from "react";

const Checkbox = () => {
  const [liked, setLiked] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiked(e.target.checked);
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={liked}
          onChange={(e) => handleChange(e)}
        />
        Me gusta
      </label>
      <p>A vos {liked ? "te gusta" : "no te gusta"} esto</p>
    </>
  );
};

export default Checkbox;
