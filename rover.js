class Rover {
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message){

    let response = [];
    if(message.commands){
      for(let cmd of message.commands){
        if(cmd.commandType === "STATUS_CHECK"){
          // Test 10
          response.push({
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
          response.push({completed: true});
        }
        else if(cmd.commandType === "MOVE"){
          if(this.mode === "NORMAL"){
            // test 13
            this.position = cmd.value;
            response.push({completed: true});
          }
          else if(this.mode === "LOW_POWER"){
            // test 12
            response.push({completed: false});
          }
   
        }       
      }
    }
    return {
      message: message.name,  
      results: response
    };
  }
}
module.exports = Rover;