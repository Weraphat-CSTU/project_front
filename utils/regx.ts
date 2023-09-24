export function phoneFormatter(phonenumber?: string): string {
  if (!phonenumber) {
    return "";
  } else {
    let outphonenumber = phonenumber.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      "$1-$2-$3"
    );
    return outphonenumber;
  }
}

export function userIdFormatter(userId?: string): string {
  if (!userId) {
    return "";
  } else {
    let outuserId = userId.replace(
      /^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/,
      "$1-$2-$3-$4-$5"
    );
    return outuserId;
  }
}
