const express=require("express");
const request=require("request");
const mailchimp=require("@mailchimp/mailchimp_marketing")
const https=require("https")


const app=express();

app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (req, res)=>{
    res.sendFile(__dirname+ "/index.html")
});

mailchimp.setConfig({
    apiKey: "3bdb60fb8e76bf34b3d7aeaa6239f94c-us21",
    server: "us21"
    
})

app.post("/",(req, res)=>{
    
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;


    var data={
         firstname: req.body.fname,
         lastname: req.body.lname,
         email: req.body.email,

    }

    const subscribingUser={
        firstname: firstname,
        lastname: lastname,
        email:email
    }



    const listid=a104fb69e3;

    async function run() {
        const response=await mailchimp.lists.addListMember(listid,{
            email_address:subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME:subscribingUser.firstname,
                LNAME:subscribingUser.lastname,
            }
            

        })     
    }
       run();
       res.write("<h1>you have successfully sign in</h1>");
});


app.listen(process.env.PORT || 3000 ,()=>{
    console.log("server is running ")
});

// mailchimps api key
// 3bdb60fb8e76bf34b3d7aeaa6239f94c-us21

// list id
// a104fb69e3