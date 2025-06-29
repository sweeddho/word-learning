const wordsData = JSON.parse(localStorage.getItem('words')) || [];

        const calendarElement = document.getElementById('calendar');
        const monthSelect = document.getElementById('monthSelect');
        const yearSelect = document.getElementById('yearSelect');
        let wordListElement = [];
       const wordsElement = document.getElementById('eachdayword');
        const dateselector = document.getElementById('dateselector');
        const itemsPerPage = 10; // 每頁顯示的記錄數
        let currentPage = 1;
        const pagination = document.getElementById('pagination-calender');

        function populateSelectors() {
            const today = new Date();
            const currentYear = today.getFullYear();

            // 填充年份選擇器
            for (let i = currentYear; i >= 2000; i--) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }

            // 填充月份選擇器
            for (let i = 1; i <= 12; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i}月`;
                monthSelect.appendChild(option);
            }

            // 設置預設顯示當前月份和年份
            monthSelect.value = today.getMonth() + 1; // 月份是從0開始的
            yearSelect.value = currentYear;
        }

        function generateCalendar(year, month) {
            calendarElement.innerHTML = ''; // 清空日曆
            const date = new Date(year, month - 1, 1);
            const daysInMonth = new Date(year, month, 0).getDate();
            const firstDay = date.getDay();

            // 添加空白格子
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                calendarElement.appendChild(emptyDiv);
            }

            // 添加每一天
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                let count =0;
                let dateStr = `${String(day)}-${String(month)}-${year}`;
                
                for(let i = 0;i<wordsData.length;i++){
                    if (wordsData[i].insertdate === dateStr) {
                        count++;
                        dayDiv.classList.add('has-words');
                    //const countDiv = document.createElement('div');
                        dayDiv.textContent += wordsData[i].count;   
                  // countDiv.classList.add('count');
                   // dayDiv.textContent += wordsData[i].count;
               //     dayDiv.appendChild(countDiv);

                    // 添加點擊事件顯示字詞列表
                    dayDiv.onclick = () => {
                        showWords(dateStr);
                    };
                }
                
            }
            if(count == 0){
                dayDiv.textContent = day;
                calendarElement.appendChild(dayDiv);
            }else{
                dayDiv.innerHTML = `${day}<br>no:${count}</br>`;
                //let wordno = '\n no:'+count;
                //dayDiv.textContent += wordno;   
                calendarElement.appendChild(dayDiv);
            }
             
                
            }
        }

        document.getElementById('showMonthButton').onclick = () => {
            const year = yearSelect.value;
            const month = monthSelect.value;
            generateCalendar(year, month);
        };

       /* document.getElementById('addWordButton').onclick = () => {
            const wordInput = document.getElementById('wordInput');
            const word = wordInput.value.trim();

            if (word) {
                const today = new Date();
                const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

                if (!wordsData[dateStr]) {
                    wordsData[dateStr] = { count: 0, words: [] };
                }

                wordsData[dateStr].count++;
                wordsData[dateStr].words.push(word);
                wordInput.value = ''; // 清空輸入框

                // 更新日曆
                generateCalendar(today.getFullYear(), today.getMonth() + 1);
            } else {
                alert('請輸入字詞。');
            }
        };*/

        function showWords(dateStr) {
            // 清空字詞列表
            
             
            

            calendarElement.innerHTML = '';
            dateselector.style.display ='none';
            for(let i=0;i<wordsData.length;i++){
                if(wordsData[i].insertdate === dateStr){
                    wordListElement.push(wordsData[i]);
                };
            }
            //const words = wordsData[dateStr]?.words || [];
            const totalPages = Math.ceil(wordListElement.length / itemsPerPage);
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedWords = wordListElement.slice(start, end);

            // 顯示字詞
            wordListElement.forEach(word => {
             
            const div = document.createElement('div');
            div.className = 'word-item';
            div.innerHTML = `<span class="word-link" data-word="${word.word}">${word.word} (${word.partOfSpeech}):${word.definition}   詳細:(點擊我)</span>`;
          
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
                localStorage.setItem('editWord', JSON.stringify(word));
              
                window.location.href = 'edit.html';
            });

            const deleteButton = document.createElement('img');
            deleteButton.alt= '刪除';
            deleteButton.src = '3334328.png';
            deleteButton.style.cursor = 'pointer'; // 設置鼠標指針
            deleteButton.width = 30; // 設置圖片寬度
            deleteButton.height = 30; // 設置圖片高度
            deleteButton.addEventListener('click', () => {
                if (confirm(`確定要刪除字詞 "${word.word}" 嗎？`)) {
                    wordsData.splice((currentPage - 1) * itemsPerPage + paginatedWords.indexOf(word), 1);
                    localStorage.setItem('words', JSON.stringify(wordsData));
                    showWords();
                }
            });

             const playButton = document.createElement('img');
        playButton.src = 'cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3JtMjEzMC10dS0wMjYtcC5wbmc.webp'; // 替換為您的圖片路徑
        playButton.alt = '播放';
        playButton.style.cursor = 'pointer'; // 設置鼠標指針
        playButton.width = 30; // 設置圖片寬度
        playButton.height = 30; // 設置圖片高度
        playButton.onclick = () => {
            responsiveVoice.speak(word.word, "UK English Female");
        };

           /* buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            div.appendChild(buttonContainer);*/
           const backButton = document.getElementById('backbutton');
           backButton.style.display = 'block';
           backButton.onclick=()=>{
            window.location.href='calender.html';
           };
            // 添加點擊事件以保存字詞並導航
            div.querySelector('.word-link').addEventListener('click', () => {
                localStorage.setItem('detailWord', JSON.stringify(word));
                window.location.href = 'detaildisplay.html';
            });

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
             buttonContainer.appendChild(playButton); // 添加刪除按鈕
            div.appendChild(buttonContainer);
                wordsElement.appendChild(div);
            });

            // 顯示字詞列表
            wordsElement.style.display = 'block';
            setupPagination(totalPages);
        }

        function closeWordList() {
            wordsElement.style.display = 'none'; // 隱藏字詞列表
        }

function setupPagination(totalPages) {
    pagination.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = '上一頁';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showWords();
        }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = currentPage === i ? 'active' : '';
        pageButton.addEventListener('click', () => {
            currentPage = i;
            showWords();
        });
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = '下一頁';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showWords();
        }
    });
    pagination.appendChild(nextButton);
}

        // 初始化
        populateSelectors();
        const today = new Date();
        generateCalendar(today.getFullYear(), today.getMonth() + 1);