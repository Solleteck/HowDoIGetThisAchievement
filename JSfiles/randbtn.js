window.goToRandomGame = function () {
    if (!searchData.length) return;
    const random = searchData[Math.floor(Math.random() * searchData.length)];
    if (random?.url) window.location.href = random.url;
};