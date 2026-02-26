const express=require("express")
const nodemailer=require("nodemailer")
const router=express.Router()

const st=require('../controller/student')
const usr= require("../controller/admin")
const tm= require("../controller/teammember")
const cs= require("../controller/course")
const nvc= require("../controller/invoice")

router.get("/getstdata",st.getstudentdata)
router.post('/insertstdata',st.insertstudentdata)
router.put("/updatestdata/:id",st.updatestudentdata)
router.delete("/deletestdata/:id",st.deletestudentdata )

router.get("/getteamdata",tm.getteamdata)
router.post('/insertteamdata',tm.insertteamdata)
router.put("/updateteamdata/:id",tm.updateteamdata)
router.delete("/deleteteamdata/:id",tm.deleteteamdata )

router.get("/getcoursedata",cs.getcoursedata)
router.post('/insertcoursetdata',cs.insertcoursedata)
router.put("/updatecoursedata/:id",cs.updatecoursedata)
router.delete("/deletecoursedata/:id",cs.deletecoursedata )

router.post("/searchuser",usr.searchuser)
router.post("/postuser",usr.postuser)
router.put("/updateuser/:id",usr.updateuser)
router.delete("/deleteuser/:id",usr.deleteuser)

router.get("/getinvoicedata",nvc.getinvoice)
router.post('/insertinvoicedata',nvc.insertinvoice)
router.put("/updateinvoicedata/:id",nvc.updateinvoice)
router.delete("/deleteinvoicedata/:id",nvc.deleteinvoice)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahputvishal1322@gmail.com",
    pass: "oxewbmofpigdzyaq",
  },
});

router.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const info = await transporter.sendMail({
      from: "rahputvishal1322@gmail.com",
      to,
      subject,
      text,
      html,
    });

    res.status(200).json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports=router;