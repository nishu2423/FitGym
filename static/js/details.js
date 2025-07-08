// let gigId;
// window.onload = async () => {
// 	gigId = location.href.split('?')[1].split('=')[1];
// 	let data = await myGET("GET", `/details/${gigId}`);
// 	document.getElementById('feature-left').innerHTML = ` <img src="${data.Images[0]}" alt="" style="border-radius: 23px;">`
// 	document.getElementById('desc').innerText = data.discription;
// 	document.getElementById('gigName').innerText = data.Name;
// 	document.getElementsByClassName('box_4')[0].innerText = data.price;
// 	document.getElementsByClassName('box_1')[0].innerText = data.Rating ? data.Rating : "Unrated";
// 	document.getElementsByClassName('box_2')[0].innerText = data.NumberRates ? data.NumberRates : 0;
// 	document.getElementsByClassName('box_3')[0].innerText += data.Trainer ? data.Trainer.username : "Owner";
// 	document.getElementById('shop_btn').innerHTML = data.isBuy ?
// 		`<div id="ratingDiv">
//       <div class="rate" id="rateValue">
//         <div onclick="rateGig(1,'${data._id}')" class="stars">★</div>
//         <div onclick="rateGig(2,'${data._id}')" class="stars">★</div>
//         <div onclick="rateGig(3,'${data._id}')" class="stars">★</div>
//         <div onclick="rateGig(4,'${data._id}')" class="stars">★</div>
//         <div onclick="rateGig(5,'${data._id}')" class="stars">★</div>
//       </div> 
//     </div>` : `<button class="shop" onclick=(checkOUtHandler(${data.price}))>Pay</button>`;

// 	data.Images.map(img => {
// 		document.getElementById('extra_img').innerHTML += `<div class="col-lg-4" style="margin-bottom:20px">
// 		<img src="${img}" alt="" style="border-radius: 23px; margin-bottom: 30px; margin-top: 30px; height:100%;">
// 	  </div>`
// 	})


// 	let rdata = await LoadRecomendationGig(data.Tags);
// 	rdata.map(async data2 => {
// 		gig = await myGET("GET", `/gig/${data2[0]}`);
// 		document.getElementById('reconmondGigs').innerHTML += `<div class="col-lg-6" style="width:23%;margin:2px;border:2px solid #69515159;border-radius:10px" onclick="window.open('/details?gigId=${gig._id}','_self')">
// 		<div class="item">
// 		  <img src="${gig.Images[0]}" alt="" class="templatemo-item" style="border-radius:4px;margin-top:12px;">
// 		  <h4>${gig.Name}</h4>
// 		  <ul syle="right:15px">
// 		  <li><i class="fa fa-star"></i><span>${gig.Rating ? gig.Rating : "Unrated"}</span></li>
// 		</ul>
// 		</div>
// 	  </div>`
// 	})
// }


// let rateVale;
// const rateGig = (num, id) => {
// 	rateVale = num;
// 	let stars = document.getElementById('rateValue');
// 	let RateDiv = document.getElementById('ratingDiv')
// 	for (let i = 0; i < 5; i++) {
// 		stars.children[i].style.color = 'white';
// 	}
// 	for (let i = 0; i < num; i++) {
// 		stars.children[i].style.color = 'yellow';
// 	}
// 	myGET('POST', `/rating/${id}`, { rating: num }).then(() => {
// 		RateDiv.style.display = none;
// 	}).catch((err) => {
// 		console.log(err);
// 	});
// }

// const LoadRecomendationGig = async (tags) => {
// 	return new Promise(async (Resolve, Reject) => {
// 		if (tags.length) {
// 			tags = tags.join(',');

// 			let data = await myGET("POST", `/recomendGigs`, { tags: tags });
// 			Resolve(data);
// 		}
// 	})
// }

