function onload() {
  console.log('body is laoded');
}

// 新規登録画面へ
function moveLogin(){
  console.log('発火');
  location = '../login/login.html';
};

// パスワードの切り替え
const txt = document.getElementById('register-password');
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
const focus = document.getElementById('register-password');
function focusCheck() {
  if (focus === document.activeElement) {
    console.log('Element has focus!');
  } else {
      console.log(`Element is not focused.`);
  }
}

// ボタンの色、機能を管理する関数
/*メールアドレスのパターン 正規表現*/
var pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
var registerEmail = 0;
var registerPassword = 0;
var element = document.getElementById('register-button');
function passwordLength(str) {
  registerPassword = str.length;
  (pattern.test(document.getElementById('register-email').value) && registerPassword > 7)
  ? element.style.backgroundColor = "#04cfe7"
  : element.style.backgroundColor = "#78f0fd"
}
function emailLength(str) {
  registerEmail = str.length;
  (pattern.test(document.getElementById('register-email').value) && registerPassword > 7)
  ? element.style.backgroundColor = "#04cfe7"
  : element.style.backgroundColor = "#78f0fd"
}

const register = document.getElementById('register-form');

register.addEventListener('submit', e=> {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  if(password.length < 8) {
    const errorOn = document.getElementById('registerError');
    errorOn.classList.add('error-on');
    registerError.innerText = '7文字以上のパスワードを設定してください。';
  } else {
    register.reset();
    try{
      auth.createUserWithEmailAndPassword(email, password).then(result => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          console.log('新規登録に成功しました。');
          // ここに指定したページに移動させる。
          location = '../ninshou/ninshou.html';
        }).catch(err => {
          console.log(err.message);
          console.log('エラー0');
          const registerError = document.getElementById('registerError');
          const errorOn = document.getElementById('registerError');
          errorOn.classList.add('error-on');
          (err.message == 'The email address is already in use by another account.')
          ? registerError.innerText = '既に登録済みです。'
          : registerError.innerText = '正しいメールアドレスもしくはパスワード入力してください。'
          console.log('新規登録に失敗しました。');
      }).catch(err => {
        console.log(err.message);
        console.log('エラー1');
        const errorOn = document.getElementById('registerError');
        errorOn.classList.add('error-on');
        const registerError = document.getElementById('registerError');
        (err.message == 'The email address is already in use by another account.')
        ? registerError.innerText = '既に登録済みです。'
        : registerError.innerText = '正しいメールアドレスもしくはパスワード入力してください。'
        console.log('新規登録に失敗しました。');
      });
    }).catch(err => {
      console.log(err.message);
      console.log('エラー2');
      const errorOn = document.getElementById('registerError');
      errorOn.classList.add('error-on');
      const registerError = document.getElementById('registerError');
      (err.message == 'The email address is already in use by another account.')
      ? registerError.innerText = '既に登録済みです。'
      : registerError.innerText = '正しいメールアドレスもしくはパスワード入力してください。'
      console.log('新規登録に失敗しました。');
    });
  } catch(err) {
      console.log(err.message);
      console.log('エラー3');
      const errorOn = document.getElementById('registerError');
      errorOn.classList.add('error-on');
      const registerError = document.getElementById('registerError');
      (err.message == 'The email address is already in use by another account.')
      ? registerError.innerText = '既に登録済みです。'
      : registerError.innerText = '正しいメールアドレスもしくはパスワード入力してください。'
      console.log('新規登録に失敗しました。');
    };
  }
});