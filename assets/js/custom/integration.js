let integrationFrontendDefault = 'https://staging.i-frontend.techfi.tech';
// let integrationFrontendDefault = 'http://localhost:3000';
let integrationFrontend = integrationFrontendDefault;
try {
    integrationFrontend = integrationFrontendURL;
} catch (e) {
    console.log(e);
}

function addValueToAttr(elementId, attrKey, attrValue) {
    document.getElementById(elementId).setAttribute(attrKey, attrValue);
}

function httpGet(url, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url, false); // false for synchronous request
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(body));
    return xmlHttp.responseText;
}

const ghostIntegrationJwtUrl = '/members/api/integration-member-jwt';
var TechFiIntegrationBaseURL = TechFiIntegrationBaseURL || 'http://localhost:8000';

function getIntegrationMemberJwtToken() {
    var host = window.location.host;
    var protocol = location.protocol;
    var url = `${protocol}//${host}${ghostIntegrationJwtUrl}`;
    console.log(url);
    var integrationJwtUrl = TechFiIntegrationBaseURL + '/users/jwt-ghost-member';

    console.log(integrationJwtUrl);
    var body = {integrationJwtUrl: integrationJwtUrl};
    let value = httpGet(url, body);

    return value;
}
