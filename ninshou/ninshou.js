// ユーザーがログインしているか確認
const loginError = document.getElementById('loginError');
function reload(){
  auth.onAuthStateChanged(user => {
    if(user && auth.currentUser.emailVerified) {
      console.log('メール認証確認。');
      location = '../home/home.html';
    } else {
      console.log('メール認証確認がまだ行われていません。');
      loginError.innerText = 'メール認証確認がまだ行われていません。'
    }
  });
}