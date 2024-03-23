//validate email
export const isValidEmail = (stringEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
}
    
//validate password
export const isValidPassword = (stringPassword) => stringPassword.length >= 6

export const isValidHoTen = (stringHoTen) => stringHoTen.length > 0

export const isValidfullname = (stringHoTen) => stringHoTen.length > 0