/***********************************************************
source code copy right by satish nakinaboina
************************************************************/
const constants = {};
const NCA = [];

constants.apiUrls = {
    baseUrl: 'http://localhost/news/index.php/api',
    collection: "https://api.jsonbin.io/b/625543307b69e806cf4c5001",
    landing: "https://api.jsonbin.io/b/625528ccd20ace068f970527",
    collectiontype: "landing"
};

NCA.main = {
    init: function() {
        this.getLanding();
    },
    getLanding: function() {
        this.onLine();this.loader();
        //call landing api
		landing(constants.apiUrls.landing).then(data => {
				console.log(data);
				if (data.length > 0) {
					document.getElementById('loader').innerHTML = '';
				}
				data.map(element => {
					if (element.collectiontype === constants.apiUrls.collectiontype) {
						let _id = element.collectionid;
						this.getStories(_id);
					}
				});
			}).catch(error => {
				console.log(error)
			});
    },
    getStories: function(_id) {
        this.onLine();
        let bottomContent = ''; this.loader();
        landing(constants.apiUrls.collection).then(response => { //
			document.getElementById('loader').innerHTML = '';
            response.forEach(function(value, i) {
                let url = value.Imageurl;
                let intro = value.Intro;
                let title = value.Title;
                let published = value.Published;
                if (i === 0) {
                    document.getElementById('initialheading').innerHTML = `<span class="icon"><img src="img/plus.png" class="valgn" alt="plus" /></span>${value.Title}`;
                    document.getElementById('initialintro').innerHTML = value.Intro;
                    let image = document.createElement("img");
                    image.src = value.Imageurl;
                    image.class = "img-fluid initialimg";
                    let initialimge = document.getElementById("initialimg");
                    initialimge.appendChild(image);
                    document.getElementById('published').innerHTML = '<span class="icon"><i class="far pl10 fa-clock"></i>' + published + ' <i class="far pl10 fa-comment-alt"></i></span>';
                } else if (intro != '') {
                    bottomContent += `<div class="thumbimage"><img src="${url}" class="img-fluid" alt="Responsive image"></div><div class="content mainheading"><h3> <span class="icon"><img src="img/plus.png" class="valgn" alt="plus" /></span></span>${title}</h3><P class="f22">${intro}</P></div><div class="fticon"><span class="icon"><i class="far pl10 fa-clock"></i>${published} <i class="far pl10 fa-comment-alt"></i>1</span></div><div class="hrline"></div>`;
                } else {
                    bottomContent += `<div class="mainthumb"><div class="sthumb"><div class="thumbleft"><div class="content">
										<h3 class="fhead"><span class="icon"><img src="img/plus.png" class="titleimg" alt="plus" /></span></span>${title}</h3>
										</div></div><div class="thumbright">
										<div class="thumbimage headimgr"><img src="${url}" class="img-fluid" alt="Responsive image"></div>
										</div></div><div class="fticonthumb"><span class="icon"><i class="far pl10 fa-clock "></i>${published}</span></div></div>
									 <div class="hrline"></div>`;
                }
                document.getElementById('lsecesion2').innerHTML = bottomContent;
            });
        });
    },
    onLine: function() {
        if (!navigator.onLine) {
            document.getElementById('body').innerHTML = '<div class="text-center _center"><img src="img/offline.jpg" alt="offline" /><h3 class="offh3">You are currently offline</h3></div>';
        }
    },
	loader : function(){
		document.getElementById('loader').innerHTML = '<div class="text-center"><div class="spinner">Loading...</div><p class="decor-content">Please wait while loading, we appreciate your patience</p></div>';
	}
};
NCA.main.init();

//load landing api 
function landing(url) {
       return fetch(url)
            .then(response => response.json())
            .then(msg => {
                return msg;
            })
            .catch((error) => {
                console.log('something went wrong')
            });
}