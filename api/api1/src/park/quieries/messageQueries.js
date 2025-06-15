const sendMessage=`INSERT INTO public.message_inhouse(sent_from, sent_to, title, description,  response_for, attachment_s )
	                                          VALUES ($1, $2, $3, $4, $5, ARRAY [$6])`;
const getMessages=`SELECT * FROM public.view_messages`;
const getMessageBySenderId=`SELECT * FROM public.view_message_outbox WHERE sent_from = $1`;
const getMessageByRecieverId=`SELECT * FROM public.view_message_inbox
                                WHERE sent_to = $1`;
const getMessageMessageById=`SELECT * FROM public.message_inhouse WHERE id = $1`
const deleteMessage=`DELETE FROM public.message_inhouse
                            WHERE id = $1`;
const updateMessageStatus=`UPDATE public.message_inhouse
SET status = CASE WHEN status = 'Pending' THEN 'Seen' ELSE 'Pending' END
WHERE id = $1;`;
const updateMessage=`UPDATE public.message_inhouse
                                SET title=$2, description=$3, status=$4, response_for=$5, attachment_s=$6, sent_from=$7, sent_to=$8
                                WHERE id=$1`;
const updateAllMessagesAsSeen=`UPDATE public.message_inhouse SET status = 'Seen' WHERE sent_to = $1;`;
export default {
    sendMessage,
    getMessages,
    getMessageBySenderId,
    getMessageByRecieverId,
    getMessageMessageById,
    deleteMessage,
    updateMessageStatus,
    updateMessage,
    updateAllMessagesAsSeen,
};