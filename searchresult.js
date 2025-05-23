const resultList = document.getElementById('resultList');
const resultCount = document.getElementById('resultCount'); // 獲取結果數量顯示區域
const results = JSON.parse(localStorage.getItem('searchResults')) || [];

function displayResults() {
    resultList.innerHTML = '';
    resultCount.textContent = `找到 ${results.length} 個結果`; // 更新結果總數顯示

    if (results.length === 0) {
        resultList.textContent = '無相關結果';
    } else {
        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'word-item';
            div.textContent = `${item.word} (${item.partOfSpeech}): ${item.definition}`;
            resultList.appendChild(div);
        });
    }
}

document.getElementById('backToSearchButton').addEventListener('click', () => {
    window.location.href = 'search.html';
});

document.getElementById('backToHomeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

displayResults();