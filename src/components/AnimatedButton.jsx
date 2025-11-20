import { useState, useEffect, useRef } from "react";
import hoverAnim1 from "../assets/images/hoverAnim1.png";
import hoverAnim2 from "../assets/images/hoverAnim2.png";
import hoverAnim3 from "../assets/images/hoverAnim3.png";

const AnimatedButton = ({ children, onClick, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef(null);

  const frames = [hoverAnim1, hoverAnim2, hoverAnim3];

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % frames.length);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentFrame(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-visible ${className}`}
      {...props}
    >
      {isHovered && (
        <img
          src={frames[currentFrame]}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />
      )}
      <span className={`relative z-10 ${isHovered ? "text-white" : ""}`}>
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
