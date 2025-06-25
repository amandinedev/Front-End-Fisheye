function filterTemplate(media){
//extract photographer data properties
  const { likes, date, title } = media;
// create DOM elements for filter section
  function getUserFilterDOM(likes, date, title){
    const filterSection = document.createElement("section");
    filterSection.className = "filter-section";
    filterSection.innerHTML = `
    <label for="filter" class="filter-label">Trier par</label>
    <select class="filter-select" name="filter" id="filter" type="button">
      <div class="filter-select__option-container">
      <option class="filter-select__option" value="${likes}">Popularité</option>
      </div>
      <option class="filter-select__option" value="${date}">Date</option>
      <option class="filter-select__option" value="${title}">Titre</option>
    </select>`;
  return filterSection;
  }
  return {likes, date, title, getUserFilterDOM};
};



