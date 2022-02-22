
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  try{
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
    if(userr && auth.currentUser.emailVerified) {
      document.getElementById("header-right-logouted").style.display = "none";
      if(snapshot.data().ProfilePicture == '') {
        uid = userr.uid;
        user = userr;
      } else {
        uid = userr.uid;
        user = userr;
        url = snapshot.data().ProfilePicture;
        let imageSrc = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageSrc.setAttribute('src', url);
        console.log('ログインしています！');
      }
  } else {
    document.getElementById("header-right-logined").style.display = "none";
    console.log('ログインしていません。')
  }
  }).catch(err => {
    console.log(err.message);
    document.getElementById("header-right-logined").style.display = "none";
  });
});

var user;
var uid;
let storagePersonalRef;

function moveToQuestion() {
  location = '../question/question.html';
};

function logout() {
  auth.signOut().then(() => {
    location = '../index/index.html';
  });
};

function moveToProfile() {
  location = '../profile/profile.html';
};

function moveToLogin() {
  location = '../login/login.html';
};

function moveToRegister() {
  location = '../register/register.html';
};