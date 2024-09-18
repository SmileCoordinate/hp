// JavaScriptでテンプレートを読み込む
function loadChatBotTemplate() {
  fetch('bot.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
      // ここにChatBotのスクリプトを記述
      initializeChatBot();
    })
    .catch(error => console.error('Error loading chatbot template:', error));
}

// toggleChatWindow関数をグローバルスコープに移動
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
}

function initializeChatBot() {
  // ChatBotのスクリプト
  function toggleChatWindow() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  }

  const PROJECT_ID = 'YOUR_PROJECT_ID';
  function askQuestion() {
    const userQuestion = document.getElementById('user-input').value;

    const request = {
      queryInput: {
        text: {
          text: userQuestion,
          languageCode: 'ja',
        },
      },
    };

    document.getElementById('user-input').value = '';
  }

  function handleResponse(response) {
    const botReply = response.queryResult.fulfillmentText;
    addMessage('ChatBot', botReply);
  }

  function addMessage(sender, message) {
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div><strong>${sender}:</strong> ${message}</div>`;
  }

  jQuery.noConflict();
  jQuery(document).ready(function($) {
    const chatWindow = $('#chat');
    const categoryRadio = $('input[name="category"]');
    const keywordRadioContainer = $('.keyword-options');
    const sendButton = $('#send-button');
    const clearButton = $('#clear-button');

    sendButton.on('click', sendMessage);
    clearButton.click(clearChat);

    function sendMessage() {
      const selectedCategory = categoryRadio.filter(':checked').val();
      if (!selectedCategory) return;
      const selectedKeyword = keywordRadioContainer.find('input[name="keyword"]:checked').val();
      if (!selectedKeyword) {
        appendMessage('bot', "キーワードを選択してください。");
        return;
      }
      const botResponse = generateResponse(selectedCategory, selectedKeyword);
      appendMessage('bot', botResponse);
    }

    function clearChat() {
      chatWindow.html('');
    }

    function appendMessage(sender, message) {
      const messageDiv = $('<div>').addClass(sender).text(message);
      chatWindow.append(messageDiv);
      chatWindow.scrollTop(chatWindow[0].scrollHeight);
    }

    function generateResponse(selectedCategory, selectedKeyword) {
      let response = '';
      if (selectedCategory === 'about') {
        response = generateAuthorResponse(selectedKeyword);
      } else if (selectedCategory === 'works') {
        response = generateArtworkResponse(selectedKeyword);
      } else if (selectedCategory === 'その他') {
        response = generateExhibitionResponse(selectedKeyword);
      } else {
        response = "選択したカテゴリーに関する解答内容です。";
      }
      return response;
    }

    function getKeywordsForCategory(selectedCategory) {
      if (selectedCategory === 'about') {
        return ['私たちについて', '私たちの想い', '私たちの目的', '私たちの活動'];
      } else if (selectedCategory === 'works') {
        return ['私たちのできること', '事業内容', '事業の詳細'];
      } else if (selectedCategory === 'その他') {
        return ['無料相談について', 'お申し込みについて', '日時の変更について', '料金について'];
      } else {
        return [];
      }
    }

    function generateAuthorResponse(selectedKeyword) {
      if (selectedKeyword === '私たちについて') {
        return "私たちは Smile Coordinate として、想いやりあるこころで、自分らしさを見つけるお手伝いをしています。";
      } else if (selectedKeyword === '私たちの想い') {
        return "私たちの想いは、人はいつからでも変わることができる、自分らしく、人としての感情や思考を大切にすることです。";
      } else if (selectedKeyword === '私たちの目的') {
        return "私たちの目的は、人としての想いや考え、自分自身とこころを大切にすること、一番は人なんだということ、を伝えていくことです。";
      } else if (selectedKeyword === '私たちの活動') {
        return "私たちの活動はコーチングやお悩み相談（カウンセリング）の他に、個人事業の事業サポート・制作を行っています。その他の活動はBlogページに投稿しているのでご覧ください。";
      }
    }

    function generateArtworkResponse(selectedKeyword) {
      if (selectedKeyword === '私たちのできること') {
        return "私たちは、こころが良い方向への変化するお手伝いをしています。潜在意識に眠る悩みやトラウマを軽減する方法を伝えることの他に、事業を寄り良くする提案（アドバイス）やサポート等を行っています。";
      } else if (selectedKeyword === '事業内容') {
        return "事業内容は「コーチング、お悩み相談（カウンセリング）」「個人事業を対象にした事業サポート、制作」を行っております。";
      } else if (selectedKeyword === '事業の詳細') {
        return "事業の詳細は画像データをダウンロードしていただくか、公式LINEもしくはコンタクトフォームからお問い合わせください。";
      }
    }

    function generateExhibitionResponse(selectedKeyword) {
      if (selectedKeyword === '無料相談について') {
        return "無料相談は「コーチング、お悩み相談（カウンセリング）、事業サポート」お1人様1回30分～45分までとなっています。";
      } else if (selectedKeyword === 'お申し込みについて') {
        return "お申し込み方法は、HPもしくは公式LINEからお申し込みができます。公式LINEを登録していただくとスムーズにお申し込みを行えますので、是非ご登録をお願いします。";
      } else if (selectedKeyword === '日時の変更について') {
        return "ご予約された日時の変更は、「遅くても2日前」までにご連絡をお願いしております。変更は予約していただいた公式LINEもしくはSmile Coordinateのメールアドレスまでご連絡をお願いします。";
      } else if (selectedKeyword === '料金について') {
        return "料金は当HPのWorksページにある「Piece一覧.jpg」もしくは公式LINEのリッチメニューからご確認いただけます。";
      }
    }

    categoryRadio.on('change', function() {
      updateKeywordOptions();
    });

    function updateKeywordOptions() {
      const selectedCategory = categoryRadio.filter(':checked').val();
      const keywordOptions = getKeywordsForCategory(selectedCategory);
      keywordRadioContainer.empty();
      for (const keyword of keywordOptions) {
        const label = $('<label>').html(`<input type="radio" name="keyword" value="${keyword}"> ${keyword}`);
        keywordRadioContainer.append(label);
      }
    }

    updateKeywordOptions();
  });
}

// ページがロードされたときにテンプレートを読み込む
document.addEventListener('DOMContentLoaded', loadChatBotTemplate);
