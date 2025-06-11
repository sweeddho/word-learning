const words = JSON.parse(localStorage.getItem('words')) || [];
let currentWord = '';
let score = 0; // 計分
let skipCount = 0; // 跳過次數
let sameword ='';

document.getElementById('startButton').addEventListener('click',()=>{
 displayWord();
})
function getRandomWord() {
    if (words.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex]; // 假設每個字詞物件中有 `word` 屬性
}

function displayWord() {
  
  currentWord = getRandomWord();
    sameword = words.filter(item =>
        item.word.toLowerCase() === currentWord.word.toLowerCase() &&
        item.definition.toLowerCase() != currentWord.definition
        
    );
    console.log(currentWord);
    console.log(sameword);
    if (!currentWord) {
        document.getElementById('randomWord').textContent = '目前沒有可用的字詞哦。請回去首頁新增字詞。';
        document.getElementById('userInput').style.display = 'none'; // 隱藏輸入框
        document.getElementById('submitanswerButton').style.display = 'none'; // 隱藏繳交按鈕
        document.getElementById('nextWordButton').style.display = 'none'; // 隱藏另一字詞按鈕
        document.getElementById('skipButton').style.display = 'none'; // 隱藏跳過按鈕
        document.getElementById('startButton').style.display = 'none'; // 隱藏跳過按鈕
    } else {
        document.getElementById('randomWord').textContent = `${currentWord.word} 的意思是什麼?`;
        document.getElementById('userInput').style.display = 'block'; // 顯示輸入框
        document.getElementById('submitanswerButton').style.display = 'block'; // 顯示繳交按鈕
        document.getElementById('nextWordButton').style.display = 'none'; // 顯示另一字詞按鈕
        document.getElementById('skipButton').style.display = 'block'; // 顯示跳過按鈕
         document.getElementById('startButton').style.display = 'none'; 
    }
    document.getElementById('userInput').value = '';
      
}

function updateScore() {
    document.getElementById('scoreDisplay').textContent = `分數: ${score}`;
}

document.getElementById('submitanswerButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    const feedback = document.getElementById('randomWord');
    let correct = 0;
     const div = document.createElement('div');
         div.innerHTML += `
                   ${currentWord.definition}<br>
                `;
        sameword.forEach(same => {
           
                div.innerHTML += `
                   ${same.definition}<br>
                `;
            
        });

    if(sameword.length!=0){
    for(var i=0;i<sameword.length;i++){
     if (userInput === currentWord.definition || userInput === sameword[i].definition) {
        score++; // 分數 +1
        
        feedback.innerHTML = `<span class="correctness">正確！</span>`+`${currentWord.word}的意思包括:`;
        feedback.appendChild(div);
        document.querySelector('.correctness').style.color = 'green';
        updateScore();
         document.getElementById('nextWordButton').style.display = 'block'; 
          document.getElementById('skipButton').style.display = 'none'; 
          correct = 1;
          break;
    } 
    };
    
    }
    else{
        if(userInput === currentWord.definition){  
            
        score++; // 分數 +1
        feedback.innerHTML = `<span class="correctness">正確！</span>`+`${currentWord.word}的意思包括:`;
        feedback.appendChild(div);
        document.querySelector('.correctness').style.color = 'green';
        updateScore();
         document.getElementById('nextWordButton').style.display = 'block'; 
          document.getElementById('skipButton').style.display = 'none'; 
          correct = 1;}
    }
    /*if (userInput === currentWord.definition && correct == 0) {
        score++; // 分數 +1
         const div = document.createElement('div');
         div.innerHTML += `
                   ${currentWord.definition}<br>
                `;
        sameword.forEach(same => {
           
                div.innerHTML += `
                   ${same.definition}<br>
                `;
            
        });
        feedback.innerHTML = `<span class="correctness">正確！</span>`+`${currentWord.word}的意思包括:`;
        feedback.appendChild(div);
        document.querySelector('.correctness').style.color = 'green';
        updateScore();
         document.getElementById('nextWordButton').style.display = 'block'; 
          document.getElementById('skipButton').style.display = 'none'; 
    } */
    

    
    if(correct == 0){
        feedback.innerHTML = `<span class="correctness">錯誤</span>,${currentWord.word}的意思不是這個.請再試一次吧.`;
        document.querySelector(".correctness").style.color = 'red';
    }
});

document.getElementById('nextWordButton').addEventListener('click', displayWord);

document.getElementById('skipButton').addEventListener('click', () => {
    alert(currentWord.word+'的意思是'+currentWord.definition);
    skipCount++; // 跳過次數 +1
    if (skipCount === 3) {
        const confirmSkip = confirm("您確定要跳過三次嗎？這將重設您的分數。");
        if (confirmSkip) {
            score = 0; // 重設分數
            skipCount = 0; // 重設跳過次數
            updateScore();
            displayWord(); // 顯示另一個字詞
        } else {
            skipCount--; // 取消跳過，減少次數
        }
    } else {
        displayWord(); // 顯示另一個字詞
    }
});

