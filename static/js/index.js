const baseUrl = window.location.origin;

$(function() {
    var socket = io.connect(baseUrl);
    
    socket.on('insert_post', function(msg) {
        $('#postContainer').prepend(generate_block_post(msg));
    }); 

    $('#createPostForm').on('submit', function(e) {
        e.preventDefault();

        socket.emit('create_post', {
            title: $(this).find('input#titleField').val(),
            body: $(this).find('textarea#contentField').val()
        });

        $(e.target).find('button[data-dismiss="modal"]').click();
    });
});

function generate_block_post(post) 
{
    var block =
        `<div class="card border-0 rounded-0">
            <div class="card-body bg-primary">
                <h1 class="font-weight-bold m-0">${post['title']}</h1>
                <hr class="my-2">
                <h4 class="text-justify">${post['body']}</h4>
            </div>
        </div>`;

    return block;
}

function toggle_theme()
{
    $('body').toggleClass('bg-white');
    $('body').toggleClass('bg-black');
    $('body').toggleClass('text-white');
    $('body').toggleClass('text-black');

    $('#postContainer').toggleClass('text-white');
    $('#postContainer').toggleClass('text-black');


}