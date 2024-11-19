import confetti from "canvas-confetti";
import { useEffect } from "react";

const Snowflakes = () => {
  useEffect(() => {
    const skew = 1;
    let timeout: NodeJS.Timeout;

    const snowing = () => {
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: 500,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: Math.random() * 0.2 + 0.4,
        scalar: Math.random() * 0.6 + 0.4,
        drift: Math.random() * 0.8 - 0.4,
      });

      timeout = setTimeout(snowing, 100);
    };

    snowing();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        overflow: "hidden",
      }}
    ></div>
  );
};

export default Snowflakes;
