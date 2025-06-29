const resultList = document.getElementById('resultList');
const resultCount = document.getElementById('resultCount'); // 獲取結果數量顯示區域
const results = JSON.parse(localStorage.getItem('searchResults')) || [];
const pagination = document.getElementById('pagination');
const itemsPerPage = 10; // 每頁顯示的記錄數
let currentPage = 1; // 當前頁碼
const wordsdatabase = JSON.parse(localStorage.getItem('words')) || [];


function displayResults() {
    resultList.innerHTML = '';
    resultCount.textContent = `找到 ${results.length} 個結果`; // 更新結果總數顯示

    const totalPages = Math.ceil(results.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedWords = results.slice(start, end);

    if (paginatedWords.length === 0) {
        resultList.textContent = '無相關結果';
    } else {
        paginatedWords.forEach(item => {
            const div = document.createElement('div');
            div.className = 'word-item';
             div.innerHTML = `<span class="word-link" data-word="${item.word}">${item.word} (${item.partOfSpeech}):${item.definition}   詳細:(點擊我)</span>`;
        

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

           /* const editButton = document.createElement('button');
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
                    results.splice((currentPage - 1) * itemsPerPage + paginatedWords.indexOf(item), 1);
                    localStorage.setItem('words', JSON.stringify(results));
                    displayResults();
                }
            });
*/
                const editButton = document.createElement('img');
            editButton.src="png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo-thumbnail.png";
            editButton.alt = '修改';
            editButton.style.cursor = 'pointer'; // 設置鼠標指針
        editButton.width = 30; // 設置圖片寬度
        editButton.height = 30; // 設置圖片高度
           // editButton.className = 'edit-button';
            editButton.addEventListener('click', () => {
                localStorage.setItem('editWord', JSON.stringify(item));
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
                    wordsdatabase.splice((currentPage - 1) * itemsPerPage + paginatedWords.indexOf(item), 1);
                    localStorage.setItem('words', JSON.stringify(wordsdatabase));
                    displayResults();
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
       
             div.querySelector('.word-link').addEventListener('click', () => {
                localStorage.setItem('detailWord', JSON.stringify(item));
                window.location.href = 'detaildisplay.html';
            });
           

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(playButton);
            div.appendChild(buttonContainer);
            resultList.appendChild(div);
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
            displayResults();
        }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = currentPage === i ? 'active' : '';
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayResults();
        });
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '下一頁';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayResults();
        }
    });
    pagination.appendChild(nextButton);
}



document.getElementById('backToHomeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

displayResults();

