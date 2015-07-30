///////////////////////////////////////////////////////////////////////////////////////////
//accordian menu bar start/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////




//variables for accordian menu bar
var level1 = false 
var level2 = false
var level4 = false
var bottom = false
var prev_id_l1
var prev_id_l2
var prev_bottom
var text
var prev_text



$(".level1").click(function(){
// $('.bottom').css('margin-bottom', '9px');//create a margin on the last level2 of 9px
//console.log("prev_id_l1",prev_id_l2)
id_l1 = $(this).attr("id");
//console.log("id_l1",id_l1)
$('#Aquatic_Bed, #Buck_honey_upland, #Shrubland_other').css('color', 'white')

  if(level1 === false){
    $(this).next().slideDown(300);
      prev_id_l1 = id_l1
      //console.log("prev_id_l1",prev_id_l1)
      level1 = true
      return
    //storePrevious(class_l2,level2)
  }

  if(prev_id_l1 === id_l1){
    $('#' + prev_id_l2).next().slideUp(300);
    $(this).next().slideUp(300);
    level1 = false
  }

  if(prev_id_l1 !== id_l1){
    $('#' + prev_id_l2).next().slideUp(300);
    $('#' + prev_id_l1).next().slideUp(300);
    $(this).next().slideDown(300);
    prev_id_l1 = id_l1
    //console.log("prev_id_l1",prev_id_l1)
    //level2 = false
  }


})

// #Aquatic_Bed, #Buck_honey_upland, #Shrubland_other,



$(".level2").click(function(){
// $('.bottom').css('margin-bottom', '9px');//create a margin on the last level2 of 9px
// $(".chart_title").empty()
//console.log("prev_id_l2",prev_id_l2)
id_l2 = $(this).attr("id");
//console.log("id_l2",id_l2)
$('.last').css('color', 'white')

  if(id_l2 === 'Aquatic_Bed'){
   $('#Aquatic_Bed').css('color', 'cyan')
  }

  if(id_l2 === 'Buck_honey_upland'){
   $('#Buck_honey_upland').css('color', 'cyan')
  }

  if(id_l2 === 'Shrubland_other'){
   $('#Shrubland_other').css('color', 'cyan')
  }

  if(id_l2 !== 'Aquatic_Bed'){
   $('#Aquatic_Bed').css('color', 'white')
  }

  if(id_l2 !== 'Buck_honey_upland'){
   $('#Buck_honey_upland').css('color', 'white')
  }

  if(id_l2 !== 'Shrubland_other'){
   $('#Shrubland_other').css('color', 'white')
  }

  if(level2 === false){
    $(this).next().slideDown(300);
      prev_id_l2 = id_l2
      //console.log("prev_id_l2",prev_id_l2)
      level2 = true
      return
    //storePrevious(class_l2,level2)
  }

  if(prev_id_l2 === id_l2){
    $(this).next().slideUp(300);
    level2 = false
  }

  if(prev_id_l2 !== id_l2){
    $('#' + prev_id_l2).next().slideUp(300);
    $(this).next().slideDown(300);

    prev_id_l2 = id_l2
    //console.log("prev_id_l2",prev_id_l2)
    //level2 = false
  }

  

})


// $('a').click(function() {
//  $(this).css('color', 'cyan');
// });

 //$(".last").css('color', 'cyan')



$(".last, #Aquatic_Bed, #Buck_honey_upland, #Shrubland_other").click(function(){
innerhtml = $( this ).html();
text = $(this).attr("id");
//console.log("text",text)
  if(level4 === false){
      prev_text = text
      //console.log("prev_text",prev_text)
      $(this).css('color', 'cyan')
      level4 = true
      return
    //storePrevious(class_l2,level2)
  }

  if(prev_text === text){
    $(this).css('color', 'cyan')

  }

  if(prev_text !== text){
    $('#' + prev_text).css('color', 'white');
    $(this).css('color', 'cyan')
    prev_text = text
    
  }

})



// $('.bottom').click(function(){
//   class_bottom = $(this).attr("class");
//   console.log('yo bottom')
//   if(bottom === false){
//     $('.bottom').css('margin-bottom', '0px'); 
//     prev_bottom = class_bottom //key step to keep track!!
//     bottom = true
//     return //important
//   }

//   if(prev_bottom === class_bottom){
//     $('.bottom').css('margin-bottom', '9px'); 
//     bottom = false
//   }

//   if(prev_bottom !== class_bottom){
//     $('.bottom').css('margin-bottom', '9px'); 
//   }

//     // prev_id_l2 = id_l2
//     // console.log("prev_id_l2",prev_id_l2)
//     // level2 = false
//   })





//practice///////////////create a margin on the last level2 of 9px.
// $('.bottom').click(function(){
//   console.log('.bottom')
//   if(bottom === false){
//       bottom = true
//      $('.bottom').css('margin-bottom', '0px'); 
//   }
//   if(bottom === true){
//       bottom = false
//      $('.bottom').css('margin-bottom', '9px'); 
//   }
  
// })



//make the accordain menu close when click on counties in map
// $('svg').click(function(){
//   //console.log("provinces fdddddct:",prev_id_l1)
//   $('#' + prev_id_l2).next().slideUp(300);
//   $('#' + prev_id_l1).next().slideUp(300);
//   prev_id_l1 = false
//   prev_id_l2 = false
// })



///////////////////////////////////////////////////////////////////////////////////////////
//accordian menu bar end/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
