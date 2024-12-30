document.addEventListener('DOMContentLoaded',()=> 
{
    let followersCount="17M";
    let followingCount="7k";
    let postCount=3;
    let username='JustMe';

    document.getElementById('profileUsername').textContent=username;
    document.getElementById('postCount').textContent=postCount;
    document.getElementById('followersCount').textContent=followersCount;
    document.getElementById('followingCount').textContent=followingCount;

    const userPosts=[
        {content:'My first post!',likes:10,comments:[]},
        {content:'Another day, another post',likes:5,comments:[]},
        {content:'Good Morning',likes:6,comments:[]}
    ];

    function displayUserPosts() 
    {
        const postList=document.getElementById('userPostList');
        postList.innerHTML='';
        userPosts.forEach(post=> 
            {
            const postDiv=document.createElement('div');
            postDiv.classList.add('post');

            const postContent=document.createElement('p');
            postContent.textContent=post.content;
            postDiv.appendChild(postContent);

            const postLikes=document.createElement('span');
            postLikes.textContent=`Likes: ${post.likes}`;
            postDiv.appendChild(postLikes);
            postList.appendChild(postDiv);
        });
    }
    displayUserPosts();
    document.getElementById('editProfileBtn').addEventListener('click',function() 
    {
        document.getElementById('editProfilePopup').style.display='block';
    });
    document.getElementById('saveChangesBtn').addEventListener('click', function() 
    {
        const newUsername=document.getElementById('newUsername').value;
        if (newUsername) 
            {
            username=newUsername;
            document.getElementById('profileUsername').textContent=username;
            document.getElementById('editProfilePopup').style.display='none';
        }
    });
    document.getElementById('cancelChangesBtn').addEventListener('click', function() 
    {
        document.getElementById('editProfilePopup').style.display='none';
    });
    const homeBtn=document.getElementById('homeBtn');
    homeBtn.addEventListener('click',()=> 
    {
        window.location.href='homepage.html';
    });
    const profileBtn=document.getElementById('profileBtn');
    profileBtn.addEventListener('click',()=>
    {
        window.location.href='profile.html'; 
    });
    const logoutBtn=document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click',()=> 
    {
        window.location.href='indeyyx.html';
    });
});
