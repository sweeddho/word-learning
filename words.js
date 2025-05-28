const wordList2 = document.getElementById('wordList');
const wordCount = document.getElementById('wordCount');
const pagination = document.getElementById('pagination');
const words2 = JSON.parse(localStorage.getItem('words')) || [];
const itemsPerPage = 10; // 每頁顯示的記錄數
let currentPage = 1; // 當前頁碼

function displayWords() {
    wordList2.innerHTML = '';
    wordCount.textContent = `總共 ${words2.length} 個字詞`;

    const totalPages = Math.ceil(words2.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedWords = words2.slice(start, end);

    if (paginatedWords.length === 0) {
        wordList2.textContent = '尚未加入任何字詞';
    } else {
        paginatedWords.forEach(item => {
            const div = document.createElement('div');
            div.className = 'word-item';
            div.innerHTML = `<span class="word-link" data-word="${item.word}">${item.word} (${item.partOfSpeech}):${item.definition}   詳細:(點擊我)</span>`;
          
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
                localStorage.setItem('editWord', item.word);
                window.location.href = 'edit.html';
            });

            const deleteButton = document.createElement('img');
            deleteButton.alt= '刪除';
            deleteButton.src = '3334328.png';
            deleteButton.style.cursor = 'pointer'; // 設置鼠標指針
            deleteButton.width = 30; // 設置圖片寬度
            deleteButton.height = 30; // 設置圖片高度
            deleteButton.addEventListener('click', () => {
                if (confirm(`確定要刪除字詞 "${item.word}" 嗎？`)) {
                    words2.splice((currentPage - 1) * itemsPerPage + paginatedWords.indexOf(item), 1);
                    localStorage.setItem('words', JSON.stringify(words2));
                    displayWords();
                }
            });

             const playButton = document.createElement('img');
        playButton.src = 'cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3JtMjEzMC10dS0wMjYtcC5wbmc.webp'; // 替換為您的圖片路徑
        playButton.alt = '播放';
        playButton.style.cursor = 'pointer'; // 設置鼠標指針
        playButton.width = 30; // 設置圖片寬度
        playButton.height = 30; // 設置圖片高度
        playButton.onclick = () => {
            responsiveVoice.speak(item.word, "UK English Female");
        };

           /* buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            div.appendChild(buttonContainer);*/
                    

            // 添加點擊事件以保存字詞並導航
            div.querySelector('.word-link').addEventListener('click', () => {
                localStorage.setItem('detailWord', item.word);
                window.location.href = 'detaildisplay.html';
            });

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
             buttonContainer.appendChild(playButton); // 添加刪除按鈕
            div.appendChild(buttonContainer);
            wordList2.appendChild(div);
        });
    }
    setupPagination(totalPages);
}

function setupPagination(totalPages) {
    pagination.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = '上一頁';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayWords();
        }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = currentPage === i ? 'active' : '';
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayWords();
        });
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '下一頁';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayWords();
        }
    });
    pagination.appendChild(nextButton);
}

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

displayWords();