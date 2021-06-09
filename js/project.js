document.addEventListener('DOMContentLoaded', function(){
  console.log('progect-running');
  get_tasks();
})
// 購物車功能
// 產品數量減少
document.addEventListener('click', function(e){
  if(e.target.closest('.minus')){
    // console.log('plus run')
    let this_name = e.target.closest('.cartpop-item').querySelector('.item_name').innerText;
    let span = e.target.closest('.minus').nextElementSibling;
    let this_price = e.target.closest('.cartpop-item-txt').querySelector('.cost').getAttribute('data-id');
    let current_total = document.querySelector('.cartpop-total').innerText;
    let final_total = parseInt(current_total) - parseInt(this_price);
    // let header_itemnum = parseInt(document.getElementById('cartpop-itmenum').innerText);
    let totalamout = document.querySelector('.totalamout');
    console.log(totalamout.innerHTML)

    if(parseInt(span.innerText)>1){  //若產品數量大於一
      span.innerText = parseInt(span.innerText) - 1;
      document.querySelector('.cartpop-total').innerText = final_total;  //購物車總金額更新
      // document.getElementById('cartpop-itmenum').innerText = header_itemnum -1;
      let span_total = document.getElementsByClassName('buynum');
      for(let i = 0 ; i<span_total.length; i++){
        if(span_total[i].closest('.cartpop-item').querySelector('.item_name').innerText == this_name){
          span_total[i].innerHTML = span.innerText;
        };
      }
      if(totalamout){
        document.querySelector('.totalamout').innerHTML = '$' + `${final_total}`;
      }

      //更新localstorage
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach((item, i) => {
        if(item.item_name == this_name){
          tasks[i].item_num = parseInt(span.innerText);
          tasks[i].item_total = parseInt(span.innerText) * parseInt(this_price);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
})

// 產品數量增加
document.addEventListener('click', function(e){
  if(e.target.closest('.plus')){
    console.log('plus run');
    // console.log(e);
    let this_name = e.target.closest('.cartpop-item').querySelector('.item_name').innerText;
    let span = e.target.closest('.plus').previousElementSibling;
    let this_price = e.target.closest('.cartpop-item-txt').querySelector('.cost').getAttribute('data-id');
    let current_total = document.querySelector('.cartpop-total').innerText;
    let final_total = parseInt(current_total) + parseInt(this_price);
    // let header_itemnum = parseInt(document.getElementById('cartpop-itmenum').innerText);
    let totalamout = document.querySelector('.totalamout');
    // console.log('current'+current_total);
    // console.log('final='+final_total);
    span.innerText = parseInt(span.innerText) + 1;
    let span_total = document.getElementsByClassName('buynum');
    for(let i = 0 ; i<span_total.length; i++){    //更新產品數量
      if(span_total[i].closest('.cartpop-item').querySelector('.item_name').innerText == this_name){
        span_total[i].innerHTML = span.innerText;
      };
    }

    document.querySelector('.cartpop-total').innerText = final_total;
    // document.getElementById('cartpop-itmenum').innerText = header_itemnum + 1;
    if(totalamout){
      document.querySelector('.totalamout').innerHTML = '$' + `${final_total}`;
    }

    //更新localstorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((item, i) => {
      if(item.item_name == this_name){
        tasks[i].item_num = parseInt(span.innerText);
        tasks[i].item_total = parseInt(span.innerText) * parseInt(this_price);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
//產品詳細窗更新==================================================================
let buy_item_list =[];
document.addEventListener('click', function(e){
  if(e.target.closest('div').classList.contains('add-to-cart')){
    let item_name = e.target.closest('.product-details-txt').querySelector('.item_name').innerText;
    let item_value = e.target.closest('.product-details-txt').querySelector('.cost').getAttribute('data-id');
    let item_num = e.target.closest('.product-details-txt').querySelector('#buynum').innerText;
    let item_img = e.target.closest('.product-details').querySelector('.img').getAttribute('src');
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if(buy_item_list.indexOf(item_name) == -1){
      window.scrollTo({top: 0, right: 0, behavior: 'smooth'});
      // document.getElementById('cartpop-itmenum').innerText = header_itemnum + 1;
      let current_total = document.querySelector('.cartpop-total').innerText;
      // 購物車div
        let cart_div = `
        <div class="cartpop-item">
          <div class="cartpop-item-pic">
            <img src="${item_img}" alt="">
          </div>
          <div class="cartpop-item-txt">
            <h4 class='item_name'>${item_name}</h4>
            <h4>$${item_value}</h4>
            <p class='cost' data-id='${item_value}'>$${item_value}</p>
            <div class="cartpop-item-txt-num">
              <button type="button" name="button" class='minus'><i class="fas fa-minus"></i></button>
              <span class='buynum'>${item_num}</span>
              <button type="button" name="button" class='plus'><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="cartpop-remove">
            <button type="button" name="button" class='cartpop-remove-btn'><i class="fas fa-times-circle"></i></button>
          </div>
        </div>
        `
        let cartpop_itemlist = document.getElementById('cartpop-itemlist');
        cartpop_itemlist.insertAdjacentHTML('afterbegin', cart_div);
        buy_item_list.push(item_name);
        let final_total =  parseInt(current_total) + parseInt(item_value)*parseInt(item_num);
        console.log(final_total);
        //更新總金額
        document.querySelector('.cartpop-total').innerText = final_total
      // 儲存至localstorage
        let task = {
          'item_name' : item_name,
          'item_price' : item_value,
          'item_img' : item_img,
          'item_num' : item_num,
          'item_total' : item_value,
        };
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
          tasks.unshift(task);
        }else{
          tasks = [task];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      window.alert('This item is already in shopping cart');
    }
    e.preventDefault();
  }
})


// 產品刪除總金額更新==============================================================
document.addEventListener('click', function(e){
  if(e.target.classList.contains('fa-times-circle')){
    console.log('del run');
    

    let current_total = document.querySelector('.cartpop-total').innerText;
    let this_name = e.target.closest('.cartpop-item').querySelector('.item_name').innerText;
    let this_price = e.target.closest('.cartpop-item').querySelector('.cost').getAttribute('data-id');
    let span = e.target.closest('.cartpop-item').querySelector('.buynum').innerText;
    let remove_final = parseInt(span)*parseInt(this_price);
    // let header_itemnum = parseInt(document.getElementById('cartpop-itmenum').innerText);
    let totalamout = document.querySelector('.totalamout');
    let deletitem = document.querySelectorAll('.cartpop-item');
    
    // 開始做事
    if(confirm('Sure to delete this item?') == true){
      buy_item_list.forEach(function(item, index, arr){
        if(item == this_name){
          arr.splice(index, 1);
        }
      })
      document.querySelector('.cartpop-total').innerText = parseInt(current_total) - remove_final;
      deletitem.forEach((item, i) => {
        if(item.querySelector('.item_name').innerText ==  this_name){
          deletitem[i].remove();
        }
      });
      // e.target.closest('.cartpop-item').remove();
      let totalamout = document.querySelector('.totalamout');
      if(totalamout){
        document.querySelector('.totalamout').innerHTML = '$' + `${parseInt(current_total) - remove_final}`;
      }
      //localstorage更新
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      let update_tasks=[];
      tasks.forEach((item, i) => {
        if(item.item_name != this_name){
          update_tasks.push(item);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(update_tasks));

    };
  }
})

// 購物車新增================================================================

$('i.fa-cart-plus').click(function(e){
  $('div.cartpop').addClass('cartpopshow');
  $('i.fa-shopping-cart').addClass('popcartbtn-clicked');

  let item_name = e.target.nextElementSibling.innerHTML;
  let item_value = e.target.closest('.p1').getAttribute('data-id');
  let item_img = e.target.closest('.p1').querySelector('img').getAttribute('src');
  // let header_itemnum = parseInt(document.getElementById('cartpop-itmenum').innerText);
  let item_num = 1;
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  



    if(buy_item_list.indexOf(item_name) == -1){
      window.scrollTo({top: 0, right: 0, behavior: 'smooth'});
      // document.getElementById('cartpop-itmenum').innerText = header_itemnum + 1;
      let current_total = document.querySelector('.cartpop-total').innerText;
      // 購物車div
        let cart_div = `
        <div class="cartpop-item">
          <div class="cartpop-item-pic">
            <img src="${item_img}" alt="">
          </div>
          <div class="cartpop-item-txt">
            <h4 class='item_name'>${item_name}</h4>
            <h4>$${item_value}</h4>
            <p class='cost' data-id='${item_value}'>$${item_value}</p>
            <div class="cartpop-item-txt-num">
              <button type="button" name="button" class='minus'><i class="fas fa-minus"></i></button>
              <span class='buynum'>${item_num}</span>
              <button type="button" name="button" class='plus'><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="cartpop-remove">
            <button type="button" name="button" class='cartpop-remove-btn'><i class="fas fa-times-circle"></i></button>
          </div>
        </div>
        `
        let cartpop_itemlist = document.getElementById('cartpop-itemlist');
        cartpop_itemlist.insertAdjacentHTML('afterbegin', cart_div);
        buy_item_list.push(item_name);
        let final_total =  parseInt(current_total) + parseInt(item_value);
        console.log(final_total);
        //更新總金額
        document.querySelector('.cartpop-total').innerText = final_total
      // 儲存至localstorage
        let task = {
          'item_name' : item_name,
          'item_price' : item_value,
          'item_img' : item_img,
          'item_num' : item_num,
          'item_total' : item_value,
        };
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
          tasks.unshift(task);
        }else{
          tasks = [task];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      window.alert('This item is already in shopping cart');
    }
})
//lego更新=============================================================
let legonum = 1;
$('#lego_add_cart').click(function(e){

  $('.legoconfirm').css({'display':'none'});
  $('.lego-whitebg').css({'display':'none'});
  $('div.cartpop').addClass('cartpopshow');
  $('i.fa-shopping-cart').addClass('popcartbtn-clicked');

  let item_name = `Custom Lego Figure-${legonum}`;
  let item_value = 2000;
  let item_img = '../pic/completelego.jpg';
  // let header_itemnum = parseInt(document.getElementById('cartpop-itmenum').innerText);
  let item_num = 1;
  // console.log(buy_item_list);
  // console.log(item_name);
    if(buy_item_list.indexOf(item_name) == -1){
      legonum +=1;
      window.scrollTo({top: 0, right: 0, behavior: 'smooth'});
      // document.getElementById('cartpop-itmenum').innerText = header_itemnum + 1;
      let current_total = document.querySelector('.cartpop-total').innerText;
      // 購物車div
        let cart_div = `
        <div class="cartpop-item">
          <div class="cartpop-item-pic">
            <img src="${item_img}" alt="">
          </div>
          <div class="cartpop-item-txt">
            <h4 class='item_name'>${item_name}</h4>
            <h4>$${item_value}</h4>
            <p class='cost' data-id='${item_value}'>$${item_value}</p>
            <div class="cartpop-item-txt-num">
              <button type="button" name="button" class='minus'><i class="fas fa-minus"></i></button>
              <span class='buynum'>${item_num}</span>
              <button type="button" name="button" class='plus'><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <div class="cartpop-remove">
            <button type="button" name="button" class='cartpop-remove-btn'><i class="fas fa-times-circle"></i></button>
          </div>
        </div>
        `
        let cartpop_itemlist = document.getElementById('cartpop-itemlist');
        cartpop_itemlist.insertAdjacentHTML('afterbegin', cart_div);
        buy_item_list.push(item_name);
        let final_total =  parseInt(current_total) + parseInt(item_value);
        console.log(final_total);
        //更新總金額
        document.querySelector('.cartpop-total').innerText = final_total
      // 儲存至localstorage
        let task = {
          'item_name' : item_name,
          'item_price' : item_value,
          'item_img' : item_img,
          'item_num' : item_num,
          'item_total' : item_value,
        };
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
          tasks.unshift(task);
        }else{
          tasks = [task];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      window.alert('This item is already in shopping cart');
    }
})
//更新取值=============================================================
function get_tasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let cartpop_itemlist = document.getElementById('cartpop-itemlist');
  let cart_productinfo = document.getElementById('cart-productinfo');
  let current_total = 0;
  if(tasks){
    let list_content = '';
    tasks.forEach((item, i) => {
      current_total += parseInt(item.item_total);
      list_content +=`
      <div class="cartpop-item">
        <div class="cartpop-item-pic">
          <img src="${item.item_img}" alt="">
        </div>
        <div class="cartpop-item-txt">
          <h4 class='item_name'>${item.item_name}</h4>
          <h4>$${item.item_price}</h4>
          <p class='cost' data-id='${item.item_price}'>$${item.item_price}</p>
          <div class="cartpop-item-txt-num">
            <button type="button" name="button" class='minus'><i class="fas fa-minus"></i></button>
            <span class='buynum'>${item.item_num}</span>
            <button type="button" name="button" class='plus'><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="cartpop-remove">
          <button type="button" name="button" class='cartpop-remove-btn'><i class="fas fa-times-circle"></i></button>
        </div>
      </div>
      `;
    });

    document.querySelector('.cartpop-total').innerHTML = current_total;
    cartpop_itemlist.innerHTML = list_content;

    if(cart_productinfo){
      console.log('in product page now');
      cart_productinfo.innerHTML = list_content;
      document.querySelector('.totalamout').innerHTML = '$' + `${current_total}`;
      let finalamount = document.querySelector('.finalamount');
      if(finalamount){
        
        document.querySelector('.totalamout-1').innerHTML = '$' + `${parseInt(current_total)+120}`;
        document.querySelector('.finalamount').innerHTML = '$' +`${parseInt(current_total)+120}`;
        $('.discount_btn').on('click', function(e){
          // console.log($('.cart2-discount-num'))
          if($('.cart2-discount-num').length==0){
            let cart2_shipping_num = document.getElementsByClassName('cart2-shipping-num')[0];
            let text = `<div class ='cart2-discount-num'>
              <h4>DISCOUNT</h4>
              <p> -$${parseInt(current_total)*0.1}</p>
              <a href="#"  class='cart2-removedisc'>Remove Discount</a>
            </div>
            `;
            cart2_shipping_num.insertAdjacentHTML('afterend', text);
            document.querySelector('.finalamount').innerHTML = '$' +`${parseInt(current_total)+120-parseInt(current_total)*0.1}`;
          }
        });
        //discount移除
      };
      document.addEventListener('click', function(e){
        if(e.target.classList.contains('cart2-removedisc')){
          $('.cart2-discount-num').remove();
          document.querySelector('.finalamount').innerHTML = '$' +`${parseInt(current_total)+120}`;
          event.preventDefault();
        }
      })
    };

  }
}
//
// 購物車遮罩================================================
$(".policybtn").click(function(){
  if($(".policybtn").prop("checked")){
    $('.checkoutblock').css({'display':'none'});
  } else {
    $('.checkoutblock').css({'display':'block'});
  }
})

// 購物車跳窗
$('.popcartbtn').click(function(e){
  $('.cartpop').toggleClass('cartpopshow');
  $('.fa-shopping-cart').toggleClass('popcartbtn-clicked');
  event.preventDefault();
  event.stopPropagation();
})

// 購物車取消
$('.cartpop-close-btn').click(function(){
  $('.cartpop').removeClass('cartpopshow');
  $('.fa-shopping-cart').removeClass('popcartbtn-clicked');
  event.preventDefault();
})

// 點擊其他區域隱藏購物車跳窗
$('.wrap').click(function (e) {
    // console.log(e);
    if(!e.target.classList.contains('fa-cart-plus')){
    var container =$(".cartpop");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
       container.removeClass('cartpopshow');
       $('.fa-shopping-cart').removeClass('popcartbtn-clicked');
    }
    }

});

// express點擊改背景色
$('.googlepay').click(function(){
  $('.googlepay').toggleClass('checked');
  $('.googlepay i').toggleClass('checked');
  $('.paypal').removeClass('checked');
  $('.paypal i').removeClass('checked');
});

$('.paypal').click(function(){
  $('.paypal').toggleClass('checked');
  $('.paypal i').toggleClass('checked');
  $('.googlepay').removeClass('checked');
  $('.googlepay i').removeClass('checked');
});
// RWD

window.onresize = function(){
  if($(window).width()>768){
    $('.cart-right-container').css({'display':'block'});
  }else{
    $('.cart-right-container').slideUp();
  }
}
$('.fa-chevron-down').click(function(){
  $('.cart-right-container').slideToggle();
  $('.fa-chevron-down').toggleClass('-arrowdown');
})

//sing in button更改內容
let signin_btn = document.getElementsByClassName('signin-btn')[0];

document.addEventListener('click', function(e){
  if(e.target.classList.contains('signin-btn')){
    let navbar_signin = $('.fa-search').closest('li').next().find('a');
    window.alert('Login success');
    $('.fa-user').remove();
    navbar_signin.text('ACCOUNT');
  }
})
//創帳號跳轉

document.addEventListener('click', function(e){
  if(e.target.classList.contains('google')){
    window.open('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin');
  }
})
document.addEventListener('click', function(e){
  if(e.target.classList.contains('fb')){
    window.open('https://www.facebook.com/');
  }
})

//cart2 檢查input
document.addEventListener('click', function(e){
  let count = 0;
  if(e.target.classList.contains('cart2-continue')){
    let input_text = document.querySelectorAll("input[type=text]"); 
    let input_radio = document.querySelectorAll("input[type=radio]"); 
    console.log($('.cart2-left input[type=text]').length);
    $('.cart2-left input[type=text]').each(function(){
      let value = $(this).val();
      if(value!=''){
        count +=1;
      }
    })
    //
    if(count==6){
      window.location.href = "../cart3/cart3.html";
    }else{
      window.alert('Please complete all required fields');
      $('.cart2-left input[type=text]').each(function(){
        let value = $(this).val();
        if(value==''){
          $(this).css({'border' : '1.5px solid red'});
          e.preventDefault();
        }
      })
    }
  };  
})

//
document.addEventListener('click', function(e){
  if(e.target.classList.contains('menu-span')){
    // console.log('fre')
    $('div.wrap').toggleClass('freeze');
    $('body').toggleClass('freeze');
  }
})


$('.menu-span').click(function(){
  if(!$('#check').prop('checked')){    
    for(let i =0; i<8; i++){
      let a = document.querySelectorAll('.menuhamburger_li');
      let temp = i;
      setTimeout(function(){
        console.log('run');
        // $('.menuhamburger_li:nth-child('+temp+')').css({'opacity':'1'})
        $('.menuhamburger_li:nth-child('+temp+')').addClass('showli')
      }, 200*(i+1));
    }
  }else{
      // $('.menuhamburger_li').css({'opacity':'0'});    
  }
})
