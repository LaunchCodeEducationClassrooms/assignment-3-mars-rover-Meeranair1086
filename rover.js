class Rover {
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message){

    let res = [];
    if(message.commands){
      for(let cmd of message.commands){
        if(cmd.commandType === "STATUS_CHECK"){
          // Test 10
          res.push({
            completed: true,
            roverStatus: {
              mode: this.mode, 
              generatorWatts: this.generatorWatts, 
              position: this.position,
            }
          });
        }
        else if(cmd.commandType === "MODE_CHANGE"){
          // Test 11
          this.mode = cmd.value;
          res.push({completed: true});
        }
        else if(cmd.commandType === "MOVE"){
          if(this.mode === "NORMAL"){
            // test 13
            this.position = cmd.value;
            res.push({completed: true});
          }
          else if(this.mode === "LOW_POWER"){
            // test 12
            res.push({completed: false});
          }
   
        }       
      }
    }
    return {
      message: message.name,  
      results: res
    };
  }
}
module.exports = Rover;