// const checkOUtHandler = async (price) => {
// 	let boxBtn = document.getElementById('shop_btn')
// 	boxBtn.innerHTML = '<div class="loading_circle"><i class="fas fa-spinner"></i></div>'
// 	boxBtn.setAttribute('disabled', true)
// 	let { order, user } = await myGET("GET", `/checkout?amount=${price}`);
// 	const options = {
// 		key: "rzp_test_SpyXGeFpXSzX3p",
// 		amount: order.amount,
// 		currency: "INR",
// 		name: "FitGym",
// 		description: "Gigs provide By Trainer",
// 		// image: "",
// 		order_id: order.id,
// 		callback_url: `http://localhost:5000/paymentverification?gigId=${gigId}`,
// 		prefill: {
// 			name: `${user.username}`,
// 			email: `${user.email}`,
// 			contact: "9999999999"
// 		},
// 		notes: {
// 			"address": "Razorpay Corporate Office"
// 		},
// 		theme: {
// 			"color": "#121212"
// 		}
// 	};
// 	const razor = new window.Razorpay(options);
// 	console.log(razor);
// 	razor.open();
// 	setTimeout(() => {
// 		boxBtn.innerHTML = `<button class="shop" onclick=(checkOUtHandler(${price}))>Pay</button>`
// 		boxBtn.removeAttribute("disabled")
// 	}, 2000);
// 	razor.on('payment.failed', function (response) {
// 		alert("Payment Failed");
// 		boxBtn.innerHTML = `<button class="shop" onclick=(checkOUtHandler(${price}))>Pay</button>`
// 		boxBtn.removeAttribute("disabled")
// 		location.reload();
// 	});
// 	razor.on('payment.rejected', function (response) {
// 		alert("payment Rejected");
// 		boxBtn.innerHTML = `<button class="shop" onclick=(checkOUtHandler(${price}))>Pay</button>`
// 		boxBtn.removeAttribute("disabled")
// 		location.reload();
// 	})
// 	razor.on('payment.pending', function (response) {
// 		alert("Payment Rejected");
// 		boxBtn.innerHTML = `<button class="shop" onclick=(checkOUtHandler(${price}))>Pay</button>`
// 		boxBtn.removeAttribute("disabled")
// 		location.reload();
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
// 			if (method === 'GET') {
// 				XML.send();
// 			} else if (method === 'POST') {
// 				XML.send(JSON.stringify(data));
// 			} else {
// 				reject(new Error('Unsupported HTTP method'));
// 			}
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// }



// let ratingbox = document.getElementsByClassName('rate')[0];




///////////////////


let gigId;

window.onload = async () => {
    try {
        const queryString = location.href.split('?')[1];
        if (!queryString) throw new Error('No gig ID provided');
        
        gigId = queryString.split('=')[1];
        if (!gigId) throw new Error('Invalid gig ID');

        let data = await myGET("GET", `/details/${gigId}`);
        if (!data) throw new Error('Failed to load gig details');

        document.getElementById('feature-left').innerHTML = ` <img src="${data.Images?.[0] || ''}" alt="" style="border-radius: 23px;">`;
        document.getElementById('desc').innerText = data.discription || '';
        document.getElementById('gigName').innerText = data.Name || '';
        document.getElementsByClassName('box_4')[0].innerText = data.price || '';
        document.getElementsByClassName('box_1')[0].innerText = data.Rating ? data.Rating : "Unrated";
        document.getElementsByClassName('box_2')[0].innerText = data.NumberRates ? data.NumberRates : 0;
        document.getElementsByClassName('box_3')[0].innerText += data.Trainer ? data.Trainer.username : "Owner";

        document.getElementById('shop_btn').innerHTML = data.isBuy ?
            `<div id="ratingDiv">
                <div class="rate" id="rateValue">
                    <div onclick="rateGig(1,'${data._id}')" class="stars">★</div>
                    <div onclick="rateGig(2,'${data._id}')" class="stars">★</div>
                    <div onclick="rateGig(3,'${data._id}')" class="stars">★</div>
                    <div onclick="rateGig(4,'${data._id}')" class="stars">★</div>
                    <div onclick="rateGig(5,'${data._id}')" class="stars">★</div>
                </div> 
            </div>` : 
            `<button class="shop" onclick="checkOUtHandler(${data.price || 0})">Pay</button>`;

        if (data.Images && data.Images.length) {
            data.Images.forEach(img => {
                document.getElementById('extra_img').innerHTML += `
                    <div class="col-lg-4" style="margin-bottom:20px">
                        <img src="${img}" alt="" style="border-radius: 23px; margin-bottom: 30px; margin-top: 30px; height:100%;">
                    </div>`;
            });
        }

        if (data.Tags && data.Tags.length) {
            let rdata = await LoadRecomendationGig(data.Tags);
            if (rdata && rdata.length) {
                rdata.forEach(async data2 => {
                    try {
                        const gig = await myGET("GET", `/gig/${data2[0]}`);
                        if (gig) {
                            document.getElementById('reconmondGigs').innerHTML += `
                                <div class="col-lg-6" style="width:23%;margin:2px;border:2px solid #69515159;border-radius:10px" onclick="window.open('/details?gigId=${gig._id}','_self')">
                                    <div class="item">
                                        <img src="${gig.Images?.[0] || ''}" alt="" class="templatemo-item" style="border-radius:4px;margin-top:12px;">
                                        <h4>${gig.Name || ''}</h4>
                                        <ul syle="right:15px">
                                            <li><i class="fa fa-star"></i><span>${gig.Rating ? gig.Rating : "Unrated"}</span></li>
                                        </ul>
                                    </div>
                                </div>`;
                        }
                    } catch (err) {
                        console.error('Error loading recommendation:', err);
                    }
                });
            }
        }
    } catch (err) {
        console.error('Error loading gig details:', err);
        alert('Failed to load gig details. Please try again later.');
    }
};

