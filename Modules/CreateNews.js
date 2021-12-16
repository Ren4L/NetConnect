const express = require('express');

const bodyParser = require('body-parser');
const multer = require('multer');
const { route } = require('./Registration');
const router = express.Router();
const firebase = require('./firebase.js');
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

const FirebaseStorage = require('multer-firebase-storage');
const Multer = multer({storage: FirebaseStorage({
  bucketName: 'gs://netconnectv2-9fd5b.appspot.com/files',
  credentials: {
    clientEmail: 'firebase-adminsdk-hw7qk@netconnectv2-9fd5b.iam.gserviceaccount.com',
    privateKey: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCIGt4bQ8ofYJU\nQJYtgX5AccUdvS+589WdR0a4I8Wke7Soomh7sZoXWl6d7A27acfbcpCDOS4/JgqO\nLA/9WplzaF0lLypd9x1opQNL3uhDZwY6kGTYjy3Emq8XRfMkWZOl5nyciIWX6IJ3\ngOfgr0kYgS3S0VQVRFH9T9Elh2fsTawbDAYpKwYkt4qDLjxctU60e4tBLERBH88z\njurswdDz+0iLqBU5w30q5COZTNW9puEewJgG1X5VNQzj59NHajENCHBL+cniNOJ7\nA0f+LySoAHz4gkpZfcyC84j4kVmYnHogM7msWHsj27uKbMw3Qf9H0cAIki5D3af3\nFaWipu4BAgMBAAECggEAPJjVI1rby/ZdvAILPvo4pKylhYp8Pu4b5MQOkcVs2Rra\nendz6QS4Bokplt9MLA/pmJlq/eNYCdNMoTOk7B+fXfSaetR9w6YzUmqMHF9hHkUn\nHxnauPT8wu3MMRYfP14M5lEL3esJ1LD6JOaiuzLMPO96B+BbAGZ6t3l2XmIlsQ/E\nlPc1SyPKI8Hz8mR0/dO6jRGqd/vghFbBtWdHSZHAbRV+937b5eQcLfjaPmiL+1aS\npQOBnpVHqwUqETGGjGYMGsC+ZiCPPuc2IjX+b5evQVS2a0ySynATuAFPUev1vcDa\n1JLY8+fo/XRmOcth6wbi521LQ+g/FrlZb3ghaxb0HwKBgQDpBl5anmGjmL4ZswLv\nOzB/HSVyFS4dgCjuZ7O3HqyB938odkFU0b/F8quU65nU7tLC3pviIOiiYx9Q0Osj\nfXC+2kEi77amMHw1GWHW6onIAwVHhA9mol7Woa7ZdNa3+bDZq7Y4RvwaVIvJJR7a\nh3/GoQ2biN23pBQnRwpPCkhdKwKBgQDVRD7rkHq4U/L8vmtqvCLK0D1ogdOV+sF0\n0caCLJyR19B2CmdqiKmsEZ8y2woGby3XimEbQiWErWFZD5g8XPQT4OP07wFX/vNV\nwtX4+zFMfTAevGv0rXSqSIs9hIbCgrAt3hdvzgClvlUgEyGvwk52tzgi6DaecXsT\nuGCrwTdDgwKBgQCEMOKx0YtePTYKaizN/evjEGu/rhg9EAkoRZgD19jQ2dA+6ebh\n8SMzbhi8IHNiAiF5/sK7oyOVi1mmhP3/YhfljPbKlOYunO65SK7iNqb22g/SpC4A\ncTgP1iTUo51zPKiAsxJqForJfRDXiMFaAugPjCmmBByTIvdz2K8Wa6TlhQKBgH/K\nQwGYM1DcTM+Rsn/kd9ybZxCGKqjF9sHvKUm7PZ5OeUUh+tHlTfYjIQeyJJGycP+k\nlYdl3WFhGuHo7EnPURnQOgf8Zwu5Y0nSU7C7o9C3euwP74hPn4ahrX2ROca31KXH\nXLfL8qteH1f23sqYXbfZFbQk/QV37k3kv1hrkJfNAoGBALcbyY7vKPVGadyWyKf6\nn8TFjIXU6znEOXuCQCfi6X4DuZbwatWZGfyaNeEyteWITlEH10w2cjwDw4P6r204\np9VB7TGpaPK5T+IWmTxnjxXT/bOKakr2Vn5BtHbgg7Ex/I8ap6uECeKEVIiB21/g\nbMWi6HY4mNBDK707t3feWsVf',
    projectId: 'netconnectv2-9fd5b'
  },
  directoryPath:'files'
}, firebase)})

router.use(Multer.any());
router.use(bodyParser.urlencoded({extended: false}));
router.get('/',async(req, res)=>{
  let FullList;
  let avatar = '', avatar2 = '';
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
  let Acc;
  FullList.forEach(element => {
    if(element.login == req.session.userName){
      Acc = element;
    }
  });
    if(req.session.userName == undefined){
        avatar = '<img src="/public/icon/Enter.svg" class="Avatar">';
        avatar2 = '<img src="/public/icon/Enter.svg" class="Avatar2">';
      }
      else{
        if(Acc.avatar == undefined){
          avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
          avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
        }
        else{
          avatar = `<img src="${Acc.avatar}" class="Avatar">`;
          avatar2 = `<img src="${Acc.avatar}" class="Avatar2">`;
        }
      }
      if(req.session.moder){
        res.render('CreateNews',{avatar:avatar, avatar2:avatar2})
      }
      else{
        res.render('Authorization',{avatar:avatar, avatar2:avatar2})
      }
    })
    .post('/', async(req, res)=>{
      let NewsList;
      await get(child(refdb, `news`)).then((snapshot) => {NewsList = snapshot.val(); }).catch((error) => {console.error(error);});
        let arr = new Array();
        for(let i = 1; i<=3; i++){
            if(req.files[i] != undefined){
                arr.push(`https://firebasestorage.googleapis.com/v0/b/netconnectv2-9fd5b.appspot.com/o/${req.files[i].fileRef.id}?alt=media&token=fbb7140b-2015-4303-b628-6279c01065f8`);
            }
        }
        let News = {
            date:Date.now(),
            author:req.session.userName,
            title:req.body.title,
            content:req.body.content,
            NewsPhoto:`https://firebasestorage.googleapis.com/v0/b/netconnectv2-9fd5b.appspot.com/o/${req.files[0].fileRef.id}?alt=media&token=fbb7140b-2015-4303-b628-6279c01065f8`,
            dopPhoto:arr,
        }
        if(NewsList == undefined) NewsList = [];
        NewsList.push(News);
        await set(ref(db, `news`), NewsList);
        res.redirect('News');
    });

module.exports = router;