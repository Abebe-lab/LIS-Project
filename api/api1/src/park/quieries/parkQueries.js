const registerHandover=`INSERT INTO public.handover(agreement_id, date_of_handover, handed_over_by, handed_over_to, notes, description, attachment_paths, park_id)
	VALUES ($1, $2, $3, $4,$5, $6,$7,$8) RETURNING id;`;
const getHandovers=`SELECT * FROM public.handover;`;
const getHandoversByPark=`SELECT * FROM public.handover WHERE park_id=$1;`;
export default{
    registerHandover,
    getHandovers,
    getHandoversByPark
}