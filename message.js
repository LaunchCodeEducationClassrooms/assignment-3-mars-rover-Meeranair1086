class Message {
   // Write code here!
   constructor(name,commands){
     this.name=name;
     if (!name) {
       throw Error("Message name required.");
    }
    this.commands=commands;
    
    
   }

}
/*
let msg = new Message("New message!");
console.log(msg);
*/
module.exports = Message;

