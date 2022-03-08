const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
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
  let parentDiv = document.createElement('div');
  parentDiv.className = 'question-items';
  // data-idという属性をここで付加している。
  parentDiv.setAttribute('data-id', individualDoc.id);

  // todo div
  let questionsDiv = document.createElement('div');
  questionsDiv.className = 'question-items';
  questionsDiv.textContent = individualDoc.data().caption;
  const divAdd = document.getElementById('questions');
  // foo.appendChild()はfooの一番最後に()内の要素を追加する。
  parentDiv.appendChild(questionsDiv);
  divAdd.appendChild(parentDiv);
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