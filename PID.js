var PID_SETPOINT = flow.get("PID_SETPOINT");  //
var PID_INTEGRAL = flow.get("PID_INTEGRAL");  //
var PID_OUTPUT   = flow.get("PID_OUTPUT");    //
var PID_MAX      = flow.get("PID_MAX");       //Max Import from Grid
var PID_MIN      = flow.get("PID_MIN");       //Max Export to Grid

var PROPORTIONAL_GAIN = 0.25;

var INTEGRAL_GAIN = 0.08;
var INTEGRAL_MAX = 5000;
var INTEGRAL_MIN = -5000;

var ERROR =  PID_SETPOINT - Number(msg.payload);

PID_INTEGRAL = PID_INTEGRAL + (ERROR*INTEGRAL_GAIN); 
if(PID_INTEGRAL > INTEGRAL_MAX){ PID_INTEGRAL = INTEGRAL_MAX;}
if(PID_INTEGRAL < INTEGRAL_MIN){ PID_INTEGRAL = INTEGRAL_MIN;}

PID_OUTPUT = (ERROR*PROPORTIONAL_GAIN)+PID_INTEGRAL;

if(PID_OUTPUT > PID_MAX){ PID_OUTPUT = PID_MAX;}
if(PID_OUTPUT < PID_MIN){ PID_OUTPUT = PID_MIN;}

flow.set("PID_OUTPUT", PID_OUTPUT);
flow.set("PID_INTEGRAL", PID_INTEGRAL);
msg.payload =Math.round(PID_OUTPUT);
node.status({fill:"blue",shape:"dot",
    text:"OUTPUT: "+msg.payload +
    " P:"+Math.round(ERROR*PROPORTIONAL_GAIN) +
    " I:"+Math.round(PID_INTEGRAL) +
    " MIN:"+PID_MIN +
    " MAX:"+PID_MAX});

return msg;
