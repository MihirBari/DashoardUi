const OrderDetail = ({ product }) => {
  const {
    creditor_name,
    product_id,
    product_name,
    amount_condition,
    amount_sold,
    s,
    m,
    l,
    xl,
    xxl,
    xxxl,
    xxxxl,
    xxxxxl,
    xxxxxxl,
    returned,
  } = product;

  const sizes = [
    { label: "S", quantity: s },
    { label: "M", quantity: m },
    { label: "L", quantity: l },
    { label: "XL", quantity: xl },
    { label: "XXL", quantity: xxl },
    { label: "XXXL", quantity: xxxl },
    { label: "XXXXL", quantity: xxxxl },
    { label: "XXXXXL", quantity: xxxxxl },
    { label: "XXXXXXL", quantity: xxxxxxl },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Name : {creditor_name}</h2>
        <h2 className="text-xl font-semibold mb-2">Product Id : {product_id}</h2>
        <p className="text-gray-600 mb-2">Product Name : {product_name}</p>
        <p className="text-gray-800 font-semibold mb-2">payment Status: {amount_condition}</p>
        <p className="text-gray-600 mb-2">Returned : {returned}</p>
        <p className="text-gray-600 mb-2">Toatl Amount Sold:₹ {amount_sold}</p>

        <div className="flex items-center">
          <p className="text-gray-600 mr-2">Sizes:</p>
          <div className="flex space-x-2">
            {sizes.map(
              (size) =>
                size.quantity > 0 && (
                  <span
                    key={size.label}
                    className="border border-gray-300 px-2 py-1 rounded-md text-gray-600"
                  >
                    {size.label} ({size.quantity})
                  </span>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
