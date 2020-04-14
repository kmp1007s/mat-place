const EXPIRES = 60 * 60 * 1000 * 24; // 24시간

interface SignOption {
  expires: Date;
  httpOnly: boolean;
  signed: boolean;
}

export function signOption(): SignOption {
  const option: SignOption = {
    expires: expiryDate(),
    httpOnly: true,
    signed: true
  };

  return option;
}

export function expiryDate(): Date {
  return new Date(Date.now() + EXPIRES);
}

// function makeSignedCookie(key, value) {
//   const option = {
//     expires: expiryDate(),
//     httpOnly: true,
//     signed: true
//   };

//   const data = [key, value, option];
//   return data;
// }
