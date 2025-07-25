// Get all section elements and nav links
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav .menu a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`nav a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        if (link) link.classList.add("active");
      } 
    });
  },
  {
    threshold: 0.6,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

const track = document.querySelector(".slider-track");
const slides = Array.from(track.children);

// Clone enough slides to cover the track width
let totalWidth = 0;
let visibleWidth = track.offsetWidth;

let i = 0;
while (totalWidth < visibleWidth * 2 && i < slides.length * 2) {
  const clone = slides[i % slides.length].cloneNode(true);
  track.appendChild(clone);
  totalWidth +=
    clone.offsetWidth +
    parseFloat(getComputedStyle(clone).marginRight) +
    parseFloat(getComputedStyle(clone).marginLeft);
  i++;
}

// Add keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-${totalWidth / 2}px); }
  }
  .slider-track {
    display: flex;
    animation: scroll 20s linear infinite;
  }
`;
document.head.appendChild(styleSheet);
