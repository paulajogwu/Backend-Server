const admin = require("firebase-admin");
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    const Firstname = req.body.Firstname
    const Lastname = req.body.Lastname
    const email = req.body.email.toLowerCase()
    const passwordd = req.body.password

    console.log("email------",email)
    if (
        Firstname == '' ||
        Firstname == null ||
        Lastname == '' ||
        Lastname == null ||
      email == '' ||
      email == null ||
      passwordd == '' ||
      passwordd == null
    ) {
      res.send({
        status: false,
        message: 'Fill out all required fields',
        data: null,
      })
    } else {
  
      // check user email
      const check_email = await admin.firestore()
        .collection('user')
        .where('Email', '==', email)
        .get()
        .then((user) =>   user.docs[0].data())
        .catch(() => null)
   
        console.log("hello", check_email)
      // if email exist
      if (check_email) {
        // If user exists with same email
        res.send({
          status: false,
          message: 'A user exist with same email',
          user: null,
        })
      }
   
     else {
        try {
      

            const save = await admin.firestore().collection("user").doc().set({
            "FirstName": Firstname,
            "LastName": Lastname,
            "Email": email,
            "Password": bcrypt.hashSync(passwordd, 10),
        })
       
          //let token = jwt.sign({emails:email,id:save._id},`${process.env.SECRET_KEY}`,{expiresIn:'1h'})
          
          if (save) {
            return res.status(200).send({
              status: true,
              user: save,
              //token:token,
              message: 'Registration Successful',
            })
  
  
          }
        } catch (err) {
          res.status(500).json({
            status: false,
            message: `Error saving user ${err}`,
            user: null,
          })
        }
      }
    }

}


exports.getUserByEmail = async (req, res) => {
    const email = req.body.email.toLowerCase()

    console.log("email------",email)
    if (
      email == '' ||
      email == null 
    ) {
      res.send({
        status: false,
        message: 'Fill out all required fields',
        data: null,
      })
    } else {
  
     admin.firestore()
        .collection('user')
        .where('Email', '==', email)
        .get()
        .then((user) => {
          let userInfo = user.docs[0].data()

          if (!userInfo) {
            res.status(500).json({
              status: false,
              message: 'user Does not Exist',
              data: null,
            })

          }

          else {
              res.status(200).json({
                  status: true,
                  data: userInfo,
                  message: 'Successful',
                })
          }
        }
        )

    }

}

exports.userLogin = async (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password

  console.log("email------",email)
  if (
    email == '' ||
    email == null ||
    password == '' ||
    password == null
  ) {
    res.send({
      status: false,
      message: 'Fill out all required fields',
      data: null,
    })
  } else {

    // check user email
    const check_email = await admin.firestore()
      .collection('user')
      .where('Email', '==', email)
      .get()
      .then((user) =>  user.docs[0].data())
      .catch(() => null)
 
      console.log("hello", check_email)
    // if email exist
    if (check_email) {
      admin.firestore()
      .collection('user')
      .where('Email', '==', email)
      .get()
      .then(async (user) => {
          // remember to check verification
          let userInfo = user.docs[0].data()
          let hash = userInfo.Password


          if (!bcrypt.compareSync(password, hash)) {
            res.status(500).json({
              status: false,
              message: 'Password Incorrect',
              data: null,
            })

          }

          else {
              res.status(200).json({
                  status: true,
                  data: userInfo,
                  message: 'Login Successful',
                })
          }
        }
        )
    }
 
   else {
      res.send({
          status: false,
          message: 'A user exist with same email',
          user: null,
        })
      }
    
  }

}