// 導航按鈕事件處理
document.getElementById('editButton').addEventListener('click', () => {
    window.location.href = 'edit.html';
});

document.getElementById('searchButton').addEventListener('click', () => {
    window.location.href = 'search.html';
});

document.getElementById('viewAllButton').addEventListener('click', () => {
    window.location.href = 'words.html';
});

document.getElementById('deleteButton').addEventListener('click', () => {
    window.location.href = 'delete.html';
});

// 新增字詞的邏輯
document.getElementById('submitButton').addEventListener('click', () => {
    const word = document.getElementById('wordInput').value;
    const partOfSpeech = document.getElementById('partOfSpeechInput').value;
    const definition = document.getElementById('definitionInput').value;

    // 檢查是否填寫完整
    if (word && partOfSpeech && definition) {
        const words = JSON.parse(localStorage.getItem('words')) || [];
        words.push({ word, partOfSpeech, definition });
        localStorage.setItem('words', JSON.stringify(words));
        document.getElementById('message').textContent = '字詞已新增！';
        document.getElementById('wordInput').value = '';
        document.getElementById('partOfSpeechInput').value = '';
        document.getElementById('definitionInput').value = '';
    } else {
        document.getElementById('message').textContent = '請填寫所有欄位！';
    }
});