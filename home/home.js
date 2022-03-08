const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
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
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        uid = userr.uid;
        user = userr;
        let imageSrc = document.getElementById('unregistered-picture');
        imageSrc.setAttribute('src', '../images/user.jpg');
      } else {
        uid = userr.uid;
        user = userr;
        url = snapshot.data().ProfilePicture;
        let imageSrc = document.getElementById('unregistered-picture');
        // srcという属性をここで付加している。
        imageSrc.setAttribute('src', url);
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

// 質問一覧をうつす関数
function dataCollect() {
  db.collection('questions').get().then((val)=> {
    console.log(val.docs[0].data());
    val.docs.map((doc) => {
      console.log(doc.id);
      renderData(doc);
    });
  });
};

function renderData(individualDoc) {
  let questionItemsDiv = document.createElement('div');
  questionItemsDiv.className = 'question-items';

  let questionItemsContent = document.createElement('div');
  questionItemsContent.className = 'question-items-content';

  let questionTagsDiv = document.createElement('div');
  questionTagsDiv.className = 'question-tags';

  let questionContentH2 = document.createElement('h2');
  questionContentH2.innerHTML = individualDoc.data().caption;

  let questionTagsP1 = document.createElement('p');
  let questionTagsP2 = document.createElement('p');
  questionTagsP1.innerHTML = individualDoc.data().subCaption;
  let questionItemsBottomDiv = document.createElement('div');
  questionItemsBottomDiv.className = 'question-items-bottom';
  let questionItemsBottomImg = document.createElement('img');
  questionItemsBottomImg.setAttribute('src', individualDoc.data().askerImg);
  
  let questionItemsBottomP = document.createElement('p');
  questionItemsBottomP.innerHTML = individualDoc.data().askerName;

  questionTagsDiv.appendChild(questionTagsP1);
  questionItemsBottomDiv.appendChild(questionItemsBottomImg);
  questionItemsBottomDiv.appendChild(questionItemsBottomP);
  questionItemsContent.appendChild(questionContentH2);
  questionItemsContent.appendChild(questionTagsDiv);
  questionItemsContent.appendChild(questionItemsBottomDiv);
  questionItemsDiv.appendChild(questionItemsContent);
  const divAdd = document.getElementById('questions');
  divAdd.appendChild(questionItemsDiv);
};



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