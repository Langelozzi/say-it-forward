var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userCity = userDoc.data().city;
                    var userCountry = userDoc.data().country;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        $('#nameInput').val(userName);
                    }
                    if (userEmail != null) {
                        $('#emailInput').val(userEmail);
                    }
                    if (userCity != null) {
                        $('#cityInput').val(userCity);
                    }
                    if (userCountry != null) {
                        $('#countryInput').val(userCountry);
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

function editUserInfo() {
    //Enable the form fields
    $('#personalInfoFields').prop('disabled', false);
}//event-listener that call the function editUserInfo after clicking on the button.

function saveUserInfo() {
    userName = $('#nameInput').val();
    userSchool = $('#emailInput').val();
    userCity = $('#cityInput').val();
    userCountry = $('#countryInput').val();

    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity,
        country: userCountry
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    $('#personalInfoFields').prop('disabled', true);
}

function setUp() {
    populateInfo();
}

$(document).ready(setUp);