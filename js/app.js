//**user inputs**------------------------

//initialize global variables
// bind user data to object
var $chart = {
  name: "",
  title: '',
  type:'',
  labels:[],
  data: []
};
//need to keep track if the user has searched, do not repopulate the chart area with new graphs
var searchRefresh = true;

//array to hold object IDs that have already been posted
var objIdArray = [];






//**USER INPUT FUNCTIONS**------------------------

//BIND- binding function that grabs from input areas
var inputFunc = function(){
  queryParse();
  $("#submit").click(function(){
    $('p.warning').hide();
    //bind values from all textareas when click() submit
      //will change later to keyup() for certain fields
    $chart.name = $('#name').val();
    $chart.title = $('#title').val();
    $chart.type = $('#type').val().toUpperCase();
    $chart.labels = $('#labels').val().split(",");
    $chart.data = $('#data').val().split(",");

    //Checking Values
    if(checkValues($chart)){
        //hide all the warnings, and show a success message if it works!
        $('p.warning').hide();
        $('p.success').show()

        //clear all the text fields so they can submit again
        $('textarea').val("");

        //create,send, and save a parse object
        sendParse($chart);
        queryParse();
    }
  })
}

//SEARCH
var search = function(){

    //get new query for the search helper, results should be objects
    var Charts = Parse.Object.extend("charts");
    var query = new Parse.Query(Charts);
    var objNameArray = [];

    query.descending('createdAt');
    query.limit(200);
    query.find({
      success: function(results){
        //map to the names
        objNameArray = results.map(function(obj){
          return obj.attributes.name;
        })
      },
      error: function(){
        console.log(error.message);
      }
    });

    //create and show ul list at z-index 1
    //styling such that on hover they turn grayer
    //write each, filter

  //when search textarea keyup
    $('#search').keyup(function(){
        //stop rereshing and appending for new graphs if we're searching for something
        var searchRefresh = false;
        var searchField = $('#search').val();

        //clear all search results
        $('#search-results').html('').show();

        //list = filter(string has val(), objNameArray) //does not modify original array
        var holder = objNameArray.filter(function(item){
          //filter holder by textarea val()
          if(searchField.length>0) return searchField.toLowerCase() == item.slice(0,searchField.length).toLowerCase();
        });
        //holder now holds relevant objNames, but in duplicates
        //using object and grabbing keys to remove duplicates
        var holderObj = {};
        holder.forEach(function(item){
          if(holderObj[item]==undefined){holderObj[item]=1}
        })

        //holder will hold the keys from the obj (no duplicate entries)
        holder = [];
        for(key in holderObj){
          holder.push(key);
        }


        //clear any previous search
        $('#search-results').html('').show();
        //append the holder items to $('#search-results') as li items
        holder.forEach(function(item){
          $('#search-results').append('<li class="search-list-item">'+item+'</li>');
        })

        if(holder.length==0)$('#search-results').append('<li id="none"><em>No user by that name</em></li>');
        //if its empty, hide the ul
        if(searchField.length==0) $('#search-results').hide();
    });

    //on click of any list item, delete all li items and replace the textarea
    $('#search-results').on("click",".search-list-item",function(event){
      $('#search').val(event.originalEvent.srcElement.innerText);
      $('#search-results').html('').show();
      $('#search-results').hide();
    });



    //Search button:
    $('#search-button').click(function(){
      initialCall = true;
      objIdArray = [];
      searchRefresh = false;

      //delete all the current graphs
      $('.col-sm-7').html('');

      //new query that contains the name
      var Charts = Parse.Object.extend("charts");
      var query = new Parse.Query(Charts);
      query.descending('createdAt');
      query.limit(100);
      $('#search').val()
      query.contains("name",$('#search').val());
      query.find({
        success: function(results){
          results.forEach(function(obj){
            var bool = checkIfPosted(obj.id);
            if(!bool){
              objIdArray.push(obj.id);
              displayChart(obj);
            }
          })
          initialCall = false;
        },

        error: function(error){
          console.log(error.message);
        }

      })
    })


      //for each item in the new query, display it


}

//Checking values of user inputs to make sure that they are useable
var checkValues = function(obj){
  //need to check if name is empty, if empty value is anonymous
  if(obj.name.length==0){
    obj.name = "Anonymous";
  }
  //check if bar/line/pie
  if(!(obj.type=="BAR" ||obj.type=="LINE")){
    $('#type-warning').show()
    return false;
  }

  if((obj.data.length!=obj.labels.length && obj.labels.length!=0) || obj.data.length==0){
    $('#data-warning').show();
    return false;
  }

  return true;
}


//function to check if an ID has already been posted, since the setInterval will keep querying and posting all of them if I don't.
var checkIfPosted = function(string){
  for(i=0; i<objIdArray.length;i++){
    if(string == objIdArray[i]){return true}
  }
  return false;
};

