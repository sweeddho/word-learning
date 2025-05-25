const searchSubmitButton = document.getElementById('searchSubmitButton');
const wordList = document.getElementById('wordList');
const words = JSON.parse(localStorage.getItem('words')) || [];
const filtervalue='';

searchSubmitButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchpos = document.getElementById('searchpartOfSpeech').value.toLowerCase();
    const searchexplain = document.getElementById('searchexplain').value.toLowerCase();
     
       const filter = document.querySelector('input[name="searchType"]:checked');
       if(filter){
        const filtervalue=filter.value;
       }
   
    if(filter){
    if(filter.value === 'exact' ){
        const results = words.filter(item =>
        item.word.toLowerCase() === searchTerm &&
        item.partOfSpeech.toLowerCase() === searchpos &&
       
        item.definition.toLowerCase() === searchexplain
        
       
    );
     localStorage.setItem('searchResults', JSON.stringify(results));
        window.location.href = 'detailsearchresult.html'; // 導向搜尋結果頁
        
    }
    else{
         const results = words.filter(item =>
        item.word.toLowerCase().includes(searchTerm) ||
        item.partOfSpeech.toLowerCase().includes(searchpos) ||
        item.definition.toLowerCase().includes(searchexplain)
         );
         
           localStorage.setItem('searchResults', JSON.stringify(results));
     window.location.href = 'detailsearchresult.html'; // 導向搜尋結果頁面
    }
  }
    /*// 儲存搜尋結果到 localStorage
    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'detailsearchresult.html'; // 導向搜尋結果頁面*/
});



//////////正在做這part///////////////