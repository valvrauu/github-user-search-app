(function searchUser() {
    const userElements = {
        img: document.querySelectorAll('.userImg'),
        name: document.querySelector('#userName'),
        login: document.querySelector('#userLogin'),
        joined: document.querySelector('#userJoined'),
        bio: document.querySelector('#userBio'),
        repos: document.querySelector('#userRepos'),
        followers: document.querySelector('#userFollowers'),
        following: document.querySelector('#userFollowing'),
        location: document.querySelector('#userLocation'),
        website: document.querySelector('#userWebsite'),
        twitter: document.querySelector('#userTwitter'),
        company: document.querySelector('#userCompany'),
        notFound: document.querySelector('#errorText'),
    }

    async function userRequest(name) {
        try {
            const response = await fetch(`https://api.github.com/users/${name}`);
            if (!response.ok) return handleUserNotFound(response.status);

            const data = await response.json();
            updateUserDom(data);
        } catch (err) {
            handleUserNotFound(err);
        }
    }

    function updateUserDom(obj) {
        userElements.notFound.style.display = 'hidden';
        userElements.notFound.textContent = '';

        userElements.img[0].setAttribute('src', obj.avatar_url);
        userElements.img[1].setAttribute('src', obj.avatar_url);

        userElements.name.textContent = obj.name;
        userElements.login.textContent = obj.login;

        userElements.joined.textContent = changeDateToBr(obj.created_at);
        userElements.joined.setAttribute('datetime', obj.created_at.split('T')[0]);

        userElements.repos.textContent = obj.public_repos;
        userElements.followers.textContent = obj.followers;
        userElements.following.textContent = obj.following;

        !obj.bio ? notAvailable(userElements.bio) : userElements.bio.textContent = obj.bio;
        !obj.company ? notAvailable(userElements.company) : userElements.company.textContent = obj.company;
        !obj.location ? notAvailable(userElements.location) : userElements.location.textContent = obj.location;

        if (!obj.blog) {
            notAvailable(userElements.website);
        } else {
            userElements.website.textContent = obj.blog;
            userElements.website.setAttribute('href', userElements.website.textContent);
            userElements.website.setAttribute('target', '_blank');
        }

        if (!obj.twitter_username) {
            notAvailable(userElements.twitter);
        } else {
            userElements.twitter.textContent = obj.twitter_username;
            userElements.twitter.setAttribute('href', `https://twitter.com/${obj.twitter_username}`);
            userElements.twitter.setAttribute('target', '_blank');
        }
    }

    function handleUserNotFound(err) {
        console.log(err);

        if (err === 404) {
            userElements.notFound.style.display = 'block';
            userElements.notFound.textContent = 'No results';
        }
    }

    function notAvailable(el) {
        el.style.opacity = '0.5';
        el.textContent = 'Not Available';

        if (el.hasAttribute('href')) el.setAttribute('href', '#')    
        if(el.hasAttribute('target')) el.setAttribute('target', '_self')
    }

    function changeDateToBr(dataString) {
        const data = new Date(dataString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };

        return data.toLocaleDateString('pt-BR', options).replace(/de|\./gi, '');
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const input = form.querySelector('input');
        if (input.value === '') return;

        userRequest(input.value);
    });
})();