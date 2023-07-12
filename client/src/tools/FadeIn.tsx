import React, { useRef, useState, useEffect, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface FadeInProps {
  children: ReactNode;
}

const FadeIn: React.FC<FadeInProps> = ({ children }) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return (
    <div className={`fade-in ${isInView ? "show" : ""}`} ref={ref}>
      {children}
    </div>
  );
};

export default FadeIn;
