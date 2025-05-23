const wordList = document.getElementById('wordList');
const wordCount = document.getElementById('wordCount');
const pagination = document.getElementById('pagination');
const words = JSON.parse(localStorage.getItem('words')) || [];
const itemsPerPage = 10; // 每頁顯示的記錄數
let currentPage = 1; // 當前頁碼

function displayWords() {
    wordList.innerHTML = '';
    wordCount.textContent = `總共 ${words.length} 個字詞`;

    const totalPages = Math.ceil(words.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedWords = words.slice(start, end);

    if (paginatedWords.length === 0) {
        wordList.textContent = '尚未加入任何字詞';
    } else {
        paginatedWords.forEach(item => {
            const div = document.createElement('div');
            div.className = 'word-item';
            div.innerHTML = `<span class="word-link" data-word="${item.word}">${item.word} (${item.partOfSpeech}):${item.definition}</span>`;
             console.log(item.word)
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            const editButton = document.createElement('button');
            editButton.textContent = '修改';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', () => {
                localStorage.setItem('editWord', item.word);
                window.location.href = 'edit.html';
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '刪除';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                if (confirm(`確定要刪除字詞 "${item.word}" 嗎？`)) {
                    words.splice((currentPage - 1) * itemsPerPage + paginatedWords.indexOf(item), 1);
                    localStorage.setItem('words', JSON.stringify(words));
                    displayWords();
                }
            });

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            div.appendChild(buttonContainer);
                    

            // 添加點擊事件以保存字詞並導航
            div.querySelector('.word-link').addEventListener('click', () => {
                localStorage.setItem('detailWord', item.word);
                window.location.href = 'detaildisplay.html';
            });

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton); // 添加刪除按鈕
            div.appendChild(buttonContainer);
            wordList.appendChild(div);
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