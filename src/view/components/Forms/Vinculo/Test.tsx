import { useEffect, useRef } from "react";

export function Test() {
  const ref = useRef(null);

  // 👇️ check if element contains class on click
  const handleClick = (event: any) => {
    if (event.currentTarget.classList.contains("my-class")) {
      console.log("Element contains class");
    } else {
      console.log("Element does NOT contain class");
    }
  };

  return (
    <div>
      <div ref={ref} onClick={handleClick}>
        <div className="my-class">Hello world</div>
      </div>
    </div>
  );
}
