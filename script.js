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
