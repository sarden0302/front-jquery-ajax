$(document).ready(function () {
    $("#login-button").click(function() {
        const username = $("#username").val();
        const password = $("#password").val();

        $.ajax({
            url: "https://fakestoreapi.com/auth/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(data) {
                alert("로그인 성공!");
                console.log(data);
                // 로그인 성공 시 hidden class 삭제
                // category-buttons, product=container
                $('#category-buttons').removeClass('hidden');
                $('#product-container').removeClass('hidden');
                $('#login-form').removeClass('hidden').addClass('hidden');

                // 로그인 성공할 경우 hidden class 추가
                // login-form
            },
            error : function() {
                alert("로그인 실패!");
                $('#category-buttons').removeClass('hidden').addClass('hidden');
                $('#product-container').removeClass('hidden').addClass('hidden');
                $('#login-form').removeClass('hidden');
            }
        })
    })

    // Load products by category
    function loadProducts(category) {
        console.log("loadProducts category : " + category);
        API_URL = ``;
        if (category === 'all') {
            API_URL = `https://fakestoreapi.com/products`
        } else {
            API_URL = `https://fakestoreapi.com/products/category/${category}`
        }

        $.ajax({
            url : API_URL,
            method : 'GET',
            success: function(data) {
                if (data) {
                    let productInfo = ``;
                    $.each(data, function(index, product) {
                        productInfo += `
                                <div class="card" id="product">
                                    <img src="${product.image}">
                                    <div class="info">
                                        <h3 class="product-title">${product.title}</h3>
                                        <p class="product-description">${product.description.substring(0, 100)}...더보기</p>
                                        <div class="price">${Number((product.price * 1400).toFixed(0)).toLocaleString()}원</div>
                                    </div>
                                </div>
                                `;
                    })
                    $('#product-container').html(productInfo);
                } else {
                    alert('데이터가 비어있습니다.');
                    $('#product-container').html('');
                }
            }, error : function() {
                alert("상품을 불러오는데 실패했습니다.");
            }
        })
    }

    $('#category-buttons button').click(function() {
        const ct = $(this).data("category");
        loadProducts(ct);
        console.log("button click category : " + $(this).data('category'));
    })

})