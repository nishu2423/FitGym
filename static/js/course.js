// window.onload = async () => {

// 	let data=await myGET("GET",'/courses');
// 	let gig=document.getElementById('topRatingGig');
// 	data.map((item)=>{
// 		gig.innerHTML+=`<li onclick="window.open('/details?gigId=${gig._id}','_self')">
// 		<img src="${item.Images[0]}" alt="" class="templatemo-item">
// 		<h4>${item.Name}</h4>
// 		<span><i class="fa fa-star" style="color: yellow;"></i>${item.Rating?item.Rating :'unrated'}</span>
// 		<span><i class="fas fa-shopping-bag"></i> ${item.NumberRates?item.NumberRates:0}</span>
// 		<div class="download">
// 		  <a href="/details?gigId=${item._id}" class="frontLink">shop Now</a>
// 		</div>
// 	  </li>`
// 	})


// 	let featureData=await myGET('GET','/featureGigs');
// 	let featueDiv=document.getElementById('feature');
// 	featureData.map((item)=>{
// 		featueDiv.innerHTML+=`<div class="item" onclick="window.open('/details?gigId=${gig._id}','_self')">
//                     <div class="thumb">
//                       <img src="${item.Images[0]}" alt="">
//                       <div class="hover-effect">
//                         <!-- <h6>2.4K Streaming</h6> -->
//                       </div>
//                     </div>
//                     <<h4>${item.Name}</h4> 
//                     <ul>
//                       <li><i class="fa fa-star"></i> ${item.Rating?item.Rating:'unrated'}</li>
//                       <li><i class="fas fa-shopping-bag"></i> ${item.NumberRates?item.NumberRates:0}</li>
//                     </ul>
//                   </div>`
// 	})


// }

// const loadAllCourse=async()=>{
// 	let data=await myGET("GET",'/Allcourses');
// 	let gig=document.getElementById('topRatingGig');
// 	gig.innerHTML='';
// 	data.map((item)=>{
// 		gig.innerHTML+=`<li>
// 		<img src="${item.Images[0]}" alt="" class="templatemo-item">
// 		<h4>${item.Name}</h4>
// 		<span><i class="fa fa-star" style="color: yellow;"></i>${item.Rating?item.Rating :'unrated'}</span>
// 		<span><i class="fas fa-shopping-bag"></i> ${item.NumberRates?item.NumberRates:0}</span>
// 		<div class="download">
// 		  <a href="/details" class="frontLink">shop Now</a>
// 		</div>
// 	  </li>`
// 	})
// }

// const myGET = (method, url, data) => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let XML = new XMLHttpRequest();
// 			XML.open(method, url);
// 			XML.setRequestHeader('Content-Type', 'application/json');
// 			XML.onload = (e) => {
// 				let data = JSON.parse(e.target.response);
// 				resolve(data);
// 			}
// 			XML.onerror = (err) => {
// 				reject(err);
// 			}
// 			XML.send(JSON.stringify(data));
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// }




////////////////////////////////////



window.onload = async () => {
    try {
        let data = await myGET("GET", '/courses');
        if (!data) throw new Error('Failed to load courses');
        
        let gig = document.getElementById('topRatingGig');
        gig.innerHTML = '';
        
        data.forEach((item) => {
            if (!item || !item._id) return;
            
            gig.innerHTML += `<li onclick="window.open('/details?gigId=${item._id}','_self')">
                <img src="${item.Images?.[0] || ''}" alt="" class="templatemo-item">
                <h4>${item.Name || ''}</h4>
                <span><i class="fa fa-star" style="color: yellow;"></i>${item.Rating ? item.Rating : 'unrated'}</span>
                <span><i class="fas fa-shopping-bag"></i> ${item.NumberRates ? item.NumberRates : 0}</span>
                <div class="download">
                    <a href="/details?gigId=${item._id}" class="frontLink">shop Now</a>
                </div>
            </li>`;
        });

        let featureData = await myGET('GET', '/featureGigs');
        if (!featureData) throw new Error('Failed to load featured gigs');
        
        let featueDiv = document.getElementById('feature');
        featueDiv.innerHTML = '';
        
        featureData.forEach((item) => {
            if (!item || !item._id) return;
            
            featueDiv.innerHTML += `<div class="item" onclick="window.open('/details?gigId=${item._id}','_self')">
                <div class="thumb">
                    <img src="${item.Images?.[0] || ''}" alt="">
                    <div class="hover-effect">
                    </div>
                </div>
                <h4>${item.Name || ''}</h4>
                <ul>
                    <li><i class="fa fa-star"></i> ${item.Rating ? item.Rating : 'unrated'}</li>
                    <li><i class="fas fa-shopping-bag"></i> ${item.NumberRates ? item.NumberRates : 0}</li>
                </ul>
            </div>`;
        });
    } catch (err) {
        console.error('Error loading course data:', err);
        alert('Failed to load course data. Please try again later.');
    }
};

const loadAllCourse = async () => {
    try {
        let data = await myGET("GET", '/Allcourses');
        if (!data) throw new Error('Failed to load all courses');
        
        let gig = document.getElementById('topRatingGig');
        gig.innerHTML = '';
        
        data.forEach((item) => {
            if (!item || !item._id) return;
            
            gig.innerHTML += `<li onclick="window.open('/details?gigId=${item._id}','_self')">
                <img src="${item.Images?.[0] || ''}" alt="" class="templatemo-item">
                <h4>${item.Name || ''}</h4>
                <span><i class="fa fa-star" style="color: yellow;"></i>${item.Rating ? item.Rating : 'unrated'}</span>
                <span><i class="fas fa-shopping-bag"></i> ${item.NumberRates ? item.NumberRates : 0}</span>
                <div class="download">
                    <a href="/details?gigId=${item._id}" class="frontLink">shop Now</a>
                </div>
            </li>`;
        });
    } catch (err) {
        console.error('Error loading all courses:', err);
        alert('Failed to load all courses. Please try again later.');
    }
};

const myGET = (method, url, data) => {
    return new Promise((resolve, reject) => {
        try {
            let XML = new XMLHttpRequest();
            XML.open(method, url);
            XML.setRequestHeader('Content-Type', 'application/json');
            XML.onload = (e) => {
                if (e.target.status >= 200 && e.target.status < 300) {
                    try {
                        let data = JSON.parse(e.target.response);
                        resolve(data);
                    } catch (err) {
                        reject(new Error('Invalid JSON response'));
                    }
                } else {
                    reject(new Error(`Request failed with status ${e.target.status}`));
                }
            };
            XML.onerror = () => {
                reject(new Error('Network error'));
            };
            XML.send(data ? JSON.stringify(data) : null);
        } catch (err) {
            reject(err);
        }
    });
};
