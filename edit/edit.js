const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  articleId = localStorage.getItem('articleId');
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

const articleBody = document.getElementById('question-container-inner1');
const input1 = document.getElementById('input1');
const mainQuestion = document.getElementById('main-question');

// 質問をうつす関数
function dataCollect() {
  db.collection('questions').doc(articleId).get().then((val)=> {
    articleData(val);
  });
};

// 記事の内容をHTMLとして映す関数
function articleData(individualDoc) {
  input1.innerHTML = individualDoc.data().caption;
  for(let i = 0; i < individualDoc.data()['quesitionList'].length; i++) {
    if(individualDoc.data()['quesitionList'][i].slice(0, 38) != 'https://firebasestorage.googleapis.com') {
      let articleBodyP = document.createElement('p');
      articleBodyP.innerHTML = individualDoc.data()['quesitionList'][i];
      articleBody.appendChild(articleBodyP);
    } else {
      // バツボタンの処理
      let pTag = document.createElement('p');
      let brTag = document.createElement('br');
      let buttonTag = document.createElement('button');
      let xTag = document.createElement('p');
      xTag.innerHTML = '×'; 
      buttonTag.setAttribute('value', individualDoc.data()['quesitionList'][i]);
      buttonTag.setAttribute('onclick', 'deletePicture(this.value)');
      buttonTag.setAttribute('contenteditable', 'false');
      buttonTag.setAttribute('class', 'delete-picture-button');
      buttonTag.appendChild(xTag);
      pTag.appendChild(brTag);

      let articleBodyFigure = document.createElement('figure');
      let articleBodyImg = document.createElement('img');
      articleBodyImg.setAttribute('src', individualDoc.data()['quesitionList'][i]);
      articleBodyImg.setAttribute('width', '100%');
      articleBodyFigure.appendChild(buttonTag);
      articleBodyFigure.appendChild(articleBodyImg);
      articleBody.appendChild(articleBodyFigure);
    };
  }
};

// 写真を消す関数
function deletePicture(value) {
  // これを使って、Referenceなしで削除できる。
  firebase.storage().refFromURL(value).delete();
}