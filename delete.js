const deleteButton = document.getElementById('deleteButton');
const deleteMessage = document.getElementById('deleteMessage');
const words2 = JSON.parse(localStorage.getItem('words')) || [];

deleteButton.addEventListener('click', () => {
    const deleteWord = document.getElementById('deleteWordInput').value;

    const index = words2.findIndex(item => item.word.toLowerCase() === deleteWord.toLowerCase());

    if (index !== -1) {
        words2.splice(index, 1); // 刪除字詞
        localStorage.setItem('words', JSON.stringify(words2)); // 更新 localStorage
        deleteMessage.textContent = `字詞 "${deleteWord}" 已成功刪除！`;
        clearInput();
    } else {
        deleteMessage.textContent = '未找到該字詞！';
    }
});

function clearInput() {
    document.getElementById('deleteWordInput').value = '';
}

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});