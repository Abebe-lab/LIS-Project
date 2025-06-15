// const registerHandover=`INSERT INTO public.handover(agreement_id, date_of_handover, handed_over_by, handed_over_to, notes, description, attachment_paths, park_id)
// VALUES ($1, $2, $3, $4,$5, $6,$7,$8) RETURNING id;`;
// const getHandovers=`SELECT * FROM public.handover;`;
// const getHandoversByPark=`SELECT * FROM public.handover WHERE park_id=$1;`;
// export default{
//     registerHandover,
//     getHandovers,
//     getHandoversByPark
// }

const registerHandover=`INSERT INTO public.handover(agreement_id, date_of_handover, handed_over_by, handed_over_to, notes, description, attachment_paths, park_id)
VALUES ($1, $2, $3, $4,$5, $6,$7,$8) RETURNING id;`;
const getHandovers=`SELECT * FROM public.handover;`;
const getHandoversByPark=`SELECT * FROM public.handover WHERE park_id=$1;`;

const registerPark = `INSERT INTO public.parks (id, name, region, compound_boundary, specialization, developed_by, area_on_plan, current_status, description, abbrevation, zone, city, center_of_park, pid, woreda, address)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id;`;

const getParks = `SELECT * FROM public.parks;`;

// Combine all exports into a single object
export default {
    registerHandover,
    getHandovers,
    getHandoversByPark,
    registerPark, 
    getParks,
};