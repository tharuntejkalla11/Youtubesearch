function displayvids(data,tab){
    document.getElementById("searchresults").innerHTML = "";
    var searchresults= document.getElementById("searchresults");
    //console.log(data[0].snippet.channelId);
    for(let i=5*tab;i<5*(tab+1);i++)
    {
        var eachdiv = document.createElement("div");
        eachdiv.setAttribute("class","eachdiv");
        
        var url = "openUrlInNewTab(\'https://www.youtube.com/watch?v=" + data[i].id.videoId + "\');";
        eachdiv.setAttribute("onclick",url);

        var imgdiv = document.createElement("div");
        imgdiv.setAttribute("class","imgdiv");

        var image = document.createElement("img");
        image.setAttribute("src",data[i].snippet.thumbnails.medium.url);
        image.setAttribute("class","thumbnail");
        imgdiv.appendChild(image);

        var contentdiv = document.createElement("div");
        contentdiv.setAttribute("class","contentdiv");

        var title = document.createElement("h3");
        var titletext = document.createTextNode(data[i].snippet.title);
        title.appendChild(titletext);

        var channel = document.createElement("p");
        var channeltext = document.createTextNode(data[i].snippet.channelTitle);
        channel.appendChild(channeltext);

        var desc = document.createElement("p");
        var desctext = document.createTextNode(data[i].snippet.description);
        desc.appendChild(desctext);

        var date = document.createElement("p");
        var datetext = document.createTextNode(data[i].snippet.publishTime);
        date.appendChild(datetext);


        contentdiv.appendChild(title);
        contentdiv.appendChild(channel);
        contentdiv.appendChild(desc);
        contentdiv.appendChild(date);

        eachdiv.appendChild(imgdiv);
        eachdiv.appendChild(contentdiv);

        searchresults.appendChild(eachdiv);
      }
        var buttonsdiv = document.createElement("div");
        buttonsdiv.setAttribute("class","bottombtns");
        
        var previousbutton = document.createElement("button");
        previousbutton.innerHTML="<< Prev";
        previousbutton.setAttribute("class","bottombtns");
        previousbutton.setAttribute("id","previous-button");
        previousbutton.setAttribute("onclick","skiptabs(-1)")

        var nextbutton = document.createElement("button");
        nextbutton.innerHTML="Next >>";
        nextbutton.setAttribute("class","bottombtns");
        nextbutton.setAttribute("id","next-button");
        nextbutton.setAttribute("onclick","skiptabs(1)")
        
        buttonsdiv.appendChild(previousbutton);
        buttonsdiv.appendChild(nextbutton);
        searchresults.appendChild(buttonsdiv);
}
function openUrlInNewTab(url){window.open(url);}

async function getresponse(searchedquery) {
    //const apikey="AIzaSyC_sUZgsJ10ErSpWK2dFp4xzva9JxH_jPc"; //mailexhausted quota
    const apikey="AIzaSyCLTVrxY9yeouNbFwWIRIy-sDaSwZ_D-cc"; //mail2 working
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&maxResults=20&q=${searchedquery}`
    );
    if(!response.ok){
        throw console.error(`Some unexpected Error occured ${response.status}`);
    }
    else{
    var rawdata = await response.json();
    data=rawdata.items;
    displayvids(data,0);
    }
}

async function getresponsefromgit(searchedquery) {

  const github = "https://tharuntejkalla11.github.io/Youtubesearch/youtubestaticdataforhtmlsearch.txt";
  const response = await fetch(github);
  if(!response.ok){
      throw console.error(`Some unexpected Error occured ${response.status}`);
  }
  else{
  var rawdata = await response.json();
  data=rawdata.items;
  displayvids(data,0);
  }
}

var el = document.getElementById("searchbutton");
var tabcount=0;
var data="";
if(el){
    el.addEventListener('click',function(){
        let searchedquery = document.getElementById("searchbox").value;
        if(searchedquery != ""){
            //for dynamically load from youtube api
            //getresponse(searchedquery);
            getresponsefromgit(searchedquery);
            //getresponces(searchedquery);
        }else{
            console.log("error");
            window.alert("Please Enter Something to Search..");
        }
    });
}

function skiptabs(x){
  tabcount+=x;
  if(tabcount+x<0)tabcount=0;
  else if(tabcount+x>6)tabcount=6;
  displayvids(data,tabcount);
}

// function getresponces(searchedquery){
    
//     var rawdata = JSON.parse(youtubedata);
//     data=rawdata.items;
//     displayvids(data,0);
// }
