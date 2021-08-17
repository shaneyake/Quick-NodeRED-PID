var PID_SETPOINT = flow.get("PID_SETPOINT")||0;
var PID_INTEGRAL = flow.get("PID_INTEGRAL")||0;
var PID_OUTPUT   = flow.get("PID_OUTPUT")||0;

var PID_MAX = 0;     //Max Import from Grid
var PID_MIN = -5000; //Max Export to Grid

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
node.status({fill:"blue",shape:"dot",text:"OUTPUT: "+msg.payload +" P:"+Math.round(ERROR*PROPORTIONAL_GAIN)+" I:"+Math.round(PID_INTEGRAL)});

return msg;
