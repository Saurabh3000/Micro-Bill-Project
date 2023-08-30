$(document).ready(function (){

    var items = [];

    $("#item_form").on("submit", addItemToCart);
    $("#cart_table").on("click", ".btn_danger", removeItemFromCart);
    $("#generate_invoice").on("click", generateInvoice);

    function addItemToCart(event) {
        event.preventDefault();

        var itemName = $("#item_name").val();
        var itemPrice = $("#item_price").val();
        var itemQty = $("#item_qty").val();


        if(itemName == ""){
            alert("Please Enter Item Name");
            return;
        }

        if(itemPrice == ""){
            alert("Please Enter Item Price");
            return;
        }

        if(itemQty == ""){
            alert("Please Enter Item Quantity");
            return;
        }


        if (itemName !== "" && itemPrice !== "" && itemQty !== ""){
        
            var item = {
                name: itemName,
                price: parseFloat(itemPrice),
                qty: parseFloat(itemQty),
                icost: itemPrice*itemQty,
            };

            items.push(item);
            $("#cart_table").append(
                "<tr><td>" + item.name + "</td><td>" + item.price.toFixed(2) + "</td><td>" + item.qty +"</td><td>" + item.icost +'</td><td><button class="btn_danger"><i class="trash_list"></i></button></td></tr>'
            );

            updateTotalCost();
            $("#item_name").val("");
            $("#item_price").val("");
            $("#item_qty").val("");
        }
    }

    function removeItemFromCart(){
        var index = $(this).closest("tr").index();
        items.slice(index, 1);
        $(this).closest("tr").remove();
        updateTotalCost();
    }

    function updateTotalCost(){
        var totalCost = 0;
        items.forEach(function (item) {
            totalCost += item.icost;
        });
        $("#total_cost").text("Total Cost : Rs " + totalCost.toFixed(2));
    }

    function generateInvoice(){
        var invoice = `<html>
        <head>
            <title>INVOICE</title>
        </head>
        <body>
        <center>
            <div class="container">
                <h1 class="text_center">Invoice</h1>
                <table class="table" cellpadding="7">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Item Quantity</th>
                            <th>Item Cost</th>
                        </tr>
                    </thead>
                    <tbody>`;

                    items.forEach(function (item){
                        invoice += "<tr><td>" + item.name + "</td><td>" + item.price.toFixed(2)+ "</td><td>" + item.qty + "</td><td>"+ item.icost +"</td></tr>";
                    });

                    invoice += '</tbody></table><h2 class="text_right">Total Cost : Rs ' + getTotalCost() + "</h2></div></body></center></html>";
           
        var popup = window.open("", "_blank");
        popup.document.open();
        popup.document.write(invoice);
        popup.document.close();
    }

    function getTotalCost() {
        var totalCost = 0;
        items.forEach(function (item){
            totalCost += item.icost;  
        });
        return totalCost.toFixed(2);
    }

});