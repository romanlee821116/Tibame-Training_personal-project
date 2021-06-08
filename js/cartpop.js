// 
//
// $('.popcartbtn').click(function(e){
//   $('.cartpop').toggleClass('cartpopshow')
//   $('.fa-shopping-cart').toggleClass('popcartbtn-clicked');
//   event.preventDefault();
//   event.stopPropagation();
//   console.log('hi')
// })

// $('.cartpop').focusout(function(){
//   // $('.cartpop').fadeToggle(500);
//   $('.cartpop').removeClass('cartpopshow')
//   $('.fa-shopping-cart').removeClass('popcartbtn-clicked');
//   // $('.fa-shopping-cart').css({'color':'red'});
//   event.preventDefault();
//   console.log('out')
// })

// cartpopitem
// $('.fa-times').click(function(){
//   var CartItemNum = $('.cartpop-item').length;
//   var yes = confirm('確定刪除此產品?');
//   if(yes){
//   $(this).closest('.cartpop-item').remove();
//   $('#cartpop-itmenum').text(CartItemNum-1);
//   event.stopPropagation();
//   }
// })
//

// $('.product-banner').click(function(){
//   $('.cartpop').removeClass('cartpopshow');
//   $('.fa-shopping-cart').removeClass('popcartbtn-clicked');
// })





// $('.wrap').click(function() {
//     if($('.cartpop').hasClass('cartpopshow')){
//       console.log('true');
//     }
// });

// $('.wrap').click(function (e) {
//     var container =$(".cartpop");
//     if (!container.is(e.target) && container.has(e.target).length === 0) {
//        container.removeClass('cartpopshow');
//        $('.fa-shopping-cart').removeClass('popcartbtn-clicked');
//        console.log('test')
//     }
// });
