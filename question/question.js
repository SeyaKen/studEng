const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  if(userr && auth.currentUser.emailVerified) {
    console.log('ログインしています。');
    let parentDiv = document.createElement('div');
    parentDiv.className = 'header-right-logined';

    let button1 = document.createElement('button');
    let imageProfile = document.createElement('img');
    button1.className = 'to-profile-button';
    button1.setAttribute('onclick', 'moveToProfile()');
    imageProfile.className = 'fas fa-user unregistered-picture';
    imageProfile.setAttribute('id', 'unregistered-picture');
    button1.appendChild(imageProfile);

    parentDiv.appendChild(button1);
    addContainer.appendChild(parentDiv);
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        uid = userr.uid;
        user = userr;
        storagePersonalRef = firebase.storage().ref(userr.uid);
        let imageSrc = document.getElementById('unregistered-picture');
        imageSrc.setAttribute('src', '../images/user.jpg');
      } else {
        uid = userr.uid;
        user = userr;
        url = snapshot.data().ProfilePicture;
        storagePersonalRef = firebase.storage().ref(userr.uid);
        let imageSrc = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageSrc.setAttribute('src', url);
      }
    });
  } else {
    console.log('ログインしていません。');
    let parentDiv = document.createElement('div');
    parentDiv.className = 'header-right-logouted';

    let button0 = document.createElement('button');
    button0.textContent = 'ログイン';
    button0.setAttribute('onclick', 'moveToLogin()');

    let button1 = document.createElement('button');
    button1.textContent = '新規登録';
    button1.setAttribute('onclick', 'moveToRegister()');

    parentDiv.appendChild(button0);
    parentDiv.appendChild(button1);
    addContainer.appendChild(parentDiv);
  }
});

var user;
var uid;

// +ボタンの処理
// 監視ターゲットの取得
const target = document.getElementById('question-container-inner1');
const target1 = document.getElementById('plus-buttton-container');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

// keyが押し込まれた時に発火する関数
// 一番上の行の時だけbackspace押すと、サブタイトルになる関数
document.addEventListener('keydown', (event) => {
  // 一番下の方に来た時自動で少し
  // 要素の位置座標を取得
  if(event.key == "Enter") {
    let child = target.lastElementChild;
    var clientRect = child.getBoundingClientRect();
    var A = document.documentElement;
    var Y = A.scrollHeight - A.clientHeight;
    if(clientRect.top > 200) {
      window.scroll({top: Y - 200, left: 0, behavior: 'smooth'});
    }
  }

  var current = document.activeElement.children[0];
  if(target.lastElementChild.innerHTML == '<br>'
  && target.lastElementChild == current
  && event.code == 'Backspace') {
    input2.focus();
    input2Check = true;
  } else if(input2.innerHTML == ''
  && input2Check
  && event.code == 'Backspace') {
    input1.focus();
    input2Check = false;
    input1Check = true;
  } else if(input1.innerHTML == ''
  && input1Check
  && event.code == 'Enter') {
    input2.focus();
    input1Check = false;
    input2Check = true;
  } else if(input2.innerHTML == ''
  && input2Check
  && event.code == 'Enter') {
    console.log(target.children[0]);
    target.focus();
    input1Check = false;
  }
});

document.addEventListener('keyup', (event) => {
  if(event.key == "Enter") {
    if(input2.innerHTML == ''
    && input2Check
    && event.code == 'Enter') {
      target.children[0].remove();
      input2Check = false;
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

// クリックした時
var input1Check;
var input2Check;
document.addEventListener('click', (event) => {
  if(event.srcElement.id == 'input1') {
    input1Check = true;
  } else if (event.srcElement.id == 'input2') {
    input2Check = true;
  };
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
  var randomStrings = Math.random().toString(32).substring(2);
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

function deletePicture(value) {
  console.log(value);
  document.getElementById(value).remove();
  storagePersonalRef.child(value).delete();
}

function focusDetect() {
  document.getElementById('paceholder').classList.add("after-click");
  document.getElementById('paceholder').innerHTML = '<br>';
  document.getElementById('paceholder').removeAttribute('onclick');
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