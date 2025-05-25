const editSubmitButton = document.getElementById('editSubmitButton');
const editMessage = document.getElementById('editMessage');
const words = JSON.parse(localStorage.getItem('words')) || [];
const editWordInput = document.getElementById('editWordInput');
const newWordInput = document.getElementById('newWordInput');

// 預填字詞
const editWord = localStorage.getItem('editWord');
if (editWord) {
    editWordInput.value = editWord;
}

editSubmitButton.addEventListener('click', () => {
    const newWord = newWordInput.value; // 獲取新的字詞
    const newPartOfSpeech = document.getElementById('newPartOfSpeechInput').value;
    const newDefinition = document.getElementById('newDefinitionInput').value;

    const index = words.findIndex(item => item.word.toLowerCase() === editWord.toLowerCase());

    if (index !== -1) {
        // 使用新的字詞替換原有字詞
        words[index] = { word: newWord || editWord, partOfSpeech: newPartOfSpeech, definition: newDefinition };
        localStorage.setItem('words', JSON.stringify(words)); // 儲存修改後的字詞
        editMessage.textContent = '字詞已成功修改！';
        clearInputs();
    } else {
        editMessage.textContent = '未找到該字詞！';
    }
});

function clearInputs() {
    newWordInput.value = '';
    document.getElementById('newPartOfSpeechInput').value = '';
    document.getElementById('newDefinitionInput').value = '';
}

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

    