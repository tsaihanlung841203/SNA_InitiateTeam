Loginfun = function () {
    //alert("sign in");
    document.getElementById('id01').style.display = 'block';
    document.getElementById('navPanel').style.display = 'none';

}
Logoutfun = function () {
    //alert("sign out");
    firebase.auth().signOut();
    document.getElementById('sign-in-status').textContent = '';
}

initApp = function () {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            // User is signed in.
            document.getElementById('logoutbutton').textContent = 'Sign out';
            document.getElementById('loginbutton').textContent = '';
            console.log("User is logined", user);
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            if(photoURL == null){
                photoURL = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
            }
            var userdata;
            var dbref = firebase.database().ref('user/' + uid + '/');
            await dbref.once('value', (data) => {
                userdata = data.val();
            })
            if (userdata == null) {
                firebase.database().ref('user/' + uid).push({
                    name: displayName
                });
            }
            user.getToken().then(function (accessToken) {
                document.getElementById('user-img').style.display = 'block';
                document.getElementById('user-img').src = photoURL;
                document.getElementById('sign-in-status').textContent = displayName;
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });
        } else {
            // User is signed out.
            document.getElementById('logoutbutton').textContent = '';
            document.getElementById('loginbutton').textContent = 'Login';
            // document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('user-img').style.display = 'none';
        }
    }, function (error) {
        console.log(error);
    });
};

window.addEventListener('load', function () {
    initApp()
});