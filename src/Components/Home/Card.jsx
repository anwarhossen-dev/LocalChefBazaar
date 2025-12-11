import { Link } from 'react-router'

const Card = () => {
  return (
    <Link
      to={`/Meals/1`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      {/* <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
            alt='Meals Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>Money Meals</div>
        <div className='font-semibold text-lg'>Category: Indoor</div>
        <div className='font-semibold text-lg'>Quantity: 10</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'> Price: 15$</div>
        </div>
      </div> */}

      <div className="meal-card border rounded shadow p-4 flex flex-col">
      <img
        src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
        alt='meal_name'
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="font-bold text-lg"> meal name</h2>
      <p>Chef: meal chefName (ID: meal chefId)</p>
      <p>Price: meal price</p>
      <p>Rating: meal.rating</p>
      <p>Delivery Area: meal.deliveryArea</p>
      <button
       // onClick={handleSeeDetails}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" to='/mealsDetails'
      >
        See Details
      </button>
    </div>
    </Link>
  )
}

export default Card