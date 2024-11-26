'use strict';

const renderBanner = async () => {
  await initBanner(0);

  // "Anthony Web Services"
  // moveCaret('js-type-01');

  await elapseTime(200);
  getEl('js-header').scrollIntoView();
  await elapseTime(500);
  await typeText('js-type-01', `Tower`, 70);
  await elapseTime(300);
  getEl('js-space-01').classList.remove('hidden');
  getEl('js-next-01').classList.remove('hidden');
  await typeText('js-type-02', `Handyman`, 100);
  getEl('js-space-02').classList.remove('hidden');
  if (isMobile())getEl('js-next-02').classList.remove('hidden'); 
  await typeText('js-type-03', `Services`, 40);
  // blinkCaret(true);
  // getEl('js-main-img-1').classList.add('bw-opacity-trans');
  // hideCaret();
  await elapseTime(1000);

  getEl('js-link').style.opacity = 1;
  // getEl('js-link-details').classList.add('flashing');


  return;
}

const gotoHome = () => {
  window.location.href = './';
}


// function startBlindEffect(id) {
//   const imageBlind = document.getElementById(id);
//   let percentage = 100;
//   let position = 0;

//   const interval = setInterval(() => {
//     percentage -= 5; // Decrease the covered area (clipping)
//     position += 5;   // Move the image to the right

//     if (percentage <= 0) {
//       percentage = 0;
//       clearInterval(interval); // Stop the animation when fully revealed
//     }

//     // Adjust the clip-path and position
//     // imageBlind.style.clipPath = `inset(0 ${percentage}% 0 0)`;
//     imageBlind.style.left = `${position}px`;
//   }, 50); // Adjust timing for smoother animation
// }

const handleScrollEvent = () => {
  // const el = document.getElementById('js-flooring');

  // console.log("AK: ", elementPostionInViewport(el));
  // const diff = elementPostionInViewport(el);
  // if (diff > 0) {
  //   const [img, circle] = el.children;
  //   const imgMarginTop = 50 - diff;
  //   const cirMarginTop = 100 - diff;
  //   // console.log("AK: imgMraginTop", imgMarginTop)
  //   img.style.marginTop = imgMarginTop < 0 ? 0 : `${imgMarginTop}px`;
  //   circle.style.marginTop = cirMarginTop < -100 ? '-100px' : `${cirMarginTop}px`;

  // }

  const hiddenContents = document.querySelectorAll('.hidden-content');

  hiddenContents.forEach(el => {
    const offset = isMobile() ? 100 : 450;
    const diff = elementPostionInViewport(el) - offset;

    if (diff > 0) {
      const [img, circle] = el.children;
      const imgMarginTop = 100 - (diff/5);
      const cirMarginTop = 600 - diff * 1;
      img.style.marginTop = imgMarginTop < 0 ? 0 : `${imgMarginTop}px`;
      circle.style.marginTop = cirMarginTop < 100 ? '100px' : `${cirMarginTop}px`;
    }
  
  });
}


