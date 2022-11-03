function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function chooseReceiver() {
    const userIds = [1, 2, 3, 4, 5];

    usersRef.get().then((querySnapshot) => {
        let allUserIds = [];
        querySnapshot.forEach((doc) => {
            allUserIds.push(doc.id);
        });

        const possibleReceiverIds = allUserIds.filter((userId) => { userId != user.uid });
        // change this with better algorithm that looks at how many compliments user received so far
        let receiverIndex = getRandomInt(allUserIds.length);

        return possibleReceiverIds[receiverIndex];
    })
}

function createNewChainDocument(userId, messageId) {
    /**************** 
    Create new compliment chain document
    ****************/
    const chainsRef = db.collection("chains");

    // get current date
    const currentDate = firebase.firestore.Timestamp.now();

    chainsRef.add({
        starterId: userId,
        messages: [messageId],
        createdAt: currentDate
    }).then((newChainRef) => {
        // add one to users number of chains started and compliments sent
        // db.collection("users").doc(userId).update({
        //     chainsStarted: FieldValue.increment(1)
        // });
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function createNewMessageDocument(senderId, receiverId, complimentId) {
    const messagesRef = db.collection("messages");

    // get current date
    const currentDate = firebase.firestore.Timestamp.now();

    return messagesRef.add({
        senderId: senderId,
        receiverId: receiverId,
        complimentId: complimentId,
        emojiId: null,
        sendAt: currentDate,
        openedAt: null
    })
}

function sendMessage(complimentId) {
    const usersRef = db.collection("users");

    // get current user from firebase auth
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // get random user id from firestore users collection
            chooseReceiver().then((receiverId) => {
                createNewMessageDocument(user.uid, receiverId, complimentId)
                    .then((newMessageRef) => {
                        createNewChainDocument(user.uid, newMessageRef.uid)
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })

        } else {
            console.log("no user");
        }
    });

}

function setUp() {
    $('#send-btn').click(sendMessage);
}

$(document).ready(setUp);