
// ユーザーがログインしているか確認
auth.onAuthStateChanged(user=>{
  if(user) {
    console.log('ログイン済み');
  } else {
    console.log('ログインしていません。');
    location = '../index/index.html';
  }
});

function logout() {
  auth.signOut().then(() => {
    location = '../index/index.html';
  });
};