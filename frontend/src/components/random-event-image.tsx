import { useEffect, useState } from "react";

const RandomEventImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    setImageSrc(`/event-image-${randomIndex}.webp`);
  }, []);

  return <img src={imageSrc} alt="Random Event" className="object-cover" />;
};

export default RandomEventImage;
