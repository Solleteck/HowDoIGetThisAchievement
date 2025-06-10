                                                                                /* === index === */
src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js">

  document.addEventListener('DOMContentLoaded', () => {
    let fuse;
    let searchData = [];

    const searchInput = document.getElementById("search");
    const resultsDiv = document.getElementById("search-results");

    // === Load search data and initialize Fuse.js ===
    fetch('searchList.json')
      .then(res => res.json())
      .then(data => {
        searchData = data;
        fuse = new Fuse(data, {
          keys: ['name'],
          threshold: 0.3,
          includeScore: true
        });
      });

    // === Render up to N results from a query ===
    function renderSearchResults(query, limit = 5) {
      resultsDiv.replaceChildren();

      if (!query || !fuse) return;

      const results = fuse.search(query).slice(0, limit);
      results.forEach(result => {
        const game = result.item;
        const div = document.createElement("div");
        div.classList.add("search-result");
        div.textContent = game.name;
        div.onclick = () => window.location.href = game.url;
        resultsDiv.appendChild(div);
      });
    }

      // === Input & Focus Events ===
      const handleSearch = () => renderSearchResults(searchInput.value.trim(), 10);
      searchInput.addEventListener("input", handleSearch);
      searchInput.addEventListener("focus", handleSearch);

      // === Click outside closes results ===
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
          resultsDiv.replaceChildren();
        }
      });

      // === Random Game Button ===
      window.goToRandomGame = function () {
        if (!searchData.length) return;
        const random = searchData[Math.floor(Math.random() * searchData.length)];
        if (random?.url) window.location.href = random.url;
      };
  });
                                                                                /* === pathing === */
src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js"

  document.addEventListener('DOMContentLoaded', () => {
    let fuse;
    let searchData = [];

    const searchInput = document.getElementById("search");
    const resultsDiv = document.getElementById("search-results");

    // === Load search data and initialize Fuse.js ===
    fetch('../searchList.json')
      .then(res => res.json())
      .then(data => {
        searchData = data;
        fuse = new Fuse(data, {
          keys: ['name'],
          threshold: 0.3,
          includeScore: true
        });
      });

    // === Render up to N results from a query ===
    function renderSearchResults(query, limit = 5) {
      resultsDiv.replaceChildren();

      if (!query || !fuse) return;

      const results = fuse.search(query).slice(0, limit);
      results.forEach(result => {
        const game = result.item;
        const div = document.createElement("div");
        div.classList.add("search-result");
        div.textContent = game.name;
        div.onclick = () => window.location.href = game.url;
        resultsDiv.appendChild(div);
      });
    }

      // === Input & Focus Events ===
      const handleSearch = () => renderSearchResults(searchInput.value.trim(), 10);
      searchInput.addEventListener("input", handleSearch);
      searchInput.addEventListener("focus", handleSearch);

      // === Click outside closes results ===
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
          resultsDiv.replaceChildren();
        }
      });
  });
                                                                                /* === game === */
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