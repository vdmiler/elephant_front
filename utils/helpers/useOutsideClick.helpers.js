import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;

/*

import useOutsideClick from "./useOutsideClick";

function App() {
const ref = useRef();

useOutsideClick(ref, () => {
alert('You clicked outside');
})

*/