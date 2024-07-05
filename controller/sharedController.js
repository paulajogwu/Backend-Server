const admin = require("firebase-admin");


exports.createSharedNote = async (req, res) => {
    const noteId = req.body.noteId;
    const userFrom = req.body.userFrom;
    const UserTo = req.body.UserTo;

    console.log("noteId------",noteId)
    if (
        noteId == '' ||
        noteId == null ||
        userFrom == '' ||
        userFrom == null ||
        UserTo == '' ||
        UserTo == null 
    ) {
      res.send({
        status: false,
        message: 'Fill out all required fields',
        data: null,
      })
    } else {
  
      try {
      

        const sharedNote = await admin.firestore().collection("Sharednote").doc().set({
        "noteId": noteId,
        "userFrom": userFrom,
        "UserTo": UserTo,
    })
   
     
      if (sharedNote) {
        return res.status(200).send({
          status: true,
          data: sharedNote,
          message: 'Shared Successfully',
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