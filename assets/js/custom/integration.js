let integrationFrontendDefault = 'https://staging.i-frontend.techfi.tech';
// let integrationFrontendDefault = 'http://localhost:3000';
let integrationFrontend = integrationFrontendDefault;
const INTEGRATION_JWT_MEMBER_KEY = 'INTEGRATION_JWT_MEMBER';
const INTEGRATION_JWT_MEMBER_KEY_DEADLINE = 'INTEGRATION_JWT_MEMBER_DEADLINE';
try {
    integrationFrontend = integrationFrontendURL;
} catch (e) {
    console.log(e);
}

function addValueToAttr(elementId, attrKey, attrValue) {
    document.getElementById(elementId).setAttribute(attrKey, attrValue);
}

function httpPost(url, body, headers) {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', url, false); // false for synchronous request
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        for (var key in headers) {
            xmlHttp.setRequestHeader(key, headers[key]);
        }

        xmlHttp.send(JSON.stringify(body));
        return xmlHttp.responseText;
    } catch (e) {
        console.log(e);
        return null;
    }

}

function httpGet(url, body, headers) {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url, false); // false for synchronous request
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        for (var key in headers) {
            xmlHttp.setRequestHeader(key, headers[key]);
        }

        xmlHttp.send(JSON.stringify(body));
        return xmlHttp.responseText;
    } catch (e) {
        console.log(e);
        return null;
    }

}

const ghostIntegrationJwtUrl = '/members/api/integration-member-jwt';
var TechFiIntegrationBaseURL = TechFiIntegrationBaseURL || 'http://localhost:8000';

function getIntegrationMemberJwtToken() {
    let currentTimestamp = Math.floor(Date.now() / 1000);
    let deadline = localStorage.getItem(INTEGRATION_JWT_MEMBER_KEY_DEADLINE);
    var value = localStorage.getItem(INTEGRATION_JWT_MEMBER_KEY);
    if (!value || deadline <= currentTimestamp) {
        var host = window.location.host;
        var protocol = location.protocol;
        var url = `${protocol}//${host}${ghostIntegrationJwtUrl}`;
        // console.log(url);
        var integrationJwtUrl = TechFiIntegrationBaseURL + '/users/jwt-ghost-member';

        // console.log(integrationJwtUrl);
        var headers = {integrationJwtUrl: integrationJwtUrl};
        var body = {};
        value = httpPost(url, body, headers);
        localStorage.setItem(INTEGRATION_JWT_MEMBER_KEY, value);
        let deadline = Math.floor(Date.now() / 1000) + 3600;
        localStorage.setItem(INTEGRATION_JWT_MEMBER_KEY_DEADLINE, deadline);
    }

    return value;
}

function removeJwt() {
    localStorage.removeItem(INTEGRATION_JWT_MEMBER_KEY);
    localStorage.removeItem(INTEGRATION_JWT_MEMBER_KEY_DEADLINE);
}

const ghostIntegrationWriterPageURl = '/users/authors/author-page';

function getWriterUrl() {
    var integrationMemberJwt = getIntegrationMemberJwtToken();
    var host = window.location.host;
    var protocol = location.protocol;
    var url = `${TechFiIntegrationBaseURL}${ghostIntegrationWriterPageURl}`;
    var headers = {Authorization: `Bearer ${integrationMemberJwt}`};
    var body = {};
    let value = httpGet(url, body, headers);
    console.log(value);
    const obj = JSON.parse(value);
    return obj.url;
}
