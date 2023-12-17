export const convertStringToFormattedDate = dateString => {
  const date = new Date(dateString);

  // Lấy tên tháng và ngày
  const month = date.toLocaleString('en-us', {month: 'short'});
  const day = date.getDate();

  // Tạo chuỗi kết quả
  const formattedDate = `${month} ${day}`;

  return formattedDate;
};
