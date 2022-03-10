const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  articleId = localStorage.getItem('articleId');
  console.log(articleId);
  dataCollect();
  if(userr && auth.currentUser.emailVerified) {
    console.log('ログインしています。');
    let parentDiv = document.createElement('div');
    parentDiv.className = 'header-right-logined';

    let button0 = document.createElement('button');
    button0.className = 'question-screen';
    button0.textContent = '質問する';
    button0.setAttribute('onclick', 'moveToQuestion()');

    let button1 = document.createElement('button');
    let imageProfile = document.createElement('img');
    button1.className = 'to-profile-button';
    button1.setAttribute('onclick', 'moveToProfile()');
    imageProfile.className = 'fas fa-user unregistered-picture';
    imageProfile.setAttribute('id', 'unregistered-picture');
    button1.appendChild(imageProfile);

    parentDiv.appendChild(button0);
    parentDiv.appendChild(button1);
    addContainer.appendChild(parentDiv);
    uid = userr.uid;
    user = userr;
    storagePersonalRef = firebase.storage().ref(userr.uid);
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        imageSrc = "https://firebasestorage.googleapis.com/v0/b/studeng.appspot.com/o/44884218_345707102882519_2446069589734326272_n.jpeg?alt=media&token=9c968cd9-872c-4250-8419-eb888f236b43";
        userName = snapshot.data().name;
        imageSrc.setAttribute('src', 'imageSrc');
      } else {
        imageSrc = snapshot.data().ProfilePicture;
        userName = snapshot.data().name;
        let imageTarget = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageTarget.setAttribute('src', imageSrc);
      }
    });
  } else {
    console.log('ログインしていません。');
    let parentDiv = document.createElement('div');
    parentDiv.className = 'header-right-logouted';

    let button0 = document.createElement('button');
    button0.textContent = 'ログイン';
    button0.setAttribute('onclick', 'moveToLogin()');

    let button1 = document.createElement('button');
    button1.textContent = '新規登録';
    button1.setAttribute('onclick', 'moveToRegister()');

    parentDiv.appendChild(button0);
    parentDiv.appendChild(button1);
    addContainer.appendChild(parentDiv);
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
const articleBody = document.getElementById('question-container-inner1');
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
  for(let i = 0; i < individualDoc.data()['quesitionList'].length; i++) {
    if(individualDoc.data()['quesitionList'][i].slice(0, 38) != 'https://firebasestorage.googleapis.com') {
      let articleBodyP = document.createElement('p');
      articleBodyP.innerHTML = individualDoc.data()['quesitionList'][i];
      articleBody.appendChild(articleBodyP);
    } else {
      let articleBodyFigure = document.createElement('figure');
      let articleBodyImg = document.createElement('img');
      articleBodyImg.setAttribute('src', individualDoc.data()['quesitionList'][i]);
      articleBodyImg.setAttribute('width', '100%');
      articleBodyFigure.appendChild(articleBodyImg);
      articleBody.appendChild(articleBodyFigure);
    };
  }
};

function moveToHome() {
  location = '../home/home.html';
};





