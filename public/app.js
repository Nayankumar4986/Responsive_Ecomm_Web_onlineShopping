// const form = document.getElementById('contactForm');
// 

// const firebaseConfig = {
//     apiKey: "AIzaSyCqrgPswgnKxurUDG5uddVFTU6WNlbBwmo",
//     authDomain: "contactform-7923f.firebaseapp.com",
//     databaseURL: "https://contactform-7923f-default-rtdb.firebaseio.com",
//     projectId: "contactform-7923f",
//     storageBucket: "contactform-7923f.appspot.com",
//     messagingSenderId: "289789965569",
//     appId: "1:289789965569:web:1604542d0314517eadd700",
//     measurementId: "G-ZW0DG5QBFJ"
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
 
  
//   const database = firebase.database()

//   const ref = database.ref("messages")
const form = document.getElementById('contactForm');
const alert = document.querySelector(".alert");

form.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;


    
    // const firebaseConfig = {
    //     apiKey: "AIzaSyBv4dw3DL3ZfME_VWx6n5Qdgyx4uOr9VHY",
    //     authDomain: "contactmemyportfolio.firebaseapp.com",
    //     databaseURL: "https://contactmemyportfolio-default-rtdb.firebaseio.com",
    //     projectId: "contactmemyportfolio",
    //     storageBucket: "contactmemyportfolio.appspot.com",
    //     messagingSenderId: "133763885149",
    //     appId: "1:133763885149:web:7d18403c99a0337fc285b4",
    //     measurementId: "G-6VZLB8CMLP"
    //   };
      
    //   // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);


    const firebaseConfig = {
        apiKey: "AIzaSyB6UKfuyRAXMQ5bv5WugY7tzLjy6Wce3sw",
        authDomain: "myecomwebcontactmeform.firebaseapp.com",
        databaseURL: "https://myecomwebcontactmeform-default-rtdb.firebaseio.com",
        projectId: "myecomwebcontactmeform",
        storageBucket: "myecomwebcontactmeform.appspot.com",
        messagingSenderId: "955740449280",
        appId: "1:955740449280:web:4852005efba59d0c2d06e5",
        measurementId: "G-JY5PEF9NPX"
      };
    
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      const database = firebase.database()

      const ref = database.ref("messages")

      ref.push({
        name:name,
        email:email,
        subject:subject,
        message:message
      })
    alert.style.display="block"

    setTimeout(()=>{
        alert.style.display="none"
    },2000)
    // console.log(name,email,phone,message,emailsub);
    form.reset()

})