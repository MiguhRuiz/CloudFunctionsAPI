const functions = require('firebase-functions');
const firebase = require('firebase-admin')
const config = require('./firebase-config.json')

firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: 'https://functions-api.firebaseio.com/'
})

exports.apartaments = functions.https.onRequest((req, res) => {
    if(req.method == 'GET') {
        const apartaments = firebase.database().ref('/apartaments')
        apartaments.on('value', (snapshot) => {
            res.json(snapshot.val())
        })
    } else if (req.method == 'POST') {
        const apartaments = firebase.database().ref('/apartaments')
        const apartament = req.body
        apartaments.push(apartament)
            .then(res.json(apartament))
            .catch(err => res.json(err))
    } 
})