import React, { useState, useEffect } from "react";
import arrowUp from "../../img/arrow-up.png";
import "./ScrollToTop.scss";

export default function ScrollToTop() {
  const [visible, SetVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", function (e) {
      toggleVisibility();
    });
  }, []);

  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      SetVisible(true);
    } else {
      SetVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="scroll-to-top">
      {visible && (
        <div onClick={() => scrollToTop()}>
          <img src={arrowUp} height="55" width="55" alt="arrow-up"></img>
        </div>
      )}
    </div>
  );
}