const startEventListener = () => {
  startContactListener(); // start listener
  const throttledHandleScroll = throttle(() => handleScrollEvent(), 50);
  window.addEventListener('scroll', throttledHandleScroll);

  document.addEventListener("DOMContentLoaded", () => {
    // const container1 = document.querySelector(".comparison-container");
    const container1 = document.getElementById("js-container1");
    const sliderBar1 = document.getElementById("js-slider-bar1");
    const afterImage1 = document.getElementById("js-img1-after");
    const container2 = document.getElementById("js-container2");
    const sliderBar2 = document.getElementById("js-slider-bar2");
    const afterImage2 = document.getElementById("js-img2-after");
    // const afterImage1 = document.querySelector(".comparison-after");
  
    let isDragging1 = false;
    let isDragging2 = false;

    const setStartingPoint = () => {
      const rect1 = container1.getBoundingClientRect();
      const startX1 = rect1.width * 0.3; // 30% of the container1's width
  
      sliderBar1.style.left = `${startX1}px`; // Position the slider bar at 20%
      afterImage1.style.clipPath = `inset(0 ${100 - 30}% 0 0)`; // Clip 80% of the "After" image

      const rect2 = container2.getBoundingClientRect();
      const startX2 = rect2.width * 0.3; // 30% of the container1's width
  
      sliderBar2.style.left = `${startX2}px`; // Position the slider bar at 20%
      afterImage2.style.clipPath = `inset(0 ${100 - 30}% 0 0)`; // Clip 80% of the "After" image
    };

      // Call the starting point function once DOM is loaded
    setStartingPoint();

      // Helper function to handle movement (used for both mouse and touch)
    function handleMove(clientX) {
      const rect = container1.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      // Constrain the movement within the container1
      offsetX = Math.max(0, Math.min(offsetX, rect.width));

      // Update slider position and image clipping
      sliderBar1.style.left = `${offsetX}px`;
      const percentage = (offsetX / rect.width) * 100;
      afterImage1.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }

    function handleMove2(clientX) {
      const rect = container2.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      // Constrain the movement within the container1
      offsetX = Math.max(0, Math.min(offsetX, rect.width));

      // Update slider position and image clipping
      sliderBar2.style.left = `${offsetX}px`;
      const percentage = (offsetX / rect.width) * 100;
      afterImage2.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  
    // Mouse down event to start dragging
    sliderBar1.addEventListener("mousedown", e => {
      e.preventDefault();
      isDragging1 = true;
    });

    sliderBar2.addEventListener("mousedown", e => {
      e.preventDefault();
      isDragging2 = true;
    });

    // Mouse up event to stop dragging
    document.addEventListener("mouseup", () => {
      isDragging1 = false;
      isDragging2 = false;
      sliderBar1.blur(); // Prevent focus styling
      sliderBar2.blur(); // Prevent focus styling
    });
  
    // Mouse move event to adjust the slider
    container1.addEventListener("mousemove", (e) => {
      if (!isDragging1) return;
      handleMove(e.clientX);
    });
  
    // Mouse move event to adjust the slider
    container2.addEventListener("mousemove", (e) => {
      if (!isDragging2) return;
      handleMove2(e.clientX);
    });

      // Touch events
    // sliderBar1.addEventListener("touchstart", (e) => {
    container1.addEventListener("touchstart", (e) => {
      // e.preventDefault(); // Prevent scrolling
      isDragging1 = true;
    });

    // sliderBar2.addEventListener("touchstart", (e) => {
    container2.addEventListener("touchstart", (e) => {
      // e.preventDefault(); // Prevent scrolling
      isDragging2 = true;
    });

    document.addEventListener("touchend", () => {
      isDragging1 = false;
      isDragging2 = false;
    });

    container1.addEventListener("touchmove", (e) => {
      if (!isDragging1) return;
      const touch = e.touches[0]; // Get the first touch point
      handleMove(touch.clientX);
    });

    container2.addEventListener("touchmove", (e) => {
      if (!isDragging2) return;
      const touch = e.touches[0]; // Get the first touch point
      handleMove2(touch.clientX);
    });

  });
    

}

const main = async () => {
  // await loadEnv();
  startEventListener();
  document.getElementById(isMobile() ? 'js-service' : 'js-service-m').classList.add('hidden');
  // if (loc !== conv(cn)) bd.innerHTML = '';

  // if (!isMobile()) {
  //   getEl('js-main-img-1').src = './img/banner-bw.jpg';
  //   getEl('js-main-img-2').src = './img/banner-col.jpg';
  //   getEl('js-main-img-3').src = './img/banner-full.jpg';
  // }
  await loadFont();
  // document.addEventListener('DOMContentLoaded', () => {
  // window.addEventListener('load', () => {
  //   console.log("AK: SCROLL");
  //   document.getElementById('js-header').scrollIntoView();
  // });
  // console.log('AK: font loaded');

  renderBanner();


}

main();