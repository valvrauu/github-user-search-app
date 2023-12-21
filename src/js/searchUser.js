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

        !obj.bio ? notAvailable(userElements.bio, 'This profile has no bio') : available(userElements.bio, obj.bio);
        !obj.company ? notAvailable(userElements.company, 'Not Available') : available(userElements.company, obj.company);
        !obj.location ? notAvailable(userElements.location, 'Not Available') : available(userElements.location, obj.location);
        !obj.blog ? notAvailable(userElements.website, 'Not Available') : available(userElements.website, obj.blog);
        !obj.twitter_username ? notAvailable(userElements.twitter, 'Not Available') : available(userElements.twitter, obj.twitter_username);
    }

    function handleUserNotFound(err) {
        console.log(err);

        if (err === 404) {
            userElements.notFound.style.display = 'block';
            userElements.notFound.textContent = 'No results';
        }
    }

    function available(el, msg) {
        el === userElements.bio ? el.style.opacity = '1' : el.parentNode.style.opacity = '1';
        el.textContent = msg;

        el.setAttribute('href', msg);
        el.setAttribute('target', '_blank');

        if (el === userElements.twitter) el.setAttribute('href', `https://twitter.com/${msg}`)
    }

    function notAvailable(el, msg) {
        el === userElements.bio ? el.style.opacity = '0.5' : el.parentNode.style.opacity = '0.5';
        el.textContent = msg;

        if (el.hasAttribute('href')) el.setAttribute('href', '#');
        if (el.hasAttribute('target')) el.setAttribute('target', '_self');
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