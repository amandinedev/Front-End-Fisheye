function filterTemplate(media) {
  const { likes, date, title } = media;
  function getUserFilterDOM(likes, date, title) {
    const filterSection = document.createElement("div");
    filterSection.className = "section-filter";
    filterSection.id = "section-filter";
    filterSection.innerHTML = `
    <h2 aria-labelledby="filter" class="filter-label">Trier par</h2>
    <div class="filter-select">
    <div id="filter" role="button" aria-haspopup="listbox" aria-expanded="false" tabindex="0">Popularité</div>
    <ul class="filter-option-list" role="listbox" aria-labelledby="filter" id="filter-options" tabindex="-1">
        <li role="option" value="${likes}" tabindex="-1">Popularité</li>
        <div class="filter-interline"></div>
        <li role="option" value="${date}" tabindex="-1">Date</li>
        <div class="filter-interline"></div>
        <li role="option" value="${title}" tabindex="-1">Titre</li>
    </ul>
    <img id="filter-closed" src="./assets/icons/filter-closed.svg" alt="">
    <img id="filter-opened" src="./assets/icons/filter-opened.svg" alt="">
    </div>
    `;

    return filterSection;
  }
  return { likes, date, title, getUserFilterDOM };
}
