import Lottie from "lottie-react";
import rocket from "../assets/rocket.json";

function Rocket({ rocketPosition }: { rocketPosition: number }) {
  return (
    <div
      className="w-40 h-auto fixed left-1/2 -translate-x-1/2 -rotate-45 transition-[bottom] duration-[8000ms] ease-[cubic-bezier(0.12,0,0.39,0)]"
      style={{
        bottom: `${rocketPosition}px`,
      }}
    >
      <Lottie animationData={rocket} />
    </div>
  );
}

export default Rocket;
