function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

var webinarSaved = false;
var webinarID = parseJwt(
  localStorage.getItem("INTEGRATION_JWT_MEMBER") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmeSI6IjYyNjk1NmU3YzliODBhZGRmODhmODljYiIsInJvbGVzIjpbInVzZXIiXSwibWV0YURhdGEiOnsiZW1haWwiOiJwaGFuYW5odHF2bkBnbWFpbC5jb20ifSwiaWF0IjoxNjU0NzYwNTI1LCJleHAiOjE2NzAzMTI1MjV9.d_MWM_2UEYjyxUE-MbpbHFnpLigfsL3gcUnhTtNp_mo"
).identify;
var webinarURL = location.href;

async function checkSavedWebinar() {
  const URL = `https://integration.techfi.tech/staging/api/v1.0/webinars/saved/${webinarID}`;
  let res = await fetch(URL, { method: "GET" }).then((res) => res.json());

  res = res.webinar;

  res.forEach((e) => {
    e.links.forEach((e) => {
      if (e == webinarURL) {
        webinarSaved = true;
      }
    });
  });

  if (webinarSaved) {
    document.querySelector("#cls-1").setAttribute("fill", "#00bea5");
  } else document.querySelector("#cls-1").setAttribute("fill", "grey");
}

async function saveWebinar() {
  const URL = "https://integration.techfi.tech/staging/api/v1.0/webinars";

  if (!webinarSaved) {
    const URL = `https://integration.techfi.tech/staging/api/v1.0/webinars/save/webinar`;

    let res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ user_id: webinarID, webinar_link: webinarURL }),
    });
    if (res.status != 200) return;
    document.querySelector("#cls-1").setAttribute("fill", "#00bea5");
  } else {
    const URL = `https://integration.techfi.tech/staging/api/v1.0/webinars/unsave/webinar`;

    let res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ user_id: webinarID, webinar_link: webinarURL }),
    });
    if (res.status != 200) return;
    document.querySelector("#cls-1").setAttribute("fill", "grey");
  }
}
