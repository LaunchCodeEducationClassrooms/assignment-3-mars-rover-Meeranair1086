class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
    }
     this.value = value;
   }
 
 }

 
 //console.log (commands.value);
 module.exports = Command;