'use strict';

const renderBanner = async () => {
  await initBanner(0);

  // "Anthony Web Services"
  // moveCaret('js-type-01');

  await elapseTime(200);
  getEl('js-header').scrollIntoView();
  await elapseTime(500);
  await typeText('js-type-01', `Kang's`, 70);
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
    const offset = isMobile() ? 300 : 450;
    const diff = elementPostionInViewport(el) - offset;

    if (diff > 0) {
      const [img, circle] = el.children;
      const imgMarginTop = 100 - (diff/5);
      const cirMarginTop = 700 - diff * 3;
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
    const container = document.querySelector(".comparison-container");
    const sliderBar = document.getElementById("slider-bar");
    const afterImage = document.querySelector(".comparison-after");
  
    let isDragging = false;

    const setStartingPoint = () => {
      const rect = container.getBoundingClientRect();
      const startX = rect.width * 0.3; // 30% of the container's width
  
      sliderBar.style.left = `${startX}px`; // Position the slider bar at 20%
      afterImage.style.clipPath = `inset(0 ${100 - 30}% 0 0)`; // Clip 80% of the "After" image
    };

      // Call the starting point function once DOM is loaded
    setStartingPoint();

      // Helper function to handle movement (used for both mouse and touch)
    function handleMove(clientX) {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      // Constrain the movement within the container
      offsetX = Math.max(0, Math.min(offsetX, rect.width));

      // Update slider position and image clipping
      sliderBar.style.left = `${offsetX}px`;
      const percentage = (offsetX / rect.width) * 100;
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
  
    // Mouse down event to start dragging
    sliderBar.addEventListener("mousedown", e => {
      e.preventDefault();
      console.log("AK: Mouse Down")
      isDragging = true;
    });
  
    // Mouse up event to stop dragging
    document.addEventListener("mouseup", () => {
      isDragging = false;
      sliderBar.blur(); // Prevent focus styling
    });
  
    // Mouse move event to adjust the slider
    container.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);


  
      // // Get the container's boundaries
      // const rect = container.getBoundingClientRect();
      // let offsetX = e.clientX - rect.left;
  
      // // Constrain the slider within the container
      // offsetX = Math.max(0, Math.min(offsetX, rect.width));
  
      // // Update the position of the slider bar
      // sliderBar.style.left = `${offsetX}px`;
  
      // // Adjust the clip-path of the "After" image
      // const percentage = (offsetX / rect.width) * 100;
      // afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    });

      // Touch events
    sliderBar.addEventListener("touchstart", (e) => {
      isDragging = true;
      e.preventDefault(); // Prevent scrolling
    });

    document.addEventListener("touchend", () => {
      isDragging = false;
    });

    container.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const touch = e.touches[0]; // Get the first touch point
      handleMove(touch.clientX);
    });
  });
    

}

const main = async () => {
  // await loadEnv();
  startEventListener();
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