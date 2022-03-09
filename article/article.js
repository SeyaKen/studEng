const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  articleId = localStorage.getItem('articleId');
  console.log(articleId);
  dataCollect();
  if(userr && auth.currentUser.emailVerified) {
    console.log('ログインしています。');
    uid = userr.uid;
    user = userr;
    storagePersonalRef = firebase.storage().ref(userr.uid);
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        imageSrc = "https://firebasestorage.googleapis.com/v0/b/studeng.appspot.com/o/44884218_345707102882519_2446069589734326272_n.jpeg?alt=media&token=9c968cd9-872c-4250-8419-eb888f236b43";
        userName = snapshot.data().name;
      } else {
        imageSrc = snapshot.data().ProfilePicture;
        userName = snapshot.data().name;
      }
    });
  }
});

var user;
var uid;
let storagePersonalRef;
let imageSrc;
let userName;
let articleId;

// +ボタンの処理
// 監視ターゲットの取得
const target = document.getElementById('question-container-inner1');
const target1 = document.getElementById('plus-buttton-container');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

// 質問をうつす関数
function dataCollect() {
  db.collection('questions').doc(articleId).get().then((val)=> {
    renderData(val);
  });
};

function renderData(individualDoc) {
  input1.innerHTML = individualDoc.data().caption;
  input2.innerHTML = individualDoc.data().subCaption;
};