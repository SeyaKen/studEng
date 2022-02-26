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

document.addEventListener('keyup', (event) => {
  // console.log(event.key);
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



// ボタンを作る関数
function buttonCreater() {
  let child = target.lastElementChild;

  // 要素の位置座標を取得
  var clientRect = child.getBoundingClientRect();
  // 画面の左端から、要素の左端までの距離
  var x = clientRect.left - 65;
  // 画面の上端から、要素の上端までの距離
  console.log(clientRect.top);
  var top = document.documentElement.scrollTop || document.body.scrollTop
  console.log(top);
  var A = document.documentElement;
  var Y = A.scrollHeight - A.clientHeight;
  console.log(Y);
  console.log(A.scrollHeight);
  console.log(A.clientHeight);
  if(clientRect.top > 600) {
    console.log('実行');
    window.scroll({top: Y - 250, left: 0, behavior: 'smooth'});
  }
  
  var y = clientRect.bottom + top - 33;

  let plusButton = document.createElement('button');
  plusButton.className = 'plus-button';
  plusButton.setAttribute('id', 'plus-buttton');
  let plusIcon = document.createElement('p');
  plusIcon.className = 'plus-button-icon';
  plusIcon.innerHTML = '+';
  plusButton.appendChild(plusIcon);
  plusButton.setAttribute('onclick', '');
  target1.appendChild(plusButton);
  target1.style.display = "flex";
  target1.style.top = `${y}px`;
  target1.style.left = `${x}px`;
}

// オブザーバーの作成
// const observer = new MutationObserver(records => {
//   if(document.getElementById('plus-buttton') == null) {
//     buttonCreater();
//   } else {
//     const deleteTarget = document.getElementById('plus-buttton');
//     deleteTarget.remove();
//     buttonCreater();
//   }
// });

// // 監視の開始
// observer.observe(target, {
//   childList: true
// });

function moveToProfile() {
  location = '../profile/profile.html';
};

function moveToLogin() {
  location = '../login/login.html';
};

function moveToRegister() {
  location = '../register/register.html';
};