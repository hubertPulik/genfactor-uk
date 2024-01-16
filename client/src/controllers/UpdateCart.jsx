
export const UpdateCart = () => {

  let userCart;
  if (localStorage.getItem('userCart')) {
    userCart = JSON.parse(localStorage.getItem('userCart'))
  }

  return { userCart }
}