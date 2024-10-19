const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ashikvincent:ashik@cluster0.4fl0hs4.mongodb.net/NirmalaSync?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
    console.log("DB Connected")
})
.catch((error)=>{
    console.log(error)
})