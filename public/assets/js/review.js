function WriteReview(){
    (async () => {const { value1: text, value: file} = await Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
          accept: 'image/*',
          'aria-label': 'Upload your profile picture'
        }
      })
      
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          Swal.fire({
            title: 'Your uploaded picture',
            imageUrl: e.target.result,
            imageAlt: 'The uploaded picture'
          })
        }
        reader.readAsDataURL(file)
      }
    })()
}    
        
$(function() {
$(".my-rating-1").starRating({
    starSize: 15,
    readOnly: true,
    initialRating: 4,
});
$(".my-rating-2").starRating({
    starSize: 15,
    readOnly: true,
    initialRating: 4,
});
$(".my-rating-3").starRating({
    starSize: 15,
    readOnly: true,
    initialRating: 4,
});
$(".my-rating-4").starRating({
    starSize: 15,
    readOnly: true,
    initialRating: 4,
});
$(".my-rating-5").starRating({
    starSize: 15,
    readOnly: true,
    initialRating: 4,
});
});