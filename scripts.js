//Cesar Ramirez
//113515245

// For Assignment 2
function test_print(){
  console.log("test code");
}

$(function() {
  //Get user IDs for second section
  $('#get-button').on('click', function() {
       //TODO: get all users' IDs & display it
      $.ajax({

        url: '/tweets',
        contentType: 'application/json',
        success: function(response) {
          var tBodyEl = $(namebody);
          
          tBodyEl.html('');

          response.tweetinfo.forEach(function(tweetinfo) {
            tBodyEl.append('\
            <tr>\
                 <td class="id">' + tweetinfo.user.id_str + '</td>\
                 <td class="screen_name">' + tweetinfo.user.screen_name +  '</td>\
                 <td class="name">' + tweetinfo.user.name + '</td>\
            </tr>\
            ');
          });
        }
      });

   });


   //Get tweets for first section
   $('#get-tweets-button').on('click', function(){
       //TODO: get tweet info and display it
       $.ajax({
           url: '/tweetinfo',
           contentType: 'application/json',
           success: function(response){
               var tBodyElT = $(tweetbody);
               tBodyElT.html('');
               response.tweetinfo.forEach(function (tweetinfo){
                   tBodyElT.append('\
                  <tr>\
                  <td class = "id">' + tweetinfo.id + '</td>\
                  <td class = "text">' + tweetinfo.text + '</td>\
                  <td class = "created_at">' + tweetinfo.created_at + '</td>\
                      </tr>\
                      ');
               });
           }
       });
   });

    //Get searched tweets for third section
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tBodyElS = $(searchbody);
            tBodyElS.html('');
            response.tweetinfo.forEach(function (tweetinfo) {
              tBodyElS.append('\
              <tr>\
              <td class = "id">' + tweetinfo.id + '</td>\
              <td class = "text">' + tweetinfo.text + '</td>\
              <td class = "created_at">' + tweetinfo.created_at + '</td>\
                  </tr>\
                  ');
            });
          }
        });
    });


  //CREATE a new username for user by ID number
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        var inputString = createInput.val();
        const parsedInfo = inputString.split(';');

        var id = parsedInfo[0];
        var text = parsedInfo[1];

        //TODO: create a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ tweet: inputString }),
          success: function(response) {
            console.log(response);

          }
        });
  });

    // searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.
    var searchInput = $('#search-input');
    var inputString = searchInput.val();
    $.ajax({
        url: '/searchinfo',
        contentType: 'application/json',
        data: JSON.stringify({id: inputString}),
        success: function(response){
            var tBodyElt = $(searchbody);
            tBodyElt.html('');
            response.tweetinfo.forEach(function (tweetinfo){
                if(tweetinfo.id == inputString ||tweetinfo.id_str == inputString) {
                    tBodyElt.append('\
                 <tr>\
                 <td class = "id">' + tweetinfo.id + '</td>\
                 <td class = "text">' + tweetinfo.text + '</td>\
                 <td class = "created at">' + tweetinfo.created_at + '</td>\
                     </tr>\
                     ');
                }
            })
        }
    });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();
    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
    $.ajax({
      url: '/tweets',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({tweet: inputString}),
      success: function(response){
          console.log(response);
          $('update-input').click();
      }
    })
  });


  //DELETE a tweet from tweet ID
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    $.ajax({
      url: '/tweetinfo',
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(id),
      success: function(response) {
        console.log(response);
        $('delete-button').click();
      }
    })
  });


});


                    
   