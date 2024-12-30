document.getElementById('profileBtn').addEventListener('click',function() 
{
    window.location.href='profile.html';
});
document.getElementById('logoutBtn').addEventListener('click',function() 
{
    window.location.href='index.html';
});

let followersCount=0;
let followingCount=0;
let postCount=0;

document.getElementById('postBtn').addEventListener('click', function()
{
    const postText=document.getElementById('newPost').value;
    const username='JustMe'; 
    if (postText) 
    {
        createPost(username,postText);
        document.getElementById('newPost').value='';
        updateProfileStats('post');
    }
});
const postsFromOthers=[
    { userId:'user001',username:'Alice',content:'This is a post from Alice!',likes:5,comments:[]},
    { userId:'user002',username:'Bob',content:'Another great day from Bob!',likes:3,comments:[]},
];

function createPost(username, postText) 
{
    const postList=document.getElementById('postList');
    const postDiv=document.createElement('div');
    postDiv.classList.add('post');
    const post= 
    {
        username,
        content:postText,
        likes:0,
        comments:[]
    };
    const postUser=document.createElement('h4');
    postUser.textContent=`Posted by:${post.username}`;
    postDiv.appendChild(postUser);
    const followBtn=document.createElement('button');
    followBtn.textContent='Follow';
    followBtn.classList.add('follow');
    followBtn.style.marginLeft='10px';
    followBtn.onclick=()=>followUser(post.username,followBtn);
    postDiv.appendChild(followBtn);
    const postContent=document.createElement('p');
    postContent.textContent=post.content;
    postDiv.appendChild(postContent);
    const likeCount=document.createElement('span');
    likeCount.textContent=`Likes:${post.likes}`;
    likeCount.style.marginRight='10px';

    const likeBtn=document.createElement('button');
    likeBtn.innerHTML='♡';
    likeBtn.classList.add('like');
    likeBtn.onclick=()=> likePost(post,likeCount,likeBtn);
    postDiv.appendChild(likeBtn);
    postDiv.appendChild(likeCount);

    const commentCount=document.createElement('span');
    commentCount.textContent=`Comments:${post.comments.length}`;
    commentCount.style.marginRight='10px';

    const commentBtn=document.createElement('button');
    commentBtn.textContent='💬 Comment';
    commentBtn.classList.add('comment');
    commentBtn.onclick=()=>commentOnPost(post,postDiv,commentCount);
    postDiv.appendChild(commentBtn);
    postDiv.appendChild(commentCount);

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments');
    commentsDiv.style.marginTop = '10px';
    postDiv.appendChild(commentsDiv);
    postList.appendChild(postDiv);
}

function likePost(post,likeCountElement,likeBtn) 
{
    if(likeBtn.innerHTML==='♡') 
    { 
        post.likes+=1;
        likeBtn.innerHTML='❤️';
    } 
    else
    {
        post.likes-=1;
        likeBtn.innerHTML='♡';
    }
    likeCountElement.textContent=`Likes:${post.likes}`;
}

function commentOnPost(post,postElement,commentCountElement) 
{
    const comment=prompt('Enter your comment:');
    const username='JustMe'; 
    if(comment) 
    {
        post.comments.push({username,text:comment});
        commentCountElement.textContent=`Comments:${post.comments.length}`;
        displayComments(post,postElement.querySelector('.comments'));
    }
}

function displayComments(post,commentsDiv) 
{
    commentsDiv.innerHTML=''; 
    post.comments.forEach(comment=>
    {
        const commentDiv=document.createElement('div');
        commentDiv.style.marginLeft='20px';
        const commentUser=document.createElement('h5');
        commentUser.textContent=comment.username;
        commentUser.style.marginBottom='5px';
        const commentText=document.createElement('p');
        commentText.textContent=comment.text;
        commentDiv.appendChild(commentUser);
        commentDiv.appendChild(commentText);
        commentsDiv.appendChild(commentDiv);
    });
}
function followUser(username,button) 
{
    if(button.textContent==='Follow') 
    {
        button.textContent='Following';
        updateProfileStats('following');
        updateProfileStats('follower');
    } 
    else 
    {
        button.textContent='Follow';
        updateProfileStats('unfollow');
    }
}
function updateProfileStats(action) 
{
    if(action==='post') 
    {
        postCount++;
        document.getElementById('postCount').textContent=`Posts:${postCount}`;
    } 
    else if(action==='following') 
    {
        followingCount++;
        document.getElementById('followingCount').textContent=`Following: ${followingCount}`;
    } 
    else if(action==='unfollow') 
    {
        followingCount--;
        document.getElementById('followingCount').textContent=`Following: ${followingCount}`;
    } 
    else if (action==='follower') 
    {
        followersCount++;
        document.getElementById('followersCount').textContent=`Followers: ${followersCount}`;
    }
}
postsFromOthers.forEach(post=> 
{
    createPost(post.username,post.content);
});
