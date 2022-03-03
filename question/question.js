const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  if(userr && auth.currentUser.emailVerified) {
    console.log('ログインしています。');
    firstButtonCreater(target.lastElementChild);
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
        let imageSrc = document.getElementById('unregistered-picture');
        imageSrc.setAttribute('src', '../images/user.jpg');
      } else {
        uid = userr.uid;
        user = userr;
        url = snapshot.data().ProfilePicture;
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

// keyが押し込まれた時に発火する関数
// 一番上の行の時だけbackspace押すと、サブタイトルになる関数
document.addEventListener('keydown', (event) => {
  var current = document.activeElement.children[0];
  console.log(target.lastElementChild != current);
  console.log(target.lastElementChild.innerHTML == '<br>');
  if(target.lastElementChild.innerHTML == '<br>') {
    if(target.lastElementChild == current
      && event.code == 'Backspace') {
      document.getElementById('input2').focus();
    }
  }
  var deleteTarget = document.getElementById('plus-buttton');
  if(deleteTarget != null) {
    console.log(deleteTarget);
    console.log('消せていますか？？');
    deleteTarget.remove();
  }
});

// クリックした同じ行じゃなかったら、既存のボタンを消して新しいボタンを作る
document.addEventListener('click', (event) => {
  const deleteTarget = document.getElementById('plus-buttton');
  deleteTarget.remove();
  let px = event.pageX;  //クリックX
  let py = event.pageY;  //クリックY
 
  let ox = window.pageXOffset;  //スクロールX
  let oy = window.pageYOffset;  //スクロールY
 
  let obj = document.elementFromPoint(px - ox, py - oy);  //object
 
  let objX = obj.getBoundingClientRect().left;  //objectのX
  let objY = obj.getBoundingClientRect().top;

  var top = document.documentElement.scrollTop || document.body.scrollTop;
  
  objY = objY.bottom + top;

  console.log("クリックした位置のX座標　x:" + (px-ox));
  console.log("クリックした位置のY座標　y:" + (py-oy));
  console.log("クリックした要素のX座標　x:" + objX);
  console.log("クリックした要素のY座標　y:" + objY);
  if(deleteTarget != null) {
    console.log('消せてる？');
    deleteTarget.remove();
  }
  let child = document.getElementById(currentId);
  // 要素の位置座標を取得
  var clientRect = child.getBoundingClientRect();
  // 画面の左端から、要素の左端までの距離
  var x = clientRect.left + 40;
  // 画面の上端から、要素の上端までの距離
  var top = document.documentElement.scrollTop || document.body.scrollTop
  var A = document.documentElement;
  var Y = A.scrollHeight - A.clientHeight;
  if(clientRect.top > 600) {
    window.scroll({top: Y - 250, left: 0, behavior: 'smooth'});
  }
});

var currentId;

function Text(id) {
  console.log('idです！');
  console.log(id);
  currentId = id;
}

// 元々いる場所の位置情報をもとに＋？pxタスことで
// ボタンの位置を特定する関数
// 引数に基準となる要素を引数に指定
function buttonCreater(child) {
  // 要素の位置座標を取得
  var clientRect = child.getBoundingClientRect();
  // 画面の左端から、要素の左端までの距離
  var x = clientRect.left + 40;
  // 画面の上端から、要素の上端までの距離
  var top = document.documentElement.scrollTop || document.body.scrollTop
  var A = document.documentElement;
  var Y = A.scrollHeight - A.clientHeight;
  if(clientRect.top > 600) {
    window.scroll({top: Y - 250, left: 0, behavior: 'smooth'});
  }
  
  var y = clientRect.bottom + top - 36;

  let plusButton = document.createElement('button');
  plusButton.className = 'plus-button';
  plusButton.setAttribute('id', 'plus-buttton');
  let plusIcon = document.createElement('p');
  plusIcon.className = 'plus-button-icon';
  plusIcon.innerHTML = '+';
  plusButton.appendChild(plusIcon);
  plusButton.setAttribute('onclick', 'optionsToggle()');
  target1.prepend(plusButton);
  target1.style.display = "flex";
  target1.style.top = `${y}px`;
  target1.style.left = `${x}px`;
}

// ここから上がまだ完成していない。

// 最初だけこの関数でボタンを作る
function firstButtonCreater(child) {
  // 要素の位置座標を取得
  var clientRect = child.getBoundingClientRect();
  // 画面の左端から、要素の左端までの距離
  var x = clientRect.left + 40;
  // 画面の上端から、要素の上端までの距離
  var top = document.documentElement.scrollTop || document.body.scrollTop
  var A = document.documentElement;
  var Y = A.scrollHeight - A.clientHeight;
  if(clientRect.top > 600) {
    window.scroll({top: Y - 250, left: 0, behavior: 'smooth'});
  }
  
  var y = clientRect.bottom + top - 36;

  let plusButton = document.createElement('button');
  plusButton.className = 'plus-button';
  plusButton.setAttribute('id', 'plus-buttton');
  let plusIcon = document.createElement('p');
  plusIcon.className = 'plus-button-icon';
  plusIcon.innerHTML = '+';
  plusButton.appendChild(plusIcon);
  plusButton.setAttribute('onclick', 'optionsToggle()');
  target1.prepend(plusButton);
  target1.style.display = "flex";
  target1.style.top = `${y}px`;
  target1.style.left = `${x}px`;
}

// ボタンの機能をdisplayしたり消したりする関数
function optionsToggle() {
  const optionsButton = document.getElementById('plus-button-options');
  (optionsButton.style.visibility == 'hidden')
  ? optionsButton.style.visibility = 'visible'
  : optionsButton.style.visibility = 'hidden'
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