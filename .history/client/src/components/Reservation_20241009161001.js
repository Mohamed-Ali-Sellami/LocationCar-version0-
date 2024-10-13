
import React, { useState, useEffect } from 'react';
import './styles/Reservations.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addreservation, newreservation } from '../JS/carSlice';

const Reservation = () => {
  const params = useParams();
  console.log(params.id);

  const dispatch = useDispatch();
  const allcars = useSelector((store) => store.car?.car);
  const user = useSelector((store) => store.user?.user);
  
 
  const carreserver = allcars?.filter((data) => data._id === params.id);
  console.log(carreserver);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Fonction pour calculer le nombre de jours entre deux dates
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const days = timeDifference / (1000 * 3600 * 24);
    return days > 0 ? days : 0; // Empêche les dates incorrectes
  };

  // Utilisation d'un useEffect pour recalculer le prix total lorsque les dates changent
  useEffect(() => {
    calcultotalpric()
  }, [startDate, endDate, carreserver]);

  const calcultotalpric=()=>{
    if (startDate && endDate && carreserver.length > 0) {
      const pricePerDay = carreserver[0]?.price_per_day; // Prix par jour extrait de la voiture réservée
      const days = calculateDays(startDate, endDate);
      setTotalPrice(days * pricePerDay);
      setaddreservation({ ...addreservation, totalPrice: days * pricePerDay }); // Calcul du prix total
  }
}
  const [addreservation, setaddreservation] = useState({
    startDate: "",
    endDate: "",
    totalPrice:"",
    userId:user?._id,

  });


//Fazet react Notification
const createNotification = () => {
  NotificationManager.error('Vot', 5000, () => {
    alert('callback');
  })};



  return (
    <div>
      <h1 className='titlereservation'>Réserver votre voiture</h1>

      <form onSubmit={(e) => e.preventDefault()}>
      {carreserver?.map((data) => (
        <>
        <h3>Name and last name:</h3>
        <input type="text" value={`${user?.name} ${user?.lastname}`}  />

        <h3>Model Réservé:</h3>

          <div key={data._id}>
            <input type="text" value={data?.model} readOnly />

            <h3>Start Date:</h3>
            <input
              type="date"
              value={startDate}
              onChange={(e) =>(setStartDate(e.target.value), setaddreservation({...addreservation,startDate:e.target.value}))}
            />

            <h3>End Date:</h3>
            <input
              type="date"
              value={endDate}
              onChange={(e) => (setEndDate(e.target.value),setaddreservation({...addreservation,endDate:e.target.value}))}  // onChange={(e) => setEndDate(e.target.value)}
            />

            <h3>Total Price:</h3>
            <input type="text" value={totalPrice ? `${totalPrice} TND` : '0 TND'} readOnly    />
          </div>
       

        <button type="submit" className='confirmerreservation'  onClick={() => dispatch(newreservation({id:data?._id,reservation:addreservation}))}  >
          Confirmer
        </button>
        </>
         ))}
      </form>
    </div>
  );
};

export default Reservation;




// import React, { useState } from 'react'
// import './styles/Reservations.css'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// const Reservation = () => {

//   const params=useParams()
//   console.log(params.id)

//   const allcars = useSelector((store)=>store.car?.car)

//   const user=useSelector((store)=>store.client?.client)

//   const carreserver = allcars?.filter((data) => data._id === params.id);
//   console.log(carreserver)
  

//   const [startDate, setupstartDate] = useState("")
//   const [endDate, setupendDate] = useState("")
//   const [totalPrice, setTotalPrice] = useState(0);






//   return (

//     <div>
           
// <h1 className='titlereservation'>Reserver votre voiture</h1>



// <form>
//              <h3> Name and last name : </h3>
//             <input type="text" placeholder={`${user?.name} ${user?.lastname}`}/>

//             <h3> Model Reservé : </h3>
//             {carreserver?.map((data)=>
//             <>
//             <input type="text" placeholder={data?.model} />

//             <h3> Start Date : </h3>
//             <input type="date" placeholder="Start Date" onChange={(e)=>setupstartDate({date:e.target.value})} />
//             <h3> End Date :</h3>
//             <input type="date" placeholder="end Date" onChange={(e)=>setupendDate({date:e.target.value})} />

//             <h3>Total Price :</h3>
//             <input type="text" placeholder="Total Price" />
//             </>
//           )}

//             <button type="submit" className='confirmerreservation'>Confirmer</button>
//   </form>


// </div>



    
//   )
// }

// export default Reservation