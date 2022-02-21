
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  try{
    firebase.storage().ref(userr.uid).child('ProfilePicture');
      if(userr && auth.currentUser.emailVerified) {
        uid = userr.uid;
        user = userr;
        storagePersonalRef = firebase.storage().ref(userr.uid);
        storagePersonalRef.child('ProfilePicture').getDownloadURL().then(url => {
        let imageSrc = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageSrc.setAttribute('src', url);
        }).catch(e => {
          console.log('エラーです。');
          console.log(e);
          uid = userr.uid;
          user = userr;
          storagePersonalRef = firebase.storage().ref(userr.uid);
        });
        console.log('ログインしています！');
    } else {
      console.log('ログインしていません。')
      history.back();
    }
  } catch(e) {
    if(userr && auth.currentUser.emailVerified) {
    console.log(e);
    uid = userr.uid;
    user = userr;
    storagePersonalRef = firebase.storage().ref(userr.uid);
    } else {
      console.log('ログインしていません。')
      history.back();
    }
  }
});

var user;
var uid;
let storagePersonalRef;

// Firebaseから画像をダウンロードする関数
// storagePersonalRef.child('Web 1920 – 1.png').delete.then~
// で画像を消すことができる。
// storagePersonalRef.child('Web 1920 – 1.png').getDownloadURL().then(url => {
// }).catch(e => {
//   console.log(e);
// });

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
      let imageSrc = document.getElementById('unregistered-picture');
      // data-idという属性をここで付加している。
      imageSrc.setAttribute('src', url);
      console.log(url);
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log('エラー' + e);
  });
}

function toggle(me, theOther) {
  document.getElementById(me).style.backgroundColor = "#0071e3";
  document.getElementById(theOther).style.backgroundColor = "transparent";
}
