const assignParcelForOperation=`
INSERT INTO public.gis_hold_parcel_to_operation(upin, assigned_by, asignment_comment, status, assignment_attachment)
	                                   VALUES ( $1, $2, $3, 'NEW-ASSIGNMENT', $4);`;
const approveAssignedParcelToOperation=`UPDATE public.gis_hold_parcel_to_operation
	SET approved_by=$2,  approval_comment=$3, approval_attachment=$4 status='APPROVED-ASIGNMENT' WHERE id=$1;`;
const deleteAssignedParcelToOperation=`DELETE FROM public.gis_hold_parcel_to_operation WHERE id=$1;`;
const changeParcelStatusToAsigned=`UPDATE public.parcels SET status='ASSIGNED' WHERE upin=$1;`;
const changeParcelStatusToApproved=`UPDATE public.parcels SET status='APPROVED' WHERE upin=$1;`;
const getApprovedParcels=`SELECT * FROM public.gis_hold_parcel_to_operation WHERE status='APPROVED-ASIGNMENT';`;
const getUnapprovedAssignedParcels=`SELECT * FROM public.gis_hold_parcel_to_operation WHERE status='NEW-ASSIGNMENT';`;
const resetParcelStatusToVacant=`UPDATE public.parcels SET status='VACANT' WHERE upin=$1;`;
const updateApprovedToResetStatusToDeclined=`UPDATE public.gis_hold_parcel_to_operation SET status='DECLINED-ASIGNMENT' WHERE id=$1;`;
const getDeclinedParcelAssignments=`SELECT * FROM public.gis_hold_parcel_to_operation WHERE status='DECLINED-ASIGNMENT';`
export default{
    assignParcelForOperation,
    approveAssignedParcelToOperation,
    deleteAssignedParcelToOperation,
    changeParcelStatusToAsigned,
    changeParcelStatusToApproved,
    resetParcelStatusToVacant,
    getApprovedParcels,
    getUnapprovedAssignedParcels,
    updateApprovedToResetStatusToDeclined,
    getDeclinedParcelAssignments
};