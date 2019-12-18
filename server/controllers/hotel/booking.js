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

};

// didnt use this function
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


exports.postConfirm = async (req, res) => {
	const reqBookingDetail = [
		req.body.inputFirstName,
		req.body.inputLastName,
		req.body.inputEmail,
		req.body.inputPhoneNo,
		(req.user ? req.user.user_id : null),
		new Date(req.body.checkInDate),
		new Date(req.body.checkOutDate),
		req.body.hotelID,
		req.body.roomID,
		req.body.hotelFullPrice,
		req.body.hotelSalePrice
	];
	let resultInsertBooking = await hotelbookModel.insertBooking(reqBookingDetail);
	let resultSession = req.session;
	resultSession.bookingID = resultInsertBooking;
	req.bookingID = resultInsertBooking;
	res.redirect('/checkout');

};