//query parse db for new charts every 10 seconds calling the queryParse function
var refresh = function(){
  setInterval(function(){
    if(searchRefresh){
      queryParse()
    }
  }, 10000)
};

$(document).ready(inputFunc);
$(document).ready(refresh);
$(document).ready(search);


//**Parse Save/Query functions**------------------------

//send/save objects to parse database
var sendParse = function(object){
  var Charts = Parse.Object.extend("charts");
  var chart = new Charts();
  chart.save(object).then(function(){
    alert("it worked")
  });
}

var queryParse = function(){
  var Charts = Parse.Object.extend("charts");
  var query = new Parse.Query(Charts);
  query.descending('createdAt');
  query.limit(5);
  query.find({

    success: function(results){
      results.forEach(function(obj){
        var bool = checkIfPosted(obj.id);
        if(!bool){
          objIdArray.push(obj.id);
          displayChart(obj);
        }


      })
      initialCall = false;
    },

    error: function(error){
      console.log(error.message);
    }

  })
};


// **Chart building functions** --------


//creating proper display of 12hour time given Parse format of 24Hr.
var displayTime = function(obj){
  //creating date/time string in 12HR manner
  //array of [HR, Mn]
  var time = obj.createdAt.toString().slice(16,21).split(":");
  var timeString = "";
  if(parseInt(time[0],10)>11){time.push("PM")}
  else time.push("AM");
  if(parseInt(time[0],10)>12) time[0] = parseInt(time[0],10)-12; //subtract 12

  timeString = time[0] + ":" + time[1] + " " + time[2];
  var monthDayYear = obj.createdAt.toString().slice(3,15);
  var dayTime = [monthDayYear,timeString];
  return dayTime
}

//tracks when loading for the first time, so that I know to prepend or append to the div in displayChart
var initialCall = true;
//chart display function
var displayChart = function(obj){
  var dayTime = displayTime(obj);

  //Creating elements in DOM
  var graphHTML =
    //title as H1
    '<div class="row graph"><h2>'+obj.attributes.title +'</div>'
    //name as H3
    +'<div class="row graph"><h4>Created By: <strong>'+obj.attributes.name+"</strong> on <em>"+dayTime[0]+" - "+dayTime[1] +'</em></div>'
    //Chart canvas area
    +'<div class="row graph graph-box"><div class="col-sm-12"><canvas id="'+obj.id+ '"width="350" height="200"></div</canvas></div>';

  if(initialCall){
    console.log('i should be first');
    $('.col-sm-7').append(graphHTML);
    ;
  }
  else{
    console.log('i should be called later...');
    $('.col-sm-7').prepend(graphHTML);
    ;
  }

  //Creating color combinations!
  var colorArr = [
    {   fillColor:"#D0FFD5",
        strokeColor: "#97D0FF",
        pointColor: "#D4EEFF",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FF97C5"},

    {   fillColor:"#FDFFCB",
        strokeColor: "#FCF77B",
        pointColor: "#FFCBFE",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FF6DFF"},

    {   fillColor:"#FFECDE",
        strokeColor: "#FFC8AD",
        pointColor: "#B8A6FF",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#83FFB0"},

    {   fillColor:"#B7CAFF",
        strokeColor: "#FFEF40",
        pointColor: "#5C70FF",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#00FF72"},

    {   fillColor:"#00FF72",
        strokeColor: "#FF5D3D",
        pointColor: "#FF169C",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FF3153"},

    {   fillColor:"#9617FF",
        strokeColor: "#00FDFF",
        pointColor: "#00FF72",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FFEF40"},

    {   fillColor:"#C8F6FF",
        strokeColor: "#76DEFF",
        pointColor: "#3CFF8B",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#FFC788"}
  ];

  var randColorIndex = Math.floor(Math.random()*colorArr.length);


//boilerplate Chart.js
  var ctx = document.getElementById(obj.id).getContext('2d');
  Chart.defaults.global.responsive = true;

  var data= {
    labels: obj.attributes.labels,
    datasets: [
    {label: "None",
    fillColor:colorArr[randColorIndex].fillColor,
    strokeColor: colorArr[randColorIndex].strokeColor,
    pointColor: colorArr[randColorIndex].pointColor,
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: colorArr[randColorIndex].pointHighlightStroke,
    data: obj.attributes.data
    }
  ]
  }
  //creating based on if Bar or Line (can be expanded later to include other types of charts)
  switch(obj.attributes.type){
    case 'BAR':
      var myNewChart = new Chart(ctx).Bar(data);
      break;
    case 'LINE':
      var myNewChart = new Chart(ctx).Line(data);
      break;
  }


}

//**helper function
var contains = function(item, array){
  for(i=0;i<array.length;i++){
    if(item==array[i]) return true
  }
  return false;
}
