const addPlaceOnHold = `INSERT INTO public.place_parcel_on_hold( upin, description, attachment_path,held_by,reason)
                                            VALUES ($1,$2,$3,$4,$5) RETURNING no`;
const updateReserved=`update parcels SET status='reserved' WHERE upin=$1`;
const getParselsReservePassedDate=`SELECT *
                                  FROM public.place_parcel_on_hold
                                  WHERE held_on < NOW() - INTERVAL '30 DAY';`;
  export default{
    addPlaceOnHold,
    updateReserved,
    getParselsReservePassedDate
  }