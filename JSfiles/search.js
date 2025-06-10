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