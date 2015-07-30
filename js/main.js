/////Establish global variables

//set screen dimensions
//screen_width = $(window).width() - 10
screen_width = 1024

//set width of #center div
$(center).width(screen_width)

//set map width
var mapWidth = Math.round(screen_width * .41);
var mapHeight = 500; //map frame dimensions

//set chart width
var chartWidth = Math.round(screen_width * .35);
var chartHeight = 500; //chart frame dimensions


/////get most current date submitted to lcfr_submitted
$.ajax({
  type : "GET",
  url : "php/getDate.php",
  success : function(data) {
    //console.log(data)
    // $orders.append('<li> ' + data + ' </li>')
    $("<span id = 'last_updated'>" + "Last updated: " + data + '</span>').appendTo('.navtitle');
  } 
});


/////get data from postgres db and store data into variables
$.ajax({
      dataType : "json",
      type : "GET",
      url : "php/status_counts.php",
      success: function(data) {
        //console.log(data.features)
        data=data.features
        //console.log("data",data)
       //console.log("data[0]",data[0])
        level1Array = []
        level4Array = []
        percentageArray = [] 
        countynameArray = []
        fullArray = []
        list = []
        max_n = [] 
        
        for (var i in data){
          level1Array.push(Number(data[i].properties.level1));
          level4Array.push(data[i].properties.css_id);
          fullArray.push(data[i].properties.lc_class_mod);
          countynameArray.push(data[i].properties.county_underscore);
          percentageArray.push(Number(data[i].properties.percentage));
          max_n = Math.max(data[i].properties.percentage , max_n); 
        }
        transfer_data = data
        // console.log("level1Array",level1Array)
        // console.log("level4Array",level4Array)
        // console.log("percentageArray",percentageArray)
      },
      error: function(data){ 
        console.log("not connecting to geoserver"); 
      }   
});



/////create tooltip object
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
               currentcounty = d.properties.county_underscore
               tipValue = getTooltipValue(d)
               return tipValue
            })

/////create map div to wisconsin 
var svg = d3.select("#center")
            .append("svg")
            .attr("width", mapWidth)
            .attr("height", mapHeight)
            .attr("class", "map")
    
var projection = d3.geo.mercator()
                   // where to center the map in degrees
                   .center([-85.90, 44.85 ])
                   // zoomlevel
                   .scale(3900)
                   // map-rotation
                   .rotate([0,0]);

/////defines "path" as return of geographic features
var path = d3.geo.path()
             .projection(projection);

/////shorten the svg.append command
var g = svg.append("g")
 

/////choropleth map(add map and color it)          
d3.json("data/counties.topojson", function(error, topology) {
 g.selectAll("path")
  .data(topojson.object(topology, topology.objects.collection).geometries)
  .enter()
  .append("g")
  .attr("class", "provinces")
  .append("path")
  .attr("id", function(d) { return d.properties.county_underscore})
  .attr("d", path)
  .call(tip)
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)

  .style("fill", function(d) {return $('.last, #Aquatic_Bed, #Buck_honey_upland, #Shrubland_other, .provinces').click(function () {
                              currentid = $(this).attr('id');
                              // console.log("current id",currentid)
                              countyname = d.properties.county_underscore;
                              // console.log("countyname",countyname)
                              color_percent = getCurrentLC(currentid,countyname) 
                              // console.log("color_percent",color_percent)
                              level1_current =  getLevel1(currentid,countyname)
                              if(currentid !== undefined){d3.select('#' + d.properties.county_underscore)
                                                            .style("fill", colorScale(color_percent,level1_current))} 
                              if(currentid === undefined){d3.select('#' + d.properties.county_underscore)
                                                            .style("fill", "#0A0A0A")} 
                              })    
  })
});


/////tooltip functionality/////////////////////////////////////////////////////////////////////
function getTooltipValue(d){ 
  var rect = ($('rect:hover').length !== 0)
  var text = ($('text:hover').length !== 0)
  var g= ($('g:hover').length !== 0)
  if (g === true){return "<span>" + d.properties.county_underscore.split('_').join(' ') + " " + "County" + "</span>"}
  if (rect === true || text === true){
  var number = d.properties.percentage
  var num_perc = number * 100
    return "<span>" + (num_perc.toFixed(0)) + "%-collected " + d.properties.collected + " of " + d.properties.total_need + "</span>"
  }
}


//////coloring choropleth functions ////////////////////////////start
function getCurrentLC(currentid,countyname){
    for (var i in level4Array){
      if(level4Array[i] === currentid && countynameArray[i] === countyname){
        //console.log("domainarry",percentageArray[i])
        return percentageArray[i]

    }
  }
}


function getLevel1(currentid,countyname){
    for (var i in level4Array){
      if(level4Array[i] === currentid && countynameArray[i] === countyname){
        //console.log("level1",level1Array[i])
        return level1Array[i]

    }
  }
}


