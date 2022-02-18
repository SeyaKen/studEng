function loadbody() {
  console.log('body is laoded');
}

// ボタンの色、機能を管理する関数
var registerEmail = 0;
var registerPassword = 0;
var element = document.getElementById('login-button');
function passwordLength(str) {
  registerPassword = str.length;
  (registerEmail > 0 && registerPassword > 7)
  ? element.style.backgroundColor = "#0071e3"
  : element.style.backgroundColor = "#5aaaf9"
}
function emailLength(str) {
  registerEmail = str.length;
  (registerEmail > 0 && registerPassword > 7)
  ? element.style.backgroundColor = "#0071e3"
  : element.style.backgroundColor = "#5aaaf9"
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
    console.log('ログインに成功しました。');
    location = '../home/home.html';
  }).catch(err => {
    console.log(err.message);
    const loginError = document.getElementById('loginError');
    // idがloginErrorの要素の中身にエラーメッセージを代入。
    (err.message == 'The password is invalid or the user does not have a password.')
    ? loginError.innerText = 'パスワードが間違っています。'
    : loginError.innerText = 'メールアドレスが登録されていません。'
  });
});