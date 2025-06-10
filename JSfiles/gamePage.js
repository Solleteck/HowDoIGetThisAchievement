// Accordion toggle
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', e => {
    if (e.target.tagName === 'INPUT') return;
    const content = button.nextElementSibling;
    const isOpen = content && content.style.display === 'block';
    button.classList.toggle('active', !isOpen);
    if (content) content.style.display = isOpen ? 'none' : 'block';
    });
});

// Save and restore checkbox state
document.querySelectorAll('.checkbox').forEach(cb => {
    const saved = localStorage.getItem(cb.id);
    if (saved !== null) cb.checked = JSON.parse(saved);

    cb.addEventListener('change', e => {
        const box = e.target;
        const btn = box.closest('.accordion-button');
        const section = btn.nextElementSibling;

        // Bulk check/uncheck sub-checkboxes and save their states
        if (section && section.classList.contains('accordion-content')) {
            section.querySelectorAll('.checkbox').forEach(c => {
            c.checked = box.checked;
            localStorage.setItem(c.id, JSON.stringify(c.checked));
            });
        }

    // Bubble up to parent and update their states
    let cur = btn;
    while (cur) {
        const parentSection = cur.parentElement.closest('.accordion-content');
        const parentBtn = parentSection?.previousElementSibling;
        if (!parentBtn) break;
        const parentBox = parentBtn.querySelector('.checkbox');
        const sibs = parentSection.querySelectorAll('.checkbox');
        parentBox.checked = Array.from(sibs).every(c => c.checked);
        localStorage.setItem(parentBox.id, JSON.stringify(parentBox.checked));
        cur = parentBtn;
        }

    // Save current box state
    localStorage.setItem(box.id, JSON.stringify(box.checked));
    });
});

  // Top-level only search
  document.getElementById('search').addEventListener('input', function () {
    const q = this.value.toLowerCase();
    const re = new RegExp(q, 'gi');

    // Clear previous highlights
    document.querySelectorAll('.highlight').forEach(el => el.replaceWith(document.createTextNode(el.textContent)));

    document.querySelectorAll('.accordion-button').forEach(button => {
      const label = button.querySelector('.title');
      const icon = button.querySelector('.ach-icon'); // top-level buttons only
      const content = button.nextElementSibling;

      if (!icon) {
        // Not top-level — leave as-is
        button.style.display = '';
        if (content) content.style.display = '';
        return;
      }

      const text = label.textContent.toLowerCase();
      const match = text.includes(q) || q === '';

      if (match) {
        button.style.display = 'flex';
        if (q) label.innerHTML = label.textContent.replace(re, `<span class="highlight">$&</span>`);
        if (content && button.classList.contains('active')) {
          content.style.display = 'block';
        }
      } else {
        button.style.display = 'none';
        if (content) content.style.display = 'none';
      }
    });
});