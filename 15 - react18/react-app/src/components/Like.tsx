import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick(); //para notificar al consumidor de este componente cuando hay un click
  };

  if (status) return <FaHeart color="#ff6b81" size={20} onClick={toggle} />;
  return <FaRegHeart size={20} onClick={toggle} />;
};

export default Like;
