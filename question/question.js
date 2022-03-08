const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
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

var user;
var uid;
let storagePersonalRef;
let imageSrc;
let userName;

// +ボタンの処理
// 監視ターゲットの取得
const target = document.getElementById('question-container-inner1');
const target1 = document.getElementById('plus-buttton-container');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

// keyが押し込まれた時に発火する関数
// 一番上の行の時だけbackspace押すと、サブタイトルになる関数
var even;
document.addEventListener('keydown', (event) => {
  even = event;
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

  var current = document.activeElement.children[0];
  if(target.children[0].innerHTML == '<br>'
  && target.children[0] == current
  && event.code == 'Backspace') {
    // input2.focus();
  } else if(event.path[0].id == 'input2'
  && event.path[0].value == ''
  && event.code == 'Backspace') {
    input1.focus();
  } else if(event.path[0].id == 'input1'
  && event.path[0].value == ''
  && event.code == 'Backspace') {
    input2.focus();
  } else if(event.path[0].id == 'input2'
  && event.keyCode == 13) {
    focusDetect();
    target.focus();
  } else if(event.path[0].id == 'input1'
  && event.keyCode == 13) {
    input2.focus();
  }
});

var pChecker;
var undifined;
document.addEventListener('keyup', (event) => {
  if(even.path[0].id == 'question-container-inner1'
    && event.path[0].childNodes[0] == undifined
    && event.code == 'Backspace') {
    let pTag = document.createElement('p');
    pTag.setAttribute('id', 'placeholder');
    pTag.setAttribute('onclick', '');
    let brTag = document.createElement('br');
    pTag.appendChild(brTag);
    target.appendChild(pTag);
    input2.focus();
  }
  if(even.keyCode == 13) {
    if(even.path[0].id == 'input2'
    && even.code == 'Enter') {
      target.children[0].remove();
    }
    var kesitai = document.getElementById('kesitai');
    if(kesitai != null) {
      kesitai.remove();
      kesitai = null;
      let pTag = document.createElement('p');
      let brTag = document.createElement('br');
      pTag.appendChild(brTag);
      target.appendChild(pTag);
    }
  }
});

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
  console.log(file);
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

// ページを離れる時の関数
window.onbeforeunload = function(e) {
  return '変更内容が保存されないかもしれませんがよろしいですか？';
};

function deletePicture(value) {
  console.log(value);
  document.getElementById(value).remove();
  storagePersonalRef.child(value).delete();
}

function focusDetect() {
  document.getElementById('placeholder').classList.remove("before-click");
  document.getElementById('placeholder').classList.add("after-click");
  document.getElementById('placeholder').innerHTML = '<br>';
  document.getElementById('placeholder').removeAttribute('onclick');
}

// データベースに情報を入れる関数
function questionInsert() {
  window.onbeforeunload = null;
  const questionList = [];
  let caption = document.getElementById('input1').value;
  let subCaption = document.getElementById('input2').value;
  console.log(subCaption);
  let children = document.getElementById('question-container-inner1').children;
  for(let i = 0; i < children.length; i++) {
    if(children[i].tagName == 'P') {
      questionList.push(children[i].innerHTML);
    } else if (children[i].tagName == 'FIGURE') {
      questionList.push(children[i].getAttribute('value'));
    };
  }
  var randomStrings1 = Math.random().toString(32).substring(2);
  var randomStrings2 = Math.random().toString(32).substring(2);
  var randomStrings0 = randomStrings1 + randomStrings2;
  var date = new Date();
  db.collection('questions').doc(randomStrings0).set({
    caption: caption,
    subCaption: subCaption,
    date: date,
    asker: uid,
    quesitionList: questionList,
    askerImg: imageSrc,
    askerName: userName,
  }).then(() => {
    console.log('成功');
    // ここに指定したページに移動させる。
    location = '../home/home.html';
  }).catch(err => {
    console.log(err.message);
    console.log('失敗');
  });
}

function moveToProfile() {
  location = '../profile/profile.html';
};

function moveToLogin() {
  location = '../login/login.html';
};

function moveToRegister() {
  location = '../register/register.html';
};