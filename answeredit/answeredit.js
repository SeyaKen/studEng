const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  articleId = localStorage.getItem('articleId');
  dataCollect();
  if(userr && auth.currentUser.emailVerified) {
    console.log('ログインしています。');
    uid = userr.uid;
    user = userr;
    storagePersonalRef = firebase.storage().ref(userr.uid);
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        imageSrc = "https://firebasestorage.googleapis.com/v0/b/studeng.appspot.com/o/44884218_345707102882519_2446069589734326272_n.jpeg?alt=media&token=9c968cd9-872c-4250-8419-eb888f236b43";
        userName = snapshot.data().name;
      } else {
        imageSrc = snapshot.data().ProfilePicture;
        userName = snapshot.data().name;
      }
    });
  }
});

let articleId;
var user;
var uid;
let storagePersonalRef;
let imageSrc;
let userName;

const target = document.getElementById('question-container-inner1');
const articleBody = document.getElementById('question-container-inner1');
const mainQuestion = document.getElementById('main-question');

// keyが押し込まれた時に発火する関数
// 一番上の行の時だけbackspace押すと、サブタイトルになる関数
document.addEventListener('keydown', (event) => {
  // 一番下の方に来た時自動で少し
  // 要素の位置座標を取得
  if(event.keyCode == 13) {
    let child = target.lastElementChild;
    var clientRect = child.getBoundingClientRect();
    var A = document.documentElement;
    var Y = A.scrollHeight - A.clientHeight;
    if(clientRect.top > 200) {
      window.scroll({top: Y - 200, left: 0, behavior: 'smooth'});
    }
  }
});

document.addEventListener('keyup', (event) => {
  if(target.innerHTML == ''
  && event.code == 'Backspace') {
    let pTag = document.createElement('p');
    pTag.setAttribute('id', 'placeholder');
    pTag.setAttribute('onclick', '');
    let brTag = document.createElement('br');
    pTag.appendChild(brTag);
    target.appendChild(pTag);
  }
});

// 質問をうつす関数
function dataCollect() {
  db.collection('questions').doc(articleId).collection('answers').orderBy('date', 'desc').get().then((snapshot) => {
    snapshot.forEach(doc => {
      if(doc.data().answer == uid) {
        articleData(doc);
      }
    })
  });
};

// 記事の内容をHTMLとして映す関数
function articleData(individualDoc) {
  for(let i = 0; i < individualDoc.data()['answerList'].length; i++) {
    if(individualDoc.data()['answerList'][i].slice(0, 38) != 'https://firebasestorage.googleapis.com') {
      let articleBodyP = document.createElement('p');
      articleBodyP.innerHTML = individualDoc.data()['answerList'][i];
      articleBody.appendChild(articleBodyP);
    } else {
      // バツボタンの処理
      let pTag = document.createElement('p');
      let brTag = document.createElement('br');
      let buttonTag = document.createElement('button');
      let xTag = document.createElement('p');
      xTag.innerHTML = '×'; 
      buttonTag.setAttribute('value', individualDoc.data()['answerList'][i]);
      buttonTag.setAttribute('onclick', 'deletePicture(this.value)');
      buttonTag.setAttribute('contenteditable', 'false');
      buttonTag.setAttribute('class', 'delete-picture-button');
      buttonTag.appendChild(xTag);
      pTag.appendChild(brTag);

      let articleBodyFigure = document.createElement('figure');
      let articleBodyImg = document.createElement('img');
      articleBodyImg.setAttribute('src', individualDoc.data()['answerList'][i]);
      articleBodyFigure.setAttribute.className = 'question-picture0';
      articleBodyFigure.setAttribute('id', individualDoc.data()['answerList'][i]);
      articleBodyImg.setAttribute('width', '100%');
      articleBodyFigure.appendChild(buttonTag);
      articleBodyFigure.appendChild(articleBodyImg);
      articleBody.appendChild(articleBodyFigure);
    };
  }
};

// buttonを使ってinputを押す処理
function inputClick() {
  document.getElementById('files').click();
}

// Firebaseに画像をアップロードする関数
function uploadData() {
  var randomStrings1 = Math.random().toString(32).substring(2);
  var randomStrings2 = Math.random().toString(32).substring(2);
  var randomStrings = randomStrings1 + randomStrings2;
  let file = document.getElementById('files').files[0];
  let thisRef = storagePersonalRef.child(randomStrings);
  thisRef.put(file).then(res=> {
    thisRef.getDownloadURL().then(url => {
        let pTag = document.createElement('p');
        let brTag = document.createElement('br');
        let buttonTag = document.createElement('button');
        let xTag = document.createElement('p');
        xTag.innerHTML = '×'; 
        buttonTag.setAttribute('value', randomStrings);
        buttonTag.setAttribute('onclick', 'deletePicture(this.value)');
        buttonTag.setAttribute('contenteditable', 'false');
        buttonTag.setAttribute('class', 'delete-picture-button');
        buttonTag.appendChild(xTag);
        pTag.appendChild(brTag);
        let figureParent = document.createElement('figure');
        figureParent.setAttribute('class', 'question-picture0');
        figureParent.setAttribute('id', randomStrings);
        figureParent.setAttribute('value', url);
        let childImg = document.createElement('img');
        childImg.setAttribute('src', url);
        childImg.setAttribute('width', '100%');
        childImg.setAttribute('contenteditable', 'false');
        childImg.setAttribute('draggabel', 'false');
        figureParent.appendChild(buttonTag);
        figureParent.appendChild(childImg);
        target.appendChild(figureParent);
        target.appendChild(pTag);
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log('エラー' + e);
  });
}

// figureの監視
const observer = new MutationObserver(records => {
  try{
    if(records[0].addedNodes[0].nodeName == 'FIGURE'
    && records[0].addedNodes[0].innerHTML == '<br>') {
      kesitai = records[0].addedNodes[0].setAttribute('id', 'kesitai');
    }
  } catch(e) {
    console.log(e);
  }
});
  
  // 監視の開始
  observer.observe(target, {
    childList: true
  });

// 写真を消す関数
var deleteImagesList = [];
function deletePicture(value) {
  document.getElementById(value).remove();
  deleteImagesList.push(value);
  // これを使って、Referenceなしで削除できる。
  // firebase.storage().refFromURL(value).delete();
}

// ページを離れる時の関数
window.onbeforeunload = function(e) {
  return '変更内容が保存されないかもしれませんがよろしいですか？';
};

// データベースに情報を入れる関数
function questionInsert() {
  for(let i = 0; i < deleteImagesList.length; i++) {
    firebase.storage().refFromURL(deleteImagesList[i]).delete();
  }
  window.onbeforeunload = null;
  const questionList = [];
  let children = document.getElementById('question-container-inner1').children;
  for(let i = 0; i < children.length; i++) {
    if(children[i].tagName == 'P') {
      questionList.push(children[i].innerHTML);
    } else if (children[i].tagName == 'FIGURE') {
      if(children[i].getAttribute('value') != null) {
        questionList.push(children[i].getAttribute('value'));
      } else {
        questionList.push(children[i].getAttribute('id'));
      }
    };
  }
  var date = new Date();
  db.collection('questions').doc(articleId).collection('answers').doc(uid).update({
    date: date,
    answer: uid,
    answerList: questionList,
    answerImg: imageSrc,
    answerName: userName,
  }).then(() => {
    console.log('成功');
    // ここに戻るを指定。
    history.back();
  }).catch(err => {
    console.log(err.message);
    console.log('失敗');
  });
}

