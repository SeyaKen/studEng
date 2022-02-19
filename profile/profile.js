let storageRef = firebase.storage().ref('Images');

// Firebaseから画像をダウンロードする関数
// storageRef.child('Web 1920 – 1.png').delete.then~
// で画像を消すことができる。
storageRef.child('Web 1920 – 1.png').getDownloadURL().then(url => {
  console.log(url);
}).catch(e => {
  console.log(e);
});

// Firebaseに画像をアップロードする関数
function uploadData() {
  let file = document.getElementById('files').files[0];
  console.log(file);

  let thisRef = storageRef.child(file.name);
   
  thisRef.put(file).then(res=> {
    console.log('Uploaded');
    alert('Upload Success');
  }).catch(e => {
    console.log('エラー' + e);
  });

}