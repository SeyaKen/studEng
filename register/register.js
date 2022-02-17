function loadbody() {
  console.log('body is laoded');
}

// 新規登録画面へ
function moveLogin(){
  console.log('発火');
  location = '../login/login.html';
};

const register = document.getElementById('register-form');

register.addEventListener('submit', e=>{
  e.preventDefault();
  console.log(register);
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  if(password.length < 8) {
    registerError.innerText = '7文字以上のパスワードを設定してください。';
  } else {
    register.reset();
    auth.createUserWithEmailAndPassword(email, password).then(cred=>{
      return db.collection('users').doc(cred.user.uid).set({
        Email: email,
      }).then(() => {
        console.log('新規登録に成功しました。');
        // ここに指定したページに移動させる。
        location = '../home/home.html';
      }).catch(err => {
        console.log(err.message);
        const registerError = document.getElementById('registerError');
        registerError.innerText = err.message;
        console.log('新規登録に失敗しました。');
      }).catch(err => {
        console.log(err.message);
        const registerError = document.getElementById('registerError');
        registerError.innerText = err.message;
        console.log('新規登録に失敗しました。');
      });
    }).catch(err => {
      console.log(err.message);
      const registerError = document.getElementById('registerError');
      (err.message == 'The email address is already in use by another account.')
      ? registerError.innerText = '既に登録済みです。'
      : 
      console.log('新規登録に失敗しました。');
    });
  }
});