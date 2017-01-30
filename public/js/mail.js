var emailData;
var indexData = [];

window.onload = function() {
  if (window.location.pathname == '/') {
    start();
  }

  if (window.location.pathname == '/openEmail.html') {
    start_openEmail();
  }
};

var xml_emailData = new XMLHttpRequest();
xml_emailData.onreadystatechange = function() { 
    if (xml_emailData.readyState == 4 && xml_emailData.status == 200) {
        emailData = JSON.parse(xml_emailData.responseText);              
    }
}   

var xml_indexData = new XMLHttpRequest();
xml_indexData.onreadystatechange = function() { 
    if (xml_indexData.readyState == 4 && xml_indexData.status == 200) {
        indexData = JSON.parse(xml_indexData.responseText);              
    }
}  

function start() {
      xml_emailData.open("GET", "/data", false);  
      xml_emailData.setRequestHeader('Content-Type', 'application/json');
      xml_emailData.send(null);

      var table = document.getElementById("tablebody");
              
      //clear the table 
      while(table.hasChildNodes())
        table.removeChild(table.firstChild);

      //populate the table with emails
      for(var i = 0; i < emailData.length; i++){

        var newrow = table.insertRow(i);
        if(i%2 == 0)
          newrow.setAttribute("class","alt");

        
        var newEmail = newrow.insertCell(0);
        newEmail.innerHTML = emailData[i]["id"]

        var x = document.createElement("BUTTON"); 
        var t = document.createTextNode("OPEN");
        x.setAttribute("class", "myButton");
        x.setAttribute("id", i);
        x.addEventListener("click", function(){
          indexData = [];
          indexData.push(this.id);

          xml_indexData.open("POST", "/readEmail", false); 
          xml_indexData.setRequestHeader('Content-Type', 'application/json');
          xml_indexData.send(JSON.stringify(indexData));

          openEmail();

        });
        x.appendChild(t);
        newEmail.appendChild(x);     
      } 
}

function openEmail(){
    window.location.href = "/openEmail.html";
}  

function start_openEmail(){
    //get the index of the email being read
    xml_indexData.open("GET", "/readEmail", false); 
    xml_indexData.setRequestHeader('Content-Type', 'application/json');
    xml_indexData.send(null);

    //get the email data
    xml_emailData.open("GET", "/data", false); 
    xml_emailData.setRequestHeader('Content-Type', 'application/json');
    xml_emailData.send(null);

    console.log(indexData);

    var table = document.getElementById("tablebody_");
              
    //clear the table 
    while(table.hasChildNodes())
      table.removeChild(table.firstChild);

  
    //populate table with envelope data
    var newrow = table.insertRow(0);

    var id = newrow.insertCell(0);
    var from = newrow.insertCell(1);
    var to = newrow.insertCell(2);
    var message = newrow.insertCell(3);
    
    id.innerHTML = emailData[indexData]["id"];
    from.innerHTML = emailData[indexData]["from"];
    to.innerHTML = emailData[indexData]["to"];
    message.innerHTML = emailData[indexData]["message"]; 
    
}

