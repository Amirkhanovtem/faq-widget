
(function() {
  const btn = document.createElement('button');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#007B5E"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="16" font-family="Arial" dy=".3em">?</text></svg>';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.zIndex = '9999';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.backgroundColor = '#007B5E';
  btn.style.border = 'none';
  btn.style.borderRadius = '50%';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  document.body.appendChild(btn);

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.bottom = '90px';
  popup.style.right = '20px';
  popup.style.width = '340px';
  popup.style.maxHeight = '500px';
  popup.style.background = 'white';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
  popup.style.padding = '20px';
  popup.style.zIndex = '10000';
  popup.style.fontFamily = 'Arial, sans-serif';
  popup.style.display = 'none';
  popup.style.overflowY = 'auto';

  popup.innerHTML = `
    <select id="langSelect" style="width:100%;margin-bottom:10px">
      <option value="ru">Рус</option>
      <option value="kz">Қаз</option>
      <option value="en">Eng</option>
    </select>
    <div id="faqList">Загрузка...</div>
    <input id="faqInput" type="text" placeholder="Ваш вопрос..." style="width:100%;padding:8px;border:1px solid #ccc;border-radius:6px;margin-top:10px"/>
    <a id="faqSend" href="#" target="_blank" style="margin-top:10px;display:inline-block;background:#007B5E;color:white;padding:10px;width:100%;text-align:center;border-radius:6px;text-decoration:none">Отправить вопрос</a>
  `;

  document.body.appendChild(popup);

  btn.onclick = () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  };

  const SHEET_API_URL = 'https://api.sheetbest.com/sheets/0346d54b-3e7b-4fe6-b98a-e3242e7b78da';
  const SUPPORT_EMAIL = 'elearning@airastana.com';

  const langSelect = popup.querySelector('#langSelect');
  const faqList = popup.querySelector('#faqList');
  const faqInput = popup.querySelector('#faqInput');
  const faqSend = popup.querySelector('#faqSend');

  async function loadFaq(lang) {
    faqList.innerHTML = 'Загрузка...';
    try {
      const res = await fetch(`${SHEET_API_URL}?lang=${lang}`);
      const data = await res.json();
      faqList.innerHTML = '';
      data.forEach(item => {
        const q = document.createElement('div');
        q.style.fontWeight = 'bold';
        q.style.cursor = 'pointer';
        q.style.marginTop = '10px';
        q.textContent = item.question;

        const a = document.createElement('div');
        a.style.display = 'none';
        a.style.marginBottom = '10px';
        a.style.fontSize = '14px';
        a.textContent = item.answer;

        q.onclick = () => {
          a.style.display = a.style.display === 'block' ? 'none' : 'block';
        };

        faqList.appendChild(q);
        faqList.appendChild(a);
      });
    } catch (e) {
      faqList.innerHTML = 'Ошибка загрузки FAQ.';
    }
  }

  langSelect.onchange = () => loadFaq(langSelect.value);
  faqInput.oninput = () => {
    const question = encodeURIComponent(faqInput.value);
    faqSend.href = `mailto:${SUPPORT_EMAIL}?subject=Вопрос из LMS&body=${question}`;
  };

  window.addEventListener('load', () => loadFaq(langSelect.value));
})();
