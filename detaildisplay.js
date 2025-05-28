const detailDisplay = document.getElementById('detailDisplay');
const similarWordsDisplay = document.getElementById('similarWordsDisplay');
const backButton = document.getElementById('backButton');

const words3 = JSON.parse(localStorage.getItem('words')) || [];
const wordToDisplay = localStorage.getItem('detailWord');

    if (wordToDisplay) {
    const wordData = words3.find(item => item.word.toLowerCase() === wordToDisplay.toLowerCase());

    if (wordData) {
        detailDisplay.innerHTML = `
            <p><strong>字詞:</strong> ${wordData.word}</p>
            <p><strong>詞性:</strong> ${wordData.partOfSpeech}</p>
            <p><strong>解釋:</strong> ${wordData.definition}</p>
        `;
         const playButton = document.createElement('img');
        playButton.src = 'cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3JtMjEzMC10dS0wMjYtcC5wbmc.webp'; // 替換為您的圖片路徑
        playButton.alt = '播放';
        playButton.style.cursor = 'pointer'; // 設置鼠標指針
        playButton.width = 30; // 設置圖片寬度
        playButton.height = 30; // 設置圖片高度
        playButton.onclick = () => {
            responsiveVoice.speak(wordData.word, "UK English Female");
        };
        detailDisplay.appendChild(playButton);
        // 顯示其他相同字詞的記錄
        const similarWords = words3.filter(item => item.word.toLowerCase() === wordData.word.toLowerCase() && item !== wordData);
        
        if (similarWords.length > 0) {
            similarWords.forEach(similar => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p><strong>字詞:</strong> ${similar.word} (${similar.partOfSpeech}): ${similar.definition}</p>
                `;
                similarWordsDisplay.appendChild(div);
            });
        } else {
            similarWordsDisplay.textContent = '沒有其他相同字詞的記錄。';
        }
    } else {
        detailDisplay.textContent = '未找到該字詞的詳細資料。';
    }
}




backButton.addEventListener('click', () => {
    window.location.href = 'words.html';
});