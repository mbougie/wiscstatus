function colorScale(percent,level1){
//alert(level1)
  if(level1 === 3000){
    if (percent >= 0 && percent < 0.25) {
      return '#feedde'
    }
    if (percent >= 0.25 && percent < 0.50) {
      return '#fdbe85'
    }
    if (percent >= 0.50 && percent < 0.75) {
      return '#fd8d3c'
    }
    if (percent >= 0.75) {
      return '#d94701'
    }
  }
  if(level1 === 4000){
    if (percent >= 0 && percent < 0.25) {
      return '#edf8e9'
    }
    if (percent >= 0.25 && percent < 0.50) {
      return '#bae4b3'
    }
    if (percent >= 0.50 && percent < 0.75) {
      return '#74c476'
    }
    if (percent >= 0.75) {
      return '#238b45'
    }
  }
  if(level1 === 6000){
    if (percent >= 0 && percent < 0.25) {
      return '#f2f0f7'
    }
    if (percent >= 0.25 && percent < 0.50) {
      return '#cbc9e2'
    }
    if (percent >= 0.50 && percent < 0.75) {
      return '#9e9ac8'
    }
    if (percent >= 0.75) {
      return '#6a51a3'
    }
  }
  if(level1 === 8000){
    if (percent >= 0 && percent < 0.25) {
      return '#fee5d9'
    }
    if (percent >= 0.25 && percent < 0.50) {
      return '#fcae91'
    }
    if (percent >= 0.50 && percent < 0.75) {
      return '#fb6a4a'
    }
    if (percent >= 0.75) {
      return '#cb181d'
    }
  }
}



function ColorMapScale(level1){
  if(level1 === 3000){
   var color = d3.scale.quantile() //designate quantile scale generator
    .range([
    '#feedde',
    '#fdbe85',
    '#fd8d3c',
    '#d94701',
    "#0A0A0A"
    ]);
    return color
  }

  if(level1 === 4000){
   var color = d3.scale.quantile() //designate quantile scale generator
    .range([
    "#edf8e9",
    "#bae4b3",
    "#74c476",
    "#238b45",
    "#0A0A0A"
    ]);
    return color
  }

  if(level1 === 6000){
   var color = d3.scale.quantile() //designate quantile scale generator
    .range([
    '#f2f0f7',
    '#cbc9e2',
    '#9e9ac8',
    '#6a51a3',
    "#0A0A0A"
    ]);
    return color
  }


if(level1 === 8000){
   var color = d3.scale.quantile() //designate quantile scale generator
    .range([
    '#fee5d9',
    '#fcae91',
    '#fb6a4a',
    '#cb181d',
    "#0A0A0A"
    ]);
    return color
  }
}


