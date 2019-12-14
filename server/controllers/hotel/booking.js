const hotelbookModel = require('../../models/hotel-booking');

exports.getIndex = (req, res) =>
	res.render('hotel_booking/hotel-booking', {
		pageTitle: 'TravelAloha - Hotel Booking',
		user: req.user
		//Hoteldetail: req.detail
		// if(req.user == null) ??{}
		// pop up (Do you want to register ? to get promotion )
		//
	});

exports.getPayment = (req, res) => {
	// request ไปกรอกข้อมูล //
	res.render('hotel_booking/hotel-booking-payment', {
		pageTitle: 'TravelAloha - Review and Payment',
		user: req.user,
		hotelData: {}
	});
};

exports.postIndex = (req, res) => {
	// const result = JSON.stringify({
	// 	inputFirstName: req.body.inputFirstName,
	// 	inputLastName: req.body.inputLastName,
	// 	inputEmail: req.body.inputEmail,
	// 	inputPhoneNo: req.body.inputPhoneNo
	// });

	// console.log(JSON.parse(result));
	// res.send(result);

	const result = {
		inputFirstName: req.body.inputFirstName,
		inputLastName: req.body.inputLastName,
		inputEmail: req.body.inputEmail,
		inputPhoneNo: req.body.inputPhoneNo,
		stayDuration: req.body.stayDuration,
		checkInDate: new Date(req.body.checkInDate),
		checkOutDate: new Date(req.body.checkOutDate),
		roomType: req.body.roomType,
		reservedRoomCount: req.body.reservedRoomCount,
		hotelID: req.body.hotelID,
		roomID: req.body.roomID,
		hotelName: req.body.hotelName,
		hotelFullPrice: req.body.hotelFullPrice,
		hotelSalePrice: req.body.hotelSalePrice
	};

	res.render('hotel_booking/hotel-booking-payment', {
		pageTitle: 'TravelAloha - Hotel - Payment',
		user: req.user,
		hotelData: result
	});

	// res.redirect('/hotel-booking/payment')
};

exports.postReviewForm = (req, res) => {
	const result = {
		inputFirstName: req.body.inputFirstName,
		inputLastName: req.body.inputLastName,
		inputEmail: req.body.inputEmail,
		inputPhoneNo: req.body.inputPhoneNo,
		checkInDate: new Date(req.body.checkInDate),
		checkOutDate: new Date(req.body.checkOutDate),
		hotelID: req.body.hotelID,
		roomID: req.body.roomID,
		hotelFullPrice: req.body.hotelFullPrice,
		hotelSalePrice: req.body.hotelSalePrice
	};

	res.render('/payment/checkout', {
		pageTitle: 'TravelAloha - Hotel - Checkout',
		user: req.user,
		hotelData: result
	})
};


exports.postConfirm = (req, res) => {
	const reqBookingDetail = [
		req.body.inputFirstName,
		req.body.inputLastName,
		req.body.inputEmail,
		req.body.inputPhoneNo,
		req.user.user_id,
		new Date(req.body.checkInDate),
		new Date(req.body.checkOutDate),
		req.body.hotelID,
		req.body.roomID,
		req.body.hotelFullPrice,
		req.body.hotelSalePrice
	];
	const insertbook = async () => { 
		return await hotelbookModel.insertBooking(reqBookingDetail) 
	};
	console.log(insertbook)
	res.send(insertbook[0]());
	//   res.redirect('/checkout')

};
//Probably needed in controller dont mind these comment
// no idea...
// no idea...
// no idea...
// received form from booking form
// if no register, popup some register promote
