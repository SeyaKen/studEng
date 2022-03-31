// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  db.collection('users').doc(userr.uid).get().then(snapshot=> {
    if(userr && auth.currentUser.emailVerified) {
      let userName = document.getElementById('userName');
      let userText = document.getElementById('userText');
      userName.value = snapshot.data().name;
      userText.value = snapshot.data().selfIntroduction;
      if(snapshot.data().ProfilePicture == '') {
        uid = userr.uid;
        user = userr;
        storagePersonalRef = firebase.storage().ref(userr.uid);
        let imageSrc = document.getElementById('unregistered-picture');
        imageSrc.setAttribute('src', '../images/user.jpg');
      } else {
        uid = userr.uid;
        user = userr;
        storagePersonalRef = firebase.storage().ref(userr.uid);
        url = snapshot.data().ProfilePicture;
        let imageSrc = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageSrc.setAttribute('src', url);
        console.log('ログインしています！');
      }
  } else {
    console.log('ログインしていません。')
    history.back();
  }
  });
});

var user;
var uid;
let storagePersonalRef;

// buttonを使ってinputを押す処理
function inputClick() {
  document.getElementById('files').click();
}

// Firebaseに画像をアップロードする関数
function uploadData() {
  let file = document.getElementById('files').files[0];
  let thisRef = storagePersonalRef.child('ProfilePicture');
  thisRef.put(file).then(res=> {
    console.log('Uploaded');
    thisRef.getDownloadURL().then(url => {
      db.collection('users').doc(user.uid).update({
        ProfilePicture: url,
      }).then(() => {
        console.log('写真成功！');
        let imageSrc = document.getElementById('unregistered-picture');
        // data-idという属性をここで付加している。
        imageSrc.setAttribute('src', url);
        console.log(url);
      }).catch(err => {
        console.log(err);
        console.log('メール認証が終わっていません。');
        console.log('ログインしていません。');
    });
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log('エラー' + e);
  });
}

// ボタンの色、機能を管理する関数
var Name = 0;
var SelfIntroduction = 0;
var element = document.getElementById('edit-button');
function NameLength(str) {
  SelfIntroduction = str.length;
  (Name > 0 && SelfIntroduction > 0)
  ? element.style.backgroundColor = "#00E4FF"
  : element.style.backgroundColor = "#78f0fd"
}
function SelfIntroductionLength(str) {
  Name = str.length;
  (Name > 0 && SelfIntroduction > 0)
  ? element.style.backgroundColor = "#00E4FF"
  : element.style.backgroundColor = "#78f0fd"
}

function moveToHome() {
  location = '../home/home.html';
};
