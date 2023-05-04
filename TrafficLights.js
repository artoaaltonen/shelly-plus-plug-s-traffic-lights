// https://github.com/artoaaltonen/shelly-plus-plug-s-traffic-lights

let greenStart = 2134; // 06:45
let greenEnd = 2136; // 09:00

let configGreen = {"leds":{"mode":"switch","colors":{"switch:0":{"on":{"rgb":[0,100,0],"brightness":25},"off":{"rgb":[0,100,0],"brightness":25}},"power":{"brightness":100}},"night_mode":{"enable":false,"brightness":0,"active_between":["09:00","07:00"]}},"controls":{"switch:0":{"in_mode":"momentary"}}};
let configRed = {"leds":{"mode":"switch","colors":{"switch:0":{"on":{"rgb":[100,0,0],"brightness":15},"off":{"rgb":[100,0,0],"brightness":15}},"power":{"brightness":100}},"night_mode":{"enable":false,"brightness":0,"active_between":["09:00","07:00"]}},"controls":{"switch:0":{"in_mode":"momentary"}}};

// No need to modify below...

let curTime = null;

function updateCurHour() {
  Shelly.call('Shelly.GetStatus', '', function (res) {
    if (res.sys.time === null) {
      return;
    }
    
    curTime = JSON.parse(res.sys.time.slice(0,2) + res.sys.time.slice(3,5));
    print("Current time is " + JSON.stringify(curTime));
    updateTrafficLights();
  });
}

function updateTrafficLights() {
  if (curTime >= greenStart && curTime < greenEnd) {
    Shelly.call("PLUGS_UI.SetConfig", {config: configGreen});
    
    return;
  }
  
  Shelly.call("PLUGS_UI.SetConfig", {config: configRed});
}

updateCurHour();
Timer.set(60000, true, updateCurHour);
