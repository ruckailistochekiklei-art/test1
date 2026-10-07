document.addEventListener("DOMContentLoaded", () => {
  const clayButtons = document.querySelectorAll(".btn-clay");
  clayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });

  const tabContainers = document.querySelectorAll('.segmented-container[data-type="tabs"]');
  tabContainers.forEach((container) => {
    const segmentButtons = container.querySelectorAll(".segment-btn");
    segmentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        segmentButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });

  const toggleTracks = document.querySelectorAll(".toggle-track");
  toggleTracks.forEach((track) => {
    track.addEventListener("click", () => {
      track.classList.toggle("active");
    });
  });

  const statusItems = document.querySelectorAll(".checkbox-clay, .radio-clay");
  statusItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  const mainKnob = document.getElementById("mainKnob");
  setupKnobRotation(mainKnob, 0);

  const jogKnob = document.getElementById("jogKnob");
  setupKnobRotation(jogKnob, 45);

  function setupKnobRotation(element, initialRotation) {
    let isDragging = false;
    let startAngle = 0;
    let currentRotation = initialRotation;

    element.style.transform = `rotate(${currentRotation}deg)`;

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = element.getBoundingClientRect();
      const centerOutsideX = rect.left + rect.width / 2;
      const centerOutsideY = rect.top + rect.height / 2;
      startAngle = Math.atan2(e.clientY - centerOutsideY, e.clientX - centerOutsideX) - (currentRotation * Math.PI) / 180;
      document.body.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const rect = element.getBoundingClientRect();
      const centerOutsideX = rect.left + rect.width / 2;
      const centerOutsideY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerOutsideY, e.clientX - centerOutsideX);
      currentRotation = ((angle - startAngle) * 180) / Math.PI;
      element.style.transform = `rotate(${currentRotation}deg)`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.cursor = "default";
    });
  }

  setupVerticalSlider("thumb1", "fill1", 70);
  setupVerticalSlider("thumb2", "fill2", 40);

  function setupVerticalSlider(thumbId, fillId, initialPercentage) {
    const thumb = document.getElementById(thumbId);
    const fill = document.getElementById(fillId);
    const track = thumb.parentElement;

    updateSliderPosition(initialPercentage);

    thumb.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.body.style.cursor = "ns-resize";

      function onMouseMove(moveEvent) {
        const trackRect = track.getBoundingClientRect();
        let newValue = ((trackRect.bottom - moveEvent.clientY) / trackRect.height) * 100;
        newValue = Math.max(0, Math.min(100, newValue));
        updateSliderPosition(newValue);
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "default";
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function updateSliderPosition(percentage) {
      thumb.style.bottom = `${percentage}%`;
      fill.style.height = `${percentage}%`;
    }
  }
});