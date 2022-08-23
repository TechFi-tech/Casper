function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

var webinarSaved = false;
var INTEGRATION_JWT_MEMBER = localStorage.getItem('INTEGRATION_JWT_MEMBER');
var webinarID = parseJwt(INTEGRATION_JWT_MEMBER).identify;
var webinarURL = location.href;

async function checkSavedWebinar() {
    const URL = `${TechFiIntegrationBaseURL}/webinars/user/saved`;
    const headers = {'Authorization': INTEGRATION_JWT_MEMBER};
    let res = await fetch(URL, {method: 'GET', headers: headers}).then((res) => res.json());

    res = res.webinar;

    res.forEach((e) => {
            if (e.url === webinarURL) {
                webinarSaved = true;
            }

    });

    if (webinarSaved) {
        document.querySelector('#cls-1').setAttribute('fill', '#00bea5');
    } else {
        document.querySelector('#cls-1').setAttribute('fill', 'grey');
    }
}

async function saveWebinar() {
    const URL = `${TechFiIntegrationBaseURL}/webinars`;
    const headers = {'Authorization': INTEGRATION_JWT_MEMBER};
    if (!webinarSaved) {
        const URL = `${TechFiIntegrationBaseURL}/webinars/user/save`;

        let res = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({user_id: webinarID, webinar_link: webinarURL})
        });
        if (res.status != 200) {
            return;
        }
        document.querySelector('#cls-1').setAttribute('fill', '#00bea5');
        webinarSaved = true;
    } else {
        const URL = `${TechFiIntegrationBaseURL}/webinars/unsave/webinar`;

        let res = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({user_id: webinarID, webinar_link: webinarURL})
        });
        if (res.status != 200) {
            return;
        }
        document.querySelector('#cls-1').setAttribute('fill', 'grey');
        webinarSaved = false;
    }
}
