const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  dataCollect();
  if(userr && auth.currentUser.emailVerified) {
    let parentDiv = document.createElement('div');
    parentDiv.className = 'header-right-logined';

    let button0 = document.createElement('button');
    button0.className = 'question-screen';
    button0.textContent = '質問する';
    button0.setAttribute('onclick', 'moveToQuestion()');

    let button1 = document.createElement('button');
    let imageProfile = document.createElement('img');
    button1.className = 'to-profile-button';
    button1.setAttribute('onclick', 'toggleOptions()');
    imageProfile.className = 'fas fa-user unregistered-picture';
    imageProfile.setAttribute('id', 'unregistered-picture');
    button1.appendChild(imageProfile);

    // ProfileOptions
    let profileOptions = document.createElement('div');
    profileOptions.className = 'toggle-options-vanish';
    profileOptions.setAttribute('id', 'profile-options');

    let profileOptionsProfile = document.createElement('a');
    profileOptionsProfile.setAttribute('onclick', 'moveToProfile()');
    let profileOptionsProfileIcon = document.createElement('i');
    profileOptionsProfileIcon.className = 'fa fa-user-circle';
    let profileOptionsProfileDiv1 = document.createElement('div');
    let profileOptionsProfileDiv1P = document.createElement('p');
    profileOptionsProfileDiv1P.innerHTML = 'プロフィール';
    profileOptionsProfileDiv1.className = 'profile-options-profile-div1'
    profileOptionsProfileDiv1.appendChild(profileOptionsProfileIcon);
    profileOptionsProfileDiv1.appendChild(profileOptionsProfileDiv1P);
    profileOptionsProfile.appendChild(profileOptionsProfileDiv1);

    let profileOptinsBottomBorder = document.createElement('hr');

    let profileOptionsProfileDiv2 = document.createElement('div');
    let profileOptionsLogout = document.createElement('a');
    profileOptionsLogout.setAttribute('onclick', 'logout()');
    profileOptionsProfileDiv2.innerHTML = 'ログアウト';
    profileOptionsProfileDiv2.className = 'profile-options-profile-div2'
    profileOptionsLogout.appendChild(profileOptionsProfileDiv2);
    profileOptions.appendChild(profileOptionsProfile);
    profileOptions.appendChild(profileOptinsBottomBorder);
    profileOptions.appendChild(profileOptionsLogout);

    parentDiv.appendChild(button0);
    parentDiv.appendChild(button1);
    parentDiv.appendChild(profileOptions);
    addContainer.appendChild(parentDiv);
    // ProfileOptions

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
  db.collection('questions').orderBy('date', 'desc').limit(10).get().then((val)=> {
    val.docs.map((doc) => {
      renderData(doc);
    });
  });
};