function getLevel1Single(){
  for (var i in level4Array){
    if(level4Array[i] === currentid){return level1Array[i]}
  }
}





/////map legend
$(document).on("click", '.last, #Aquatic_Bed, #Buck_honey_upland, #Shrubland_other', function (event) {
  d3.select(".legend").remove()
  d3.select(".chart").remove()

  level1 = getLevel1Single()
  var color = ColorMapScale(level1)

  var mpercentin = {top: 30, right: 20, bottom: 0, left: 675},
        width = 50 - mpercentin.left - mpercentin.right,
        height = 50- mpercentin.top - mpercentin.bottom;

  var mapscale = d3.select("#center")
                   .append("svg")
                   .attr("width", chartWidth)
                   .attr("height", chartHeight)
                   .attr("class", "chart")
  .append("g")
  .attr("transform", "translate(" +  670 + "," + 352 + ")");


  labeltext = ["0-25%", "25-50%", "50-75%", "75-100%"]

  color.domain(d3.keys(labeltext[0]).filter(function(key) { return key }));


  var legend = mapscale.selectAll(".legend")
                       .data(color.domain().slice().reverse())
                       .enter().append("g")
                       .attr("class", "legend")
                       .attr("transform", function(d, i) { return "translate(0," + i * 25 + ")"; });


  bin_id = ['bin4','bin3','bin2','bin1','bin0']
  legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 20)
        .attr("height", 20)
        .attr("id", function(d) {return bin_id[d];})
        .style("fill", color);

  legend.append("text")
        .attr("class", "scalelabel")
        .attr("x", width + 10)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return labeltext[d]; })
        .style("fill", "white")

  d3.select("#bin0").remove()
})



/////bar chart
$(document).on("click", ".provinces", function (event) {
  d3.select(".chart").remove()

  var svg = d3.select("#center")
              .append("svg")
              .attr("width", chartWidth)
              .attr("height", chartHeight)
              .attr("class", "chart");


  currentid = event.target.id;
  d3.select('#'+currentid)
    .style("fill", "cyan")

  list = []
  subset = []
  for (d in transfer_data) {
    temp = transfer_data[d].properties.county_underscore
    if (temp === currentid){
      list.push(temp)
      subset.push(transfer_data[d])
    }
  }

  for (var i in subset){
    //console.log(subset[i].properties.percentage)
  };

  var dx = 130;
  var dy = 11;

  depth = list.length * (dy + 11)  + 5
  // console.log(typeof subset)
 
  //bars
  bars = svg.selectAll(".bar")
            .data(subset)
            .enter()
            .append("rect")
            .attr("class", function(d, i) {return "bar " + d.properties.level1_label;})
            .attr("x", function(d, i) {return 135-(dx*(d.properties.percentage))})
            .attr("y", function(d, i) {return (dy + 11)*i;})
            .attr("width", function(d, i) {return dx*(d.properties.percentage)})
            .attr("height", dy)
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)       

  //labels
  text = svg.selectAll("text")
            .data(subset)
            .enter()
            .append("text")
            .attr("class","chartlabel")
            .attr("id", function(d, i) {return "label " + d.properties.lc_class;})
            .attr("x", 136)
            .attr("y", function(d, i) {return (dy + 11) * i + 11;})
            .text( function(d) {return d.properties.lc_class_mod;})
            .attr("font-size", "13px")
            .style("fill", "white")
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)


  //bar-chart scale
  var scale = d3.scale.linear()
                .domain([100, 0])
                .range([7, 135]);

  var xAxis = d3.svg.axis()
                .scale(scale)
                .orient("bottom")
                .ticks(3)

      
  svg.append("g")
     .attr("class", "axis")  //Assign "axis" class
     .attr("transform", "translate(0," + depth + ")")
     .call(xAxis);
})




//make the accordain menu close when click on counties in map
$('svg').click(function(){
  //console.log("provinces fdddddct:",prev_id_l1)
  $('#' + prev_id_l2).next().slideUp(300);
  $('#' + prev_id_l1).next().slideUp(300);
  prev_id_l1 = false
  prev_id_l2 = false
})


//populate the div tag when click on it with info
$('g').click(function(){
  d3.select("#scaletext").remove()
  $('.chart_title').css('color', 'white');
  // $('.chart_title').css('margin-left','868px');
  $("<span id = 'scaletext'>" + currentcounty.split('_').join(' ') + " " + "County" + '</span>').appendTo('.chart_title');
  $('#scaletext').css('color', 'cyan');
})


//populate the div tag when click on it with info
$('.last, #Aquatic_Bed, #Buck_honey_upland, #Shrubland_other').click(function(){
  d3.select("#scaletext").remove()
  $('.chart_title').css('color', 'white');
  $("<span id = 'scaletext'>" + innerhtml + '</span>').appendTo('.chart_title');
})