const rateGig = async (num, id) => {
    try {
        rateVale = num;
        let stars = document.getElementById('rateValue');
        let RateDiv = document.getElementById('ratingDiv');
        
        for (let i = 0; i < 5; i++) {
            stars.children[i].style.color = 'white';
        }
        for (let i = 0; i < num; i++) {
            stars.children[i].style.color = 'yellow';
        }
        
        await myGET('POST', `/rating/${id}`, { rating: num });
        if (RateDiv) RateDiv.style.display = 'none';
    } catch (err) {
        console.error('Error rating gig:', err);
        alert('Failed to submit rating. Please try again.');
    }
};

const LoadRecomendationGig = async (tags) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!tags || !tags.length) {
                return resolve([]);
            }
            
            tags = tags.join(',');
            let data = await myGET("POST", `/recomendGigs`, { tags: tags });
            resolve(data || []);
        } catch (err) {
            console.error('Error loading recommendations:', err);
            resolve([]);
        }
    });
};

const checkOUtHandler = async (price) => {
    try {
        let boxBtn = document.getElementById('shop_btn');
        if (!boxBtn) throw new Error('Button not found');
        
        boxBtn.innerHTML = '<div class="loading_circle"><i class="fas fa-spinner"></i></div>';
        boxBtn.setAttribute('disabled', true);
        
        let { order, user } = await myGET("GET", `/checkout?amount=${price}`);
        if (!order || !user) throw new Error('Failed to create order');

        const options = {
            key: process.env.RAZORPAY_KEY || "rzp_test_SpyXGeFpXSzX3p",
            amount: order.amount,
            currency: "INR",
            name: "FitGym",
            description: "Gigs provide By Trainer",
            order_id: order.id,
            callback_url: `${window.location.origin}/paymentverification?gigId=${gigId}`,
            prefill: {
                name: `${user.username}`,
                email: `${user.email}`,
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
        
        razor.on('payment.failed', function (response) {
            alert("Payment Failed");
            resetButton(boxBtn, price);
        });
        
        razor.on('payment.rejected', function (response) {
            alert("Payment Rejected");
            resetButton(boxBtn, price);
        });
        
        razor.on('payment.pending', function (response) {
            alert("Payment Pending");
            resetButton(boxBtn, price);
        });

        setTimeout(() => {
            resetButton(boxBtn, price);
        }, 2000);
    } catch (err) {
        console.error('Checkout error:', err);
        alert('Failed to initiate payment. Please try again.');
    }
};

function resetButton(btn, price) {
    if (btn) {
        btn.innerHTML = `<button class="shop" onclick="checkOUtHandler(${price})">Pay</button>`;
        btn.removeAttribute("disabled");
    }
}

const myGET = (method, url, data) => {
    return new Promise((resolve, reject) => {
        try {
            let XML = new XMLHttpRequest();
            XML.open(method, url);
            XML.setRequestHeader('Content-Type', 'application/json');
            XML.onload = (e) => {
                try {
                    let data = JSON.parse(e.target.response);
                    resolve(data);
                } catch (err) {
                    reject(new Error('Invalid response'));
                }
            };
            XML.onerror = (err) => {
                reject(err);
            };
            if (method === 'GET') {
                XML.send();
            } else if (method === 'POST') {
                XML.send(JSON.stringify(data));
            } else {
                reject(new Error('Unsupported HTTP method'));
            }
        } catch (err) {
            reject(err);
        }
    });
};

let ratingbox = document.getElementsByClassName('rate')[0];