const postId = document.getElementById("postId").innerHTML
const userId = document.getElementById("userId").innerHTML || "0"
document.getElementById("Capa_1").setAttribute("fill", '#062225')
document.getElementById("Like_1").setAttribute("fill", '#062225')
        if(TechFiIntegrationBaseURL){

        const getUrl = TechFiIntegrationBaseURL + "/posts?postId=" + postId + "&userId=" + userId
        const xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            res = JSON.parse(this.responseText)
            const like = res?.postInfo?.like ? res.postInfo.like : 0;
            const clap = res?.postInfo?.clap ? res.postInfo.clap : 0;

            document.getElementById("like-num").innerHTML = like
            document.getElementById("clap-num").innerHTML = clap

            const liked = res?.postMember?.like ? res.postMember.like : 0;
            const clapped = res?.postMember?.clap ? res.postMember.clap: 0;

            document.getElementById("liked").innerHTML = liked
            document.getElementById("clapped").innerHTML = clapped
            if(clapped > 0){
                document.getElementById("Capa_1").setAttribute("fill", '#00bea5')
                if(clapped >= 30)
                document.getElementById("Capa_1").setAttribute("fill", "#3b3b3b")
            }

            document.getElementById("Like_1").setAttribute("fill", liked > 0 ? '#00bea5': '#062225')
        }
        xhttp.open("GET", getUrl);
        xhttp.send();
    }
    else{
        document.getElementById("like-clap").setAttribute("display", "none")
    }
        function clap(){
            console.log($('.clap-alert'))
            if(!TechFiIntegrationBaseURL) return;
            const postURL = TechFiIntegrationBaseURL + "/posts/clap"
            const api = new XMLHttpRequest();


            api.onload = function(){
                res = JSON.parse(this.responseText)
                const clap = res?.postInfo?.clap;
                const clapped = res?.postMember?.clap;
                if(clapped){
                    document.getElementById("clapped").innerHTML = clapped

                    if(clapped > 0){
                        document.getElementById("Capa_1").setAttribute("fill", '#00bea5')
                        if(clapped >= 30)
                    document.getElementById("Capa_1").setAttribute("fill", "#3b3b3b")
                    }
                }
                if(clap)
                    document.getElementById("clap-num").innerHTML = clap
            }
            api.open("POST", postURL)
            api.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            api.send(`postId=${postId}&userId=${userId}`)
        }
        function like(){
            if(!TechFiIntegrationBaseURL) return;
            const postURL = TechFiIntegrationBaseURL + "/posts/like"
            console.log(postURL)
            const api = new XMLHttpRequest();

            api.onload = function(){
                res = JSON.parse(this.responseText)
                const like = res?.postInfo?.like;
                const liked = res?.postMember?.like;
                if(liked !== undefined){
                    document.getElementById("liked").innerHTML = liked

                    document.getElementById("Like_1").setAttribute("fill", liked > 0 ? '#00bea5': '#062225')
                }
                if(like !== undefined)
                    document.getElementById("like-num").innerHTML = like
            }
            api.open("POST", postURL, true)

            api.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            api.send(`postId=${postId}&userId=${userId}`)
        }
