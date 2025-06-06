const editSubmitButton = document.getElementById('editSubmitButton');
const editMessage = document.getElementById('editMessage');
const words = JSON.parse(localStorage.getItem('words')) || [];
const editWordInput = document.getElementById('editWordInput');
const newWordInput = document.getElementById('newWordInput');
let newdetailDefinitionInput = document.getElementById('newdetailDefinitionInput');
let newexampleInput = document.getElementById('newexampleInput');
let newPartOfSpeech = document.getElementById('newPartOfSpeechInput');
let newDefinition = document.getElementById('newDefinitionInput');
// 預填字詞
const editWord =JSON.parse(localStorage.getItem('editWord'))|| [];


console.log(editWord.example);

if (editWord) {
    newWordInput.value = editWord.word;
    newPartOfSpeech.value = editWord.partOfSpeech;
    newDefinition.value = editWord.definition;
    if(editWord.detaildefinition.length !=0){
        console.log(editWord.detaildefinition);
        newdetailDefinitionInput.value = editWord.detaildefinition;
    }
    if(editWord.example.length !=0){
        newexampleInput.value = editWord.example;
    }  
}

editSubmitButton.addEventListener('click', () => {
    const newWord = newWordInput.value; // 獲取新的字詞
    newPartOfSpeech = document.getElementById('newPartOfSpeechInput').value;
    newDefinition = document.getElementById('newDefinitionInput').value;
    newdetailDefinitionInput =document.getElementById('newdetailDefinitionInput').value;
    newexampleInput = document.getElementById('newexampleInput').value;

    const index = words.findIndex(item =>   item.word.toLowerCase() === editWord.word.toLowerCase() &&
                                            item.partOfSpeech.toLowerCase()=== editWord.partOfSpeech.toLowerCase()&&
                                            item.definition.toLowerCase() === editWord.definition.toLowerCase()
    );

    if (index !== -1) {
        // 使用新的字詞替換原有字詞
        words[index] = { word: newWord || editWord, partOfSpeech: newPartOfSpeech, definition: newDefinition , example:  newexampleInput,detaildefinition:newdetailDefinitionInput  };
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
    document.getElementById('newdetailDefinitionInput').value = '';
    document.getElementById('newexampleInput').value = '';
}

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

    