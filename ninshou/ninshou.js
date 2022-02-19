// ユーザーがログインしているか確認
auth.onAuthStateChanged(user => {
  if(user && auth.currentUser.emailVerified) {
    console.log('メール認証確認。');
    location = '../home/home.html';
  } else {
    console.log('メール認証が終わっていません。');
    console.log('ログインしていません。')
  }
});

function reload(){
  document.location.reload();
};