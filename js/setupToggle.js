export default function setupToggle(btn, element, name) {
  btn.addEventListener("click", () => {
    const isHidden = getComputedStyle(element).display === "none";

    element.style.display = isHidden ? "block" : "none";

    btn.innerText = isHidden ? `הסתר ${name}` : `הצג ${name}`;
  });
}
