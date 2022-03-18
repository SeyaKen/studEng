const addContainer = document.getElementById('header-inner');
// ユーザーがログインしているか確認
auth.onAuthStateChanged(userr => {
  articleId = localStorage.getItem('articleId');
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
    uid = userr.uid;
    user = userr;
    storagePersonalRef = firebase.storage().ref(userr.uid);
    db.collection('users').doc(userr.uid).get().then(snapshot=> {
      if(snapshot.data().ProfilePicture == '') {
        let imageTarget = document.getElementById('unregistered-picture');
        imageSrc = "https://firebasestorage.googleapis.com/v0/b/studeng.appspot.com/o/44884218_345707102882519_2446069589734326272_n.jpeg?alt=media&token=9c968cd9-872c-4250-8419-eb888f236b43";
        userName = snapshot.data().name;
        imageTarget.setAttribute('src', imageSrc);
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
const mainQuestion = document.getElementById('main-question');

// 質問をうつす関数
function dataCollect() {
  db.collection('questions').doc(articleId).get().then((val)=> {
    articleData(val);
  });
  db.collection('questions').doc(articleId).collection('answers').orderBy('date', 'desc').get().then((snapshot) => {
    snapshot.forEach(doc => {
      kaitouData(doc);
      // console.log(doc.data()['answerList']);
    })
  });
};

// 記事の内容をHTMLとして映す関数
function articleData(individualDoc) {
  // もし質問者とarticleのaskerが同じだったら
  let articleEditButton = document.createElement('button');
  let articleEditButtonP = document.createElement('p');
  let articleEditButtonI = document.createElement('i');
  if(uid == individualDoc.data().asker) {
    articleEditButtonI.className = 'fas fa-pen fa-lg fa-fw';
    articleEditButtonP.innerHTML = '編集';
    articleEditButton.appendChild(articleEditButtonP);
    articleEditButton.appendChild(articleEditButtonI);
    articleEditButton.setAttribute('onclick', 'moveToEdit()')
    mainQuestion.appendChild(articleEditButton);
  }
  
  input1.innerHTML = individualDoc.data().caption;
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

// 回答があれば、その内容をHTMLとして映す関数
const kaitouBody = document.getElementById('kaitou-lists-area');
function kaitouData(individualDoc) {
  let kaitouBodyItemTop = document.createElement('div');
  kaitouBodyItemTop.className = 'kaitou-lists-item-top';

  // kaitou-lists-item-top-left
  let kaitouBodyItemTopLeft = document.createElement('div');
  kaitouBodyItemTopLeft.className = 'kaitou-lists-item-top-left';
  kaitouBodyItemTopLeft.setAttribute('id', 'kaitou-lists-item-top-left');

  let kaitouBodyItemTopLeftImg = document.createElement('img');
  kaitouBodyItemTopLeftImg.setAttribute('src', individualDoc.data().answerImg);

  let kaitouBodyItemTopLeftP = document.createElement('p');
  kaitouBodyItemTopLeftP.innerHTML = individualDoc.data().answerName;
  kaitouBodyItemTopLeft.appendChild(kaitouBodyItemTopLeftImg);
  kaitouBodyItemTopLeft.appendChild(kaitouBodyItemTopLeftP);
  // kaitou-lists-item-top-left

  // kaitou-lists-item-top-right
  let kaitouBodyItemTopRight = document.createElement('div');
  kaitouBodyItemTopRight.className = 'kaitou-lists-item-top-right';

  let kaitouBodyItemTopRightP = document.createElement('p');
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
  kaitouBodyItemTopRightP.innerHTML = hiduke;
  kaitouBodyItemTopRight.appendChild(kaitouBodyItemTopRightP);
  // kaitou-lists-item-top-right

  let kaitouBodyItemContent = document.createElement('div');
  kaitouBodyItemContent.className = 'kaitou-lists-item-content';

  for(let i = 0; i < individualDoc.data()['answerList'].length; i++) {
    if(individualDoc.data()['answerList'][i].slice(0, 38) != 'https://firebasestorage.googleapis.com') {
      let kaitouBodyP = document.createElement('p');
      kaitouBodyP.innerHTML = individualDoc.data()['answerList'][i];
      kaitouBodyItemContent.appendChild(kaitouBodyP);
    } else {
      let kaitouBodyFigure = document.createElement('figure');
      let kaitouBodyImg = document.createElement('img');
      kaitouBodyImg.setAttribute('src', individualDoc.data()['answerList'][i]);
      kaitouBodyImg.setAttribute('width', '100%');
      kaitouBodyFigure.appendChild(kaitouBodyImg);
      kaitouBodyItemContent.appendChild(kaitouBodyFigure);
    };
  }
  kaitouBodyItemTop.appendChild(kaitouBodyItemTopLeft);
  kaitouBodyItemTop.appendChild(kaitouBodyItemTopRight);
  kaitouBody.appendChild(kaitouBodyItemTop);
  kaitouBody.appendChild(kaitouBodyItemContent);
};

// +ボタンの処理
// 監視ターゲットの取得
const target = document.getElementById('answer-container-inner1');
const target1 = document.getElementById('plus-buttton-container');

// keyが押し込まれた時に発火する関数
// 一番上の行の時だけbackspace押すと、サブタイトルになる関数
var even;
document.addEventListener('keydown', (event) => {
  even = event;
  // 一番下の方に来た時自動で少し
  // 要素の位置座標を取得
  if(event.keyCode == 13) {
    let child = target.lastElementChild;
    var clientRect = child.getBoundingClientRect();
    var A = document.documentElement;
    var Y = A.scrollHeight - A.clientHeight;
    if(clientRect.top > 200) {
      window.scroll({top: Y - 200, left: 0, behavior: 'smooth'});
    }
  }
});

document.addEventListener('keyup', (event) => {
  if(target.innerHTML == ''
  && event.code == 'Backspace') {
    let pTag = document.createElement('p');
    let brTag = document.createElement('br');
    pTag.appendChild(brTag);
    target.appendChild(pTag);
  }
});

// figureの監視
const observer = new MutationObserver(records => {
  try{
    if(records[0].addedNodes[0].nodeName == 'FIGURE'
    && records[0].addedNodes[0].innerHTML == '<br>') {
      kesitai = records[0].addedNodes[0].setAttribute('id', 'kesitai');
    }
  } catch(e) {
    console.log(e);
  }
});
  
  // 監視の開始
  observer.observe(target, {
    childList: true
  });

// buttonを使ってinputを押す処理
function inputClick() {
  document.getElementById('files').click();
}

// Firebaseに画像をアップロードする関数
function uploadData() {
  var randomStrings1 = Math.random().toString(32).substring(2);
  var randomStrings2 = Math.random().toString(32).substring(2);
  var randomStrings = randomStrings1 + randomStrings2;
  let file = document.getElementById('files').files[0];
  console.log(file);
  let thisRef = storagePersonalRef.child(randomStrings);
  thisRef.put(file).then(res=> {
    thisRef.getDownloadURL().then(url => {
        let pTag = document.createElement('p');
        let brTag = document.createElement('br');
        let buttonTag = document.createElement('button');
        let xTag = document.createElement('p');
        xTag.innerHTML = '×'; 
        buttonTag.setAttribute('value', randomStrings);
        buttonTag.setAttribute('onclick', 'deletePicture(this.value)');
        buttonTag.setAttribute('contenteditable', 'false');
        buttonTag.setAttribute('class', 'delete-picture-button');
        buttonTag.appendChild(xTag);
        pTag.appendChild(brTag);
        let figureParent = document.createElement('figure');
        figureParent.setAttribute('class', 'question-picture0');
        figureParent.setAttribute('id', randomStrings);
        figureParent.setAttribute('value', url);
        let childImg = document.createElement('img');
        childImg.setAttribute('src', url);
        childImg.setAttribute('width', '100%');
        childImg.setAttribute('contenteditable', 'false');
        childImg.setAttribute('draggabel', 'false');
        figureParent.appendChild(buttonTag);
        figureParent.appendChild(childImg);
        target.appendChild(figureParent);
        target.appendChild(pTag);
    }).catch(e => {
      console.log(e);
    });
  }).catch(e => {
    console.log('エラー' + e);
  });
}

function deletePicture(value) {
  console.log(value);
  document.getElementById(value).remove();
  storagePersonalRef.child(value).delete();
}

function focusDetect() {
  document.getElementById('placeholder').classList.remove("before-click");
  document.getElementById('placeholder').classList.add("after-click");
  document.getElementById('placeholder').innerHTML = '<br>';
  document.getElementById('placeholder').removeAttribute('onclick');
}

// データベースに情報を入れる関数
function answerInsert() {
  const answerList = [];
  let children = document.getElementById('answer-container-inner1').children;
  for(let i = 0; i < children.length; i++) {
    if(children[i].tagName == 'P') {
      answerList.push(children[i].innerHTML);
    } else if (children[i].tagName == 'FIGURE') {
      answerList.push(children[i].getAttribute('value'));
    };
  }
  var randomStrings1 = Math.random().toString(32).substring(2);
  var randomStrings2 = Math.random().toString(32).substring(2);
  var randomStrings0 = randomStrings1 + randomStrings2;
  var date = new Date();
  db.collection('questions').doc(articleId).collection('answers').doc(randomStrings0).set({
    date: date,
    answer: uid,
    answerList: answerList,
    answerImg: imageSrc,
    answerName: userName,
  }).then(() => {
    console.log('成功');
    document.location.reload();
  }).catch(err => {
    console.log(err.message);
    console.log('失敗');
  });
}

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

function moveToHome() {
  location = '../home/home.html';
};

function moveToProfile() {
  location = '../profile/profile.html';
}

function moveToEdit() {
  location = '../edit/edit.html';
}

function logout() {
  auth.signOut().then(() => {
    location = '../index/index.html';
  });
};

function moveToArticle(articleId) {
  localStorage.setItem('articleId', articleId)
  location = '../edit/edit.html';
}




