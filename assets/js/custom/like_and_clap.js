const postId = document.getElementById("postId").innerHTML
const userId = document.getElementById("userId").innerHTML

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
                document.getElementById("Capa_1").setAttribute("fill", '#006e0b')
                if(clapped >= 30)
                document.getElementById("Capa_1").setAttribute("fill", "#3b3b3b")
            }
            document.getElementById("Layer_1").setAttribute("fill", liked > 0 ? '#006e0b': 'gray')
        }
        xhttp.open("GET", getUrl);
        xhttp.send();
    }
        function clap(){
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
                        document.getElementById("Capa_1").setAttribute("fill", '#006e0b')
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
                    
                    document.getElementById("Layer_1").setAttribute("fill", liked > 0 ? '#006e0b': 'gray')
                }
                if(like !== undefined)
                    document.getElementById("like-num").innerHTML = like
            }
            api.open("POST", postURL, true)

            api.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            api.send(`postId=${postId}&userId=${userId}`)
        }