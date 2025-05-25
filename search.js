const searchSubmitButton = document.getElementById('searchSubmitButton');
const wordList = document.getElementById('wordList');
const words = JSON.parse(localStorage.getItem('words')) || [];

searchSubmitButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const results = words.filter(item =>
        item.word.toLowerCase().includes(searchTerm) ||
        item.partOfSpeech.toLowerCase().includes(searchTerm) ||
        item.definition.toLowerCase().includes(searchTerm)
    );

    // 儲存搜尋結果到 localStorage
    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'searchresult.html'; // 導向搜尋結果頁面
});

