const detailDisplay = document.getElementById('detailDisplay');
const similarWordsDisplay = document.getElementById('similarWordsDisplay');
const backButton = document.getElementById('backButton');

const words3 = JSON.parse(localStorage.getItem('words')) || [];
const wordToDisplay = JSON.parse(localStorage.getItem('detailWord'))|| [];

    if (wordToDisplay) {
    const wordData = words3.find(item =>  item.word.toLowerCase() === wordToDisplay.word.toLowerCase() &&
                                            item.partOfSpeech.toLowerCase()=== wordToDisplay.partOfSpeech.toLowerCase()&&
                                            item.definition.toLowerCase() === wordToDisplay.definition.toLowerCase()

);

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
        detailDisplay.innerHTML += `<p><h2><strong>${wordData.definition}</strong><h2><p>`;
        if(wordData.detaildefinition.length == 0){detailDisplay.innerHTML+=`<p><h3>詳解:暫沒<h3><p>`;}
        else{ detailDisplay.innerHTML+= `<p><h3>詳解:${wordData.detaildefinition}<h3><p></p>`;}

        if(wordData.example.length == 0 ){detailDisplay.innerHTML+=`<p><h3>例句:暫沒<h3><p>`;}
        else{ detailDisplay.innerHTML+= `<p><h3>例句:${wordData.example}<h3><p></p>`;}
        /*detailDisplay.innerHTML += `<p><h2><strong>${wordData.definition}</strong><h2><p>
                                    <p><h3>詳解:${wordData.detaildefinition}<h2><p>
                                    <p><h3>例句:${wordData.example}<h2><p>
        `;*/


        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        const editButton = document.createElement('img');
        editButton.src="png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo-thumbnail.png";
        editButton.alt = '修改';
        editButton.style.cursor = 'pointer'; // 設置鼠標指針
        editButton.width = 30; // 設置圖片寬度
        editButton.height = 30; // 設置圖片高度
           // editButton.className = 'edit-button';
            editButton.addEventListener('click', () => {
                localStorage.setItem('editWord', JSON.stringify(wordData));
              
                window.location.href = 'edit.html';
            });

         
        playaudio.appendChild(playButton);
        buttonContainer.appendChild(editButton);
        detailDisplay.appendChild(playaudio);
        detailDisplay.appendChild(buttonContainer);
        // 顯示其他相同字詞的記錄
        const similarWords = words3.filter(item => item.word.toLowerCase() === wordData.word.toLowerCase() && item !== wordData);
        
        if (similarWords.length > 0) {
            similarWords.forEach(similar => {
                const link = document.createElement('a');
                link.href='#';
                link.innerHTML = `
                    ${similar.word} (${similar.partOfSpeech}): ${similar.definition}</p>
                `;
                link.addEventListener('click',()=>{
                    localStorage.setItem('detailWord',JSON.stringify(similar));
                    window.location.href='detaildisplay.html';
                });
                similarWordsDisplay.appendChild(link);
            });
        } else {
            similarWordsDisplay.textContent = '沒有其他相同字詞的記錄。';
        }
    } else {
        detailDisplay.textContent = '未找到該字詞的詳細資料。';
    }
}




backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});




          