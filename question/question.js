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

// キーボードを打った時
document.addEventListener('keyup', (event) => {
  if(target.lastElementChild.innerHTML == '<br>') {
    const deleteTarget = document.getElementById('plus-buttton');
    if(deleteTarget != null) {
      deleteTarget.remove();
    }
    buttonCreater();
  } else {
    target1.style.display = 'none';
  }
});

// クリックした時
document.addEventListener('click', (event) => {
  console.log('Click');
  var current = document.activeElement.children[check];
  console.log(current == target.lastElementChild);
  console.log(current);
  console.log(target.lastElementChild);
  if(target.lastElementChild.innerHTML == '<br>') {
    const deleteTarget = document.getElementById('plus-buttton');
    if(deleteTarget != null) {
      deleteTarget.remove();
    } else {
      buttonCreater();
    }
  } else {
    target1.style.display = 'none';
  }
});
kaisuu = 0;
// ボタンを作る関数
function buttonCreater() {
  let child = target.lastElementChild;
  child.setAttribute('value', `${kaisuu}`);
  child.setAttribute('onclick', '      ');
  console.log(kaisuu);
  kaisuu++
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