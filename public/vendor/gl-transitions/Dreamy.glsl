// Author: mikolalysenko
// License: MIT
vec2 offset(float p,float x,float theta){float phase=p*p+p+theta;float shifty=0.03*p*cos(10.0*(p+x));return vec2(0,shifty);}
vec4 transition(vec2 p){return mix(getFromColor(p+offset(progress,p.x,0.0)),getToColor(p+offset(1.0-progress,p.x,3.14)),progress);}
