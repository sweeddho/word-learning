const detailDisplay = document.getElementById('detailDisplay');
const similarWordsDisplay = document.getElementById('similarWordsDisplay');
const backButton = document.getElementById('backButton');

const words3 = JSON.parse(localStorage.getItem('words')) || [];
const wordToDisplay = localStorage.getItem('detailWord');

    if (wordToDisplay) {
    const wordData = words3.find(item => item.word.toLowerCase() === wordToDisplay.toLowerCase());

    if (wordData) {
        detailDisplay.innerHTML = `
            <p><h1><strong>${wordData.word}</strong>(${wordData.partOfSpeech})</h1></p>`;
        const playaudio =document.createElement('p');
        playaudio.innerHTML=`<strong>讀音:</strong>`;
         const playButton = document.createElement('img');
        playButton.src = 'cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3JtMjEzMC10dS0wMjYtcC5wbmc.webp'; // 替換為您的圖片路徑
        playButton.alt = '播放';
        playButton.style.cursor = 'pointer'; // 設置鼠標指針
        playButton.width = 30; // 設置圖片寬度
        playButton.height = 30; // 設置圖片高度
        playButton.onclick = () => {
            responsiveVoice.speak(wordData.word, "UK English Female");
        };
        
        
        detailDisplay.innerHTML += `<p><h2><strong>${wordData.definition}</strong><h2><p>
                                    <p><h3>詳解:${wordData.detaildefinition}<h2><p>
                                    <p><h3>例句:${wordData.example}<h2><p>
        `;
        playaudio.appendChild(playButton);
        detailDisplay.appendChild(playaudio);
        // 顯示其他相同字詞的記錄
        const similarWords = words3.filter(item => item.word.toLowerCase() === wordData.word.toLowerCase() && item !== wordData);
        
        if (similarWords.length > 0) {
            similarWords.forEach(similar => {
                const div = document.createElement('div');
                div.innerHTML = `
                    ${similar.word} (${similar.partOfSpeech}): ${similar.definition}</p>
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




          