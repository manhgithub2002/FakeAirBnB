export const transfromMessage = message => ({
  id: message.id,
  ...message.data(),
  sent_at: message.data().sent_at
    ? convertFirestoreTimestampToString(message.data().sent_at)
    : null,
});

export const convertFirestoreTimestampToString = timestamp =>
  new Date(timestamp.toDate().getTime()).toLocaleString();
