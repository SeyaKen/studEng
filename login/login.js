function loadbody() {
  console.log('body is laoded');
}

// ボタンの色、機能を管理する関数
var loginEmail = 0;
var loginPassword = 0;
var element = document.getElementById('login-button');
function passwordLength(str) {
  loginPassword = str.length;
  (loginEmail > 0 && loginPassword > 7)
  ? element.style.backgroundColor = "#04cfe7"
  : element.style.backgroundColor = "#78f0fd"
}
function emailLength(str) {
  loginEmail = str.length;
  (loginEmail > 0 && loginPassword > 7)
  ? element.style.backgroundColor = "#04cfe7"
  : element.style.backgroundColor = "#78f0fd"
}


// パスワードの切り替え
const txt = document.getElementById('login-password');
const btnEye = document.getElementById('password-eye');
function pushHideButton() {
  if (txt.type === "text") {
    txt.type = "password";
    btnEye.className = "fa fa-eye";
  } else {
    txt.type = "text";
    btnEye.className = "fa fa-eye-slash";
  }
}

// フォーカスに伴う変化の関数
var txtPass = document.getElementById('for-password');
function pushFocus() {
  txtPass.classList.remove("password-input");
  txtPass.classList.add("for-password-focus");
}
function blurFocus() {
  txtPass.classList.remove("for-password-focus");
}

// フォーカスの感知
const focus = document.getElementById('login-password');
function focusCheck() {
  if (focus === document.activeElement) {
    console.log('Element has focus!');
  } else {
      console.log(`Element is not focused.`);
  }
}

// 新規登録画面へ
function moveRegister(){
  console.log('発火');
  location = '../register/register.html';
};

// ログイン
const loginForm = document.getElementById('login-form');
// 対象要素.addEventListener( イベントの種類, 関数, false )
// 上で取得した、login-form要素のsubmitが押された時
// 2番目の引数に指定した関数が発火する
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;
  // console.log(loginEmail, loginPassword);
  auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
    if (auth.currentUser.emailVerified) {
      console.log('ログインに成功しました。');
      location = '../home/home.html';
    } else {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification();
      location = '../ninshou/ninshou.html';
    }
  }).catch(err => {
    console.log(err.message);
    const errorOn = document.getElementById('loginError');
    errorOn.classList.add('error-on');
    const loginError = document.getElementById('loginError');
    // idがloginErrorの要素の中身にエラーメッセージを代入。
    (err.message == 'The password is invalid or the user does not have a password.')
    ? loginError.innerText = 'パスワードが間違っています。'
    : loginError.innerText = 'メールアドレスが登録されていません。'
  });
});