function renderData(individualDoc) {
  let questionItemsDiv = document.createElement('div');
  questionItemsDiv.className = 'question-items';


  // questionLeft
  let questionItemsLeft = document.createElement('div');
  questionItemsLeft.className = 'question-items-left';

  let questionItemsLeftButton = document.createElement('button');

  let questionItemsLeftI = document.createElement('i');
  questionItemsLeftI.className = 'far fa-heart fa-lg fa-fw';
  questionItemsLeftButton.appendChild(questionItemsLeftI);

  let questionItemsLeftP = document.createElement('p');
  // 後で変更
  questionItemsLeftP.setAttribute('id', individualDoc.id + 'P');
  questionItemsLeftP.innerHTML = individualDoc.data().like.toString();

  questionItemsLeft.appendChild(questionItemsLeftButton);
  questionItemsLeftButton.appendChild(questionItemsLeftP);
  // questionLeft

  // questionRight
  // questionitemsTop
  let questionItemsContent = document.createElement('div');
  questionItemsContent.className = 'question-items-content';

  let questionItemsTop = document.createElement('div');
  questionItemsTop.className = 'question-items-top';

  let questionContentH2 = document.createElement('h2');
  questionContentH2.setAttribute('id', individualDoc.id);
  questionContentH2.setAttribute("onclick", "moveToArticle(this.id)");
  questionContentH2.innerHTML = individualDoc.data().caption;

  questionItemsTop.appendChild(questionContentH2);

  let questionItemsTopRight = document.createElement('div');
  questionItemsTopRight.className = 'question-items-top-right';

  let questionItemsTopRightI = document.createElement('i');
  questionItemsTopRightI.className = 'far fa-clock fa-lg fa-fw';

  let questionItemsTopRightP = document.createElement('p');
  let tuki;
  switch (individualDoc.data().date.toDate().toString().slice(4, 7)) {
    case 'Jan':
      tuki = '1';
    case 'Feb':
        tuki = '2';
    case 'Mar':
        tuki = '3';
    case 'Apr':
        tuki = '4';
    case 'May':
        tuki = '5';
    case 'Jun':
        tuki = '6';
    case 'Jul':
        tuki = '7';
    case 'Aug':
      tuki = '8';
    case 'Sep':
      tuki = '9';
    case 'Oct':
      tuki = '10';
    case 'Nov':
      tuki = '11';
    case 'Dec':
      tuki = '12';
}
  console.log(individualDoc.data().date.toDate().toString().slice(4, 7));
  console.log(individualDoc.data().date.toDate().toString().slice(7, 10));;
  console.log(individualDoc.data().date.toDate().toString().slice(10, 15) + '年' + tuki + '/' + individualDoc.data().date.toDate().toString().slice(8, 10) + individualDoc.data().date.toDate().toString().slice(15, 21));
  let hiduke = individualDoc.data().date.toDate().toString().slice(10, 15) + '年' + tuki + '/' + individualDoc.data().date.toDate().toString().slice(8, 10) + individualDoc.data().date.toDate().toString().slice(15, 21);
  questionItemsTopRightP.innerHTML = hiduke;

  questionItemsTopRight.appendChild(questionItemsTopRightI);
  questionItemsTopRight.appendChild(questionItemsTopRightP);
  questionItemsTop.appendChild(questionItemsTopRight);
  // questionitemsTop

  let questionItemsBottomDiv = document.createElement('div');
  questionItemsBottomDiv.className = 'question-items-bottom';
  let questionItemsBottomImg = document.createElement('img');
  questionItemsBottomImg.setAttribute('src', individualDoc.data().askerImg);
  
  let questionItemsBottomP = document.createElement('p');
  questionItemsBottomP.innerHTML = individualDoc.data().askerName;

  questionItemsBottomDiv.appendChild(questionItemsBottomImg);
  questionItemsBottomDiv.appendChild(questionItemsBottomP);
  questionItemsContent.appendChild(questionItemsTop);
  questionItemsContent.appendChild(questionItemsBottomDiv);
  questionItemsDiv.appendChild(questionItemsLeft);
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

// ここからがclickDetectの関数
function toggleOptions() {
  let toggleOptionsTarget = document.getElementById('profile-options');
  if(toggleOptionsTarget.className == 'profile-options') {
    toggleOptionsTarget.classList.remove('profile-options');
    toggleOptionsTarget.className = 'toggle-options-vanish';
  } else {
    toggleOptionsTarget.classList.remove('profile-options-vanish');
    toggleOptionsTarget.className = 'profile-options';
  };
}

// クリックされた時、プロフィールのフォーカス？を外す関数
document.addEventListener('click', (event) => {
  if(event.srcElement.id != 'unregistered-picture') {
    onKansi();
  };
});
function onKansi() {
  let toggleOptionsTarget = document.getElementById('profile-options');
  if(toggleOptionsTarget.className == 'profile-options') {
    toggleOptionsTarget.classList.remove('profile-options');
    toggleOptionsTarget.className = 'toggle-options-vanish';
  }
};
// ここまでがclickDetectの関数

function moveToArticle(articleId) {
  localStorage.setItem('articleId', articleId)
  location = '../article/article.html';
}

function moveToProfile() {
  location = '../profile/profile.html';
};

function moveToLogin() {
  location = '../login/login.html';
};

function moveToRegister() {
  location = '../register/register.html';
};