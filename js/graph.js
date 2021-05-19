var NormalCat = {};
var normalPoly = [];
var UtilCat = {};
var utilPoly = [];
var layout = {};
var plotdata = [];
var normalMomentEnv = {};
var normalMomPoly = [];
var utilMomentEnv = {};
var utilMomPoly = [];
var momEnvLayout = {};
var momentEnvData = [];

function doGraph() {
  NormalCat = {
  x: selectedAC.data.CG.normalCat.x,
  y: selectedAC.data.CG.normalCat.y,
  mode: 'lines',
  name: 'Normal'
};
normalPoly = [];
for (i=0;i<NormalCat.x.length;i++){
    var point = [];
    point.push(NormalCat.x[i]);
    point.push(NormalCat.y[i]);
    normalPoly.push(point);
}
UtilCat = {
  x: selectedAC.data.CG.utilCat.x,
  y: selectedAC.data.CG.utilCat.y,
  mode: 'lines',
  name: 'Utility',
  line: {
    dash: 'dash',
    width: 4
  }
};
utilPoly = [];
for (i=0;i<UtilCat.x.length;i++){
    var point = [];
    point.push(UtilCat.x[i]);
    point.push(UtilCat.y[i]);
    utilPoly.push(point);
}
layout = {
  title: selectedAC.id + ' W&B CG Limits',
  xaxis: {
    range: [Math.min(...selectedAC.data.CG.normalCat.x)-1, Math.max(...selectedAC.data.CG.normalCat.x)+1],
    autorange: false,
    fixedrange: true,
    automargin: true,
    title: {
        text: 'Airplane CG Location - Inches Aft Datum',
        standoff: 5
    }
  },
  yaxis: {
    range: [Math.min(...selectedAC.data.CG.normalCat.y), Math.max(...selectedAC.data.CG.normalCat.y)+100],
    autorange: false,
    fixedrange: true,
    title: {
        text: 'Loaded Airplane Weight (lbs)'
    }
  },
  legend: {"orientation": "h"}
};

plotdata = [NormalCat,UtilCat];

//Plotly.newPlot('plot', plotdata, layout,{scrollZoom: false,displayModeBar:false,responsive:true});

normalMomentEnv = {
    x: selectedAC.data.Moment.normalCat.x,
    y: NormalCat.y,
    mode: NormalCat.mode,
    name: NormalCat.name,    
};
utilMomentEnv = {    
    x: selectedAC.data.Moment.utilCat.x,
    y: UtilCat.y,
    mode: UtilCat.mode,
    name: UtilCat.name,
    line: UtilCat.line
};
normalMomPoly = [];
for (i=0;i<normalMomentEnv.x.length;i++){
    var point = [];
    point.push(normalMomentEnv.x[i]);
    point.push(normalMomentEnv.y[i]);
    normalMomPoly.push(point);
}
utilMomPoly = [];
for (i=0;i<utilMomentEnv.x.length;i++){
    var point = [];
    point.push(utilMomentEnv.x[i]);
    point.push(utilMomentEnv.y[i]);
    utilMomPoly.push(point);
}
momEnvLayout = {
  title: selectedAC.id + ' W&B CG Moment Envelope',
  xaxis: {
    range: [Math.min(...selectedAC.data.Moment.normalCat.x)-1, Math.max(...selectedAC.data.Moment.normalCat.x)+1],
    autorange: false,
    fixedrange: true,
    title: {
        text: 'Airplane Moment / 1000 (lb-in)',
        standoff: 5
    }
    
  },
  yaxis: {
    range: [Math.min(...selectedAC.data.Moment.normalCat.y), Math.max(...selectedAC.data.Moment.normalCat.y)+100],
    autorange: false,
    fixedrange: true,
    title: {
        text: 'Loaded Airplane Weight (lbs)'
    }
  },
  showlegend: true,
  legend: {"orientation": "h"} 
};

momentEnvData = [normalMomentEnv,utilMomentEnv];
//Plotly.newPlot('momentEnv', momentEnvData, momEnvLayout,{scrollZoom: false,displayModeBar:false,responsive:true});
}
function calcwb() {
  doGraph();
  var tocg = 0;
  var landcg = 0;
  var emptycg = 0;
  var totalMoment=0;
  var totalWeight=0;
  var toMoment = 0;
  var landMoment = 0;
  var toWeight = 0;
  var landWeight=0;
  var totalMomentenv = 0;
  var toMomentEnv = 0;
  var landMomentEnv = 0;
  
  
  var emptyMoment = document.getElementById('empty').value * document.getElementById('emoment').value;
  var emptyWeight = parseFloat(document.getElementById('empty').value) || 0;
  totalWeight += emptyWeight;
  totalMoment += emptyMoment;
  
  var pilMoment = document.getElementById('pilweight').value * document.getElementById('pilmoment').value;
  var pilWeight = parseFloat(document.getElementById('pilweight').value) || 0;
  totalWeight += pilWeight;
  totalMoment += pilMoment;
  
  var pasMoment = document.getElementById('pasweight').value * document.getElementById('pasmoment').value;
  var pasWeight = parseFloat(document.getElementById('pasweight').value) || 0;
  totalWeight += pasWeight;
  totalMoment += pasMoment;
  
  var rpasMoment = document.getElementById('rpasweight').value * document.getElementById('rpasmoment').value;
  var rpasWeight = parseFloat(document.getElementById('rpasweight').value) || 0;
  totalWeight += rpasWeight;
  totalMoment += rpasMoment;
  
  var bag1Moment = document.getElementById('bag1weight').value * document.getElementById('bag1moment').value;
  var bag1Weight = parseFloat(document.getElementById('bag1weight').value) || 0;
  totalWeight += bag1Weight;
  totalMoment += bag1Moment;
  
  var bag2Moment = document.getElementById('bag2weight').value * document.getElementById('bag2moment').value;
  var bag2Weight = parseFloat(document.getElementById('bag2weight').value) || 0;
  totalWeight += bag2Weight;
  totalMoment += bag2Moment;
  
  var TOFuelMoment = document.getElementById('tofuelweight').value * document.getElementById('fuelmoment').value;
  var TOFuelWeight = parseFloat(document.getElementById('tofuelweight').value) || 0;
  var landFuelMoment = document.getElementById('landfuelweight').value * document.getElementById('fuelmoment').value;
  var landFuelWeight = parseFloat(document.getElementById('landfuelweight').value) || 0;
  toWeight += totalWeight + TOFuelWeight;
  toMoment += totalMoment + TOFuelMoment;
  landWeight += totalWeight + landFuelWeight;
  landMoment += totalMoment + landFuelMoment;
  
  
  

  tocg = toMoment / toWeight;
  landcg = landMoment / landWeight;
  emptycg = totalMoment / totalWeight;

  var wbData = {
    x:[tocg,landcg,emptycg],
    y:[toWeight,landWeight,totalWeight],
    type:'scatter',
    text: ['Take-off', 'Landing','Zero Fuel'],
    name: 'CG'
  };
  plotdata = [NormalCat, UtilCat, wbData];
  Plotly.newPlot('plot', plotdata,layout,{scrollZoom: false,displayModeBar:false,responsive:true});
  
  var envData = {
    x:[toMoment/1000,landMoment/1000,totalMoment/1000],
    y: wbData.y,
    type: 'scatter',
    text: ['Take-off', 'Landing','Zero Fuel'],
    name: 'Moment'
  };
  momentEnvData=[normalMomentEnv, utilMomentEnv, envData];
  Plotly.newPlot('momentEnv', momentEnvData, momEnvLayout,{scrollZoom: false,displayModeBar:false,responsive:true});
  var statText = 'Outside of W&B Limits';
  if(inside([wbData.x[0],wbData.y[0]],normalPoly) &&
     inside([wbData.x[1],wbData.y[1]],normalPoly) &&
     inside([wbData.x[2],wbData.y[2]],normalPoly) &&
     inside([envData.x[0],envData.y[0]],normalMomPoly) &&
     inside([envData.x[1],envData.y[1]],normalMomPoly) &&
     inside([envData.x[2],envData.y[2]],normalMomPoly)) {
        statText =  'Good for Normal Category';
        if (inside([wbData.x[0],wbData.y[0]],utilPoly) &&
            inside([wbData.x[1],wbData.y[1]],utilPoly) &&
            inside([wbData.x[2],wbData.y[2]],utilPoly) &&
            inside([envData.x[0],envData.y[0]],utilMomPoly) &&
            inside([envData.x[1],envData.y[1]],utilMomPoly) &&
            inside([envData.x[2],envData.y[2]],utilMomPoly)) {
              statText = 'Good for Utility Category';
        }
  }
  document.getElementById('calcStatus').innerHTML = statText;
  
  document.getElementById('toWeight').innerHTML = toWeight + ' lbs.';
  document.getElementById('landWeight').innerHTML = landWeight + ' lbs.';
  document.getElementById('zfWeight').innerHTML = totalWeight + ' lbs.';
  
  document.getElementById('tocg').innerHTML =      tocg.toFixed(2);
  document.getElementById('landcg').innerHTML =  landcg.toFixed(2);
  document.getElementById('zfcg').innerHTML =   emptycg.toFixed(2);
  
  document.getElementById('toMoment').innerHTML =      (toMoment/1000).toFixed(2);
  document.getElementById('landMoment').innerHTML =  (landMoment/1000).toFixed(2);
  document.getElementById('zfMoment').innerHTML =   (totalMoment/1000).toFixed(2);
  
}
function calcFuelWeight(fuelGal,stage) {
  if(stage === 'to') {
    document.getElementById('tofuelweight').value = fuelGal.value * 6
  }
  else if (stage === 'land') {
    document.getElementById('landfuelweight').value = fuelGal.value * 6
  }
}
function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};
  
