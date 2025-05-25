

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
 function displayRandomWord() {
            const words = JSON.parse(localStorage.getItem('words')) || [];
            const randomWordDiv = document.getElementById('randomWord');

            randomWordDiv.addEventListener('click', function() {
                if (words.length > 0) {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const randomWord = words[randomIndex]; // 假設每個字詞物件中有 `word` 屬性
                    randomWordDiv.textContent = `${randomWord.word}這個字意思是${randomWord.definition}.\r\n 記住了嗎?`;
                } else {
                    randomWordDiv.textContent = '你還沒有加入任何字哦,先用上面的介面加入字吧.';
                }
            });
        }

        // 頁面加載時初始化
        window.onload = displayRandomWord;


