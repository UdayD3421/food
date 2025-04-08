// Accordion Toggle
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
  
      document.querySelectorAll(".accordion-item").forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
    });
  });
  