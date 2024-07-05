const admin = require("firebase-admin");


exports.createNote = async (req, res) => {
  const title = req.body.title
  const note = req.body.note
  const email = req.body.email.toLowerCase()

  console.log("email------", email)
  if (
    title == '' ||
    title == null ||
    note == '' ||
    note == null ||
    email == '' ||
    email == null
  ) {
    res.send({
      status: false,
      message: 'Fill out all required fields',
      data: null,
    })
  } else {

    try {


      const saveNote = await admin.firestore().collection("note").doc().set({
        "Note": title,
        "title": note,
        "userEmail": email,
      })


      if (saveNote) {
        return res.status(200).send({
          status: true,
          data: saveNote,
          message: 'Created Successfully',
        })


      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Error : ${err}`,
        user: null,
      })
    }
  }

}
exports.getNote = async (req, res) => {
  let id = req.params.id
  try {
    const userNote = db.collection("note").doc(id);
    const response = await userNote.get();
    return res.status(200).send({
      status: true,
      data: response,
      message: 'Successful',
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `Error : ${err}`,
      user: null,
    })
  }
}

exports.updateNote = async (req, res) => {
  const title = req.body.title
  const note = req.body.note
  const id = req.body.id

  if (
    title == '' ||
    title == null ||
    note == '' ||
    note == null ||
    id == '' ||
    id == null
  ) {
    res.send({
      status: false,
      message: 'Fill out all required fields',
      data: null,
    })
  } else {

    try {
      const userNote = await db.collection("note").doc(id)
        .update({
          "Note": title,
          "title": note,
        });
      return res.status(200).send({
        status: true,
        data: userNote,
        message: 'Edited Successfully',
      })
    } catch (err) {
      res.status(500).json({
        status: false,
        message: `Error : ${err}`,
        user: null,
      })
    }
  }


}


exports.deleteNote = async (req, res) => {
  let id = req.params.id
  try {
    const userNote = db.collection("note").doc(id);
    const response = await userNote.delete();
    return res.status(200).send({
      status: true,
      message: 'Deleted Successfully',
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `Error : ${err}`,
      user: null,
    })
  }
}

exports.getAllUserNote = async (req, res) => {
  const email = req.body.email.toLowerCase()
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
    const get_Noted = await admin.firestore()
      .collection('note')
      .where('Email', '==', email)
      .get()
      .then((user) => user.docs[0].data())
      .catch(() => null)

    if (get_Noted) {
      admin.firestore()
        .collection('Sharednote')
        .where('UserTo', '==', email)
        .get()
        .then(async (response) => {
          // remember to check verification
          let userInfo = response.docs.data()

          if (userInfo) {

            const get_Shared = await admin.firestore()
              .collection('note')
              .where('Email', '==', userInfo.Email)
              .get()
              .then((user) => user.docs[0].data())
              .catch(() => null)

            if (get_Shared) {
              let NoteList = { get_Shared, get_Noted }
              return res.status(200).send({
                status: true,
                data: NoteList,
                message: 'Successful',
              })

            }


          }

          else {
            res.status(500).json({
              status: false,
              message: 'Password Incorrect',
              data: null,
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