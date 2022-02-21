// ユーザーがログインしているか確認
auth.onAuthStateChanged(user => {
  if(user && auth.currentUser.emailVerified) {
    return ds.collection('users').doc(user.uid).set({
      name: '',
      email: '',
      selfIntroduction: '',
      ProfilePicture: '',
    }).then(() => {
      console.log('メール認証確認。');
      location = '../home/home.html';
    }).catch(err => {
      console.log(err);
      console.log('メール認証が終わっていません。');
      console.log('ログインしていません。');
  });
  } else {
    console.log('メール認証が終わっていません。');
    console.log('ログインしていません。')
  }
});

function reload(){
  document.location.reload();
};