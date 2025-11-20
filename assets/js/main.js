// Research filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const topicFilter = document.getElementById('topic-filter');
  const searchInput = document.getElementById('search-input');
  const researchItems = document.querySelectorAll('.research-item');

  if (topicFilter && researchItems.length > 0) {
    topicFilter.addEventListener('change', filterResearch);
  }

  if (searchInput && researchItems.length > 0) {
    searchInput.addEventListener('input', filterResearch);
  }

  function filterResearch() {
    const selectedTopic = topicFilter ? topicFilter.value : '';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    researchItems.forEach(item => {
      const itemTopic = item.dataset.topic || '';
      const itemTitle = item.dataset.title ? item.dataset.title.toLowerCase() : '';
      const itemAuthor = item.dataset.author ? item.dataset.author.toLowerCase() : '';

      const matchesTopic = !selectedTopic || itemTopic === selectedTopic;
      const matchesSearch = !searchTerm ||
        itemTitle.includes(searchTerm) ||
        itemAuthor.includes(searchTerm);

      if (matchesTopic && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